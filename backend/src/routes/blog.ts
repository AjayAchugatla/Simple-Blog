import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { blogInput, updateBlogInput } from "@ajayachugatla/medium-common";

const blog = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

blog.use('/*', async (c, next) => {
    try {
        const header = c.req.header('authorization') || "";
        const token = header.split(" ")[1];

        const resp = await verify(token, c.env.JWT_SECRET)
        // console.log(resp);

        if (resp) {
            const id = resp.id
            c.set("userId", id as string)
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

blog.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = blogInput.safeParse(body)
    if (!success) {
        return c.json({
            error: "Invalid Inputs"
        })
    }
    const resp = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            published: true,
            authorId: c.get("userId")
        }
    })
    return c.json({
        id: resp.id,
        title: resp.title,
        content: resp.content,
    })

})

blog.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body)
    if (!success) {
        return c.json({
            error: "Invalid Inputs"
        })
    }
    const resp = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })
    return c.json({
        id: body.id,
        title: body.title,
        content: body.content
    })
})

blog.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {

        const resp = await prisma.post.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                createdAt: true,
                author: {
                    select: {
                        name: true,
                        bio: true,
                    }
                }
            }
        })
        if (resp) {
            return c.json({ blogs: resp })
        }
        else {
            return c.status(403)
        }

    } catch (error) {
        return c.json({
            error: "Error fetching blog"
        })
    }
})

blog.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id = c.req.param("id")
    try {
        const resp = await prisma.post.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                author: {
                    select: {
                        name: true,
                        bio: true,
                        id: true
                    }
                }
            }
        })
        if (resp) {
            return c.json({ blog: resp })
        }
        else {
            return c.json({
                error: "Error fetching blog"
            })
        }

    } catch (error) {
        return c.json({
            error: "Error fetching blog"
        })
    }
})

blog.delete('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const id = c.req.param("id")
    try {
        const resp = await prisma.post.delete({
            where: {
                id: id
            }
        })
        if (resp) {
            return c.json({ success: true })
        }
        else {
            return c.json({
                error: "Error deleting blog"
            })
        }
    } catch (error) {
        return c.json({
            error: "Error deleting blog"
        })
    }
})


export default blog