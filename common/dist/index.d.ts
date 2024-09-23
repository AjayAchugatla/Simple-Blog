import { z } from "zod";
export declare const signupInput: z.ZodObject<{
    email: z.ZodString;
    name: z.ZodString;
    bio: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    name: string;
    bio: string;
    password: string;
}, {
    email: string;
    name: string;
    bio: string;
    password: string;
}>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const blogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export declare const updateBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    id: string;
}, {
    title: string;
    content: string;
    id: string;
}>;
export type su = z.infer<typeof signupInput>;
export type si = z.infer<typeof signinInput>;
export type bl = z.infer<typeof blogInput>;
export type ubl = z.infer<typeof updateBlogInput>;
