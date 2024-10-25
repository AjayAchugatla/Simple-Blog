import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { hashPassword, verifyPassword } from "../utils/hasher";
import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@ajayachugatla/medium-common"
import { verify } from "hono/jwt";

const user = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }, Variables: {
        userId: string
    }
}>();


user.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = signupInput.safeParse(body)
    if (!success) {
        return c.json({
            error: "Invalid Inputs"
        })
    }
    const res: string = await hashPassword(body.password);
    try {
        const resp = await prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
                bio: body.bio,
                password: res
            }
        })
        const token = await sign({ id: resp.id }, c.env.JWT_SECRET)
        return c.json({
            token: token
        })
    } catch (error) {
        return c.json({
            error: "User already Exists"
        })
    }
})


user.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = signinInput.safeParse(body)
    if (!success) {
        return c.json({
            error: "Invalid Inputs"
        })
    }
    try {
        const u = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        })
        if (!u) {
            return c.json({
                error: `User doesn't exist`
            })
        }
        const resp = await verifyPassword(u.password, body.password)
        if (resp) {
            const token = await sign({ id: u.id }, c.env.JWT_SECRET)
            return c.text(token)
        }
        return c.json({ error: "Incorrect password" })
    } catch (error) {
        return c.json({
            error: `Internal server Error`
        })
    }

})

user.use('/get-user', async (c, next) => {
    try {
        const header = c.req.header('authorization') || "";
        const token = header.split(" ")[1];

        const resp = await verify(token, c.env.JWT_SECRET)
        // console.log(resp);

        if (resp) {
            const id = resp.id
            // @ts-ignore
            c.set("userId", id)
            await next()
        }
        else {
            c.status(403)
            return c.json({
                error: "not authorised"
            })
        }
    } catch (error) {
        c.status(403)
        return c.json({
            error: "Not Authorized"
        })
    }

})

user.get('/get-user', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const uid = c.get("userId")
        const u = await prisma.user.findUnique({
            where: {
                id: uid
            }, select: {
                name: true,
                id: true,
                bio: true
            }
        })
        if (!u) {
            return c.json({
                error: `User doesn't exist`
            })
        }
        return c.json({
            message: true,
            name: u.name,
            id: u.id
        })
    } catch (error) {
        return c.json({
            error: `Server Error`
        })
    }
})

export default user