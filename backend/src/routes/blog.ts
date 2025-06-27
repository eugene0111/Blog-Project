import { createBlogInput, updateBlogInput } from "@eugene.sam/blog-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use('/*', async(c, next) => {
    const authHeader = c.req.header('Authorization') || "";
    if (!authHeader.startsWith("Bearer ")) {
        c.status(403);
        return c.json({
            message: "Unauthorized"
        });
    }
    const token = authHeader.split(' ')[1];
    const user = await verify(token, c.env.JWT_SECRET);
    if (user) {
        c.set("userId", String(user.id));
        await next();
    } else {
        c.status(403);
        return c.json({
            message: "Unauthorized"
        })
    }
})

blogRouter.post('/', async(c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Invalid formats"
        });
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const authorId = c.get("userId");

    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId)
        }
    });

    return c.json({
        id: blog.id
    });
})

blogRouter.put('/', async(c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            message: "Invalid formats"
        })
    }
    const prisma = await new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blog = await prisma.post.update({
        where: {
            id: Number(body.id)
        },
        data: {
            title: body.title,
            content: body.content
        }
    });

    return c.json({
        id: blog.id
    });
})

blogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }) .$extends(withAccelerate());

    try {
        const blogs = await prisma.post.findMany({
            select: {
                title: true,
                content: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        c.status(200);
        return c.json(blogs)
    } catch(err) {
        c.status(411);
        return c.json({
            message: "Error while fetching blogs"
        })
    }
})

blogRouter.get('/:id', async(c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        return c.json({
            blog
        })
    } catch(err) {
        c.status(411);
        c.json({
            message: "Error while fetching the Blog Post"
        })
    }
})
