import z from "zod";

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string().optional()
});

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string()
});

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
})

export const updateBlogInput = z.object({
    authorId: z.string(),
    title: z.string(),
    content: z.string()
});

export type UpdateBlogInput = z.infer<typeof updateBlogInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>
export type SigninInput = z.infer<typeof signinInput>
export type SignupInput = z.infer<typeof signupInput>