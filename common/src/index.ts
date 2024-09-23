import { z } from "zod"

export const signupInput = z.object({
    email: z.string().email(),
    name: z.string(),
    bio: z.string(),
    password: z.string()
})

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string()
})

export const blogInput = z.object({
    title: z.string(),
    content: z.string()
})


export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.string()
})

export type su = z.infer<typeof signupInput>
export type si = z.infer<typeof signinInput>
export type bl = z.infer<typeof blogInput>
export type ubl = z.infer<typeof updateBlogInput>

