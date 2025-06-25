import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@eugene.sam/blog-common";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

userRouter.post('/signup', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
        message: "Invalid format"
    })
  }

  try {
    const userId = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.name
      }
    });

    const token = await sign({ id: userId }, c.env.JWT_SECRET);
    c.status(200);
    return c.json({
      token: token
    })
  } catch(err) {
    c.status(411);
    c.json({
      message: "Invalid"
    })
  }
})

userRouter.post('/api/v1/signin', async(c) => {
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Invalid formats"
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password
      }
    });

    if (!existingUser) {
      c.status(403)
      return c.json({
        message: "Incorrect Credentials"
      });
    }

    const token = await sign({ id: existingUser.id }, c.env.JWT_SECRET);
    c.status(200);
    return c.json({
      token: token
    })
  } catch(err) {
    c.status(411);
    return c.json({
      message: "Invalid"
    })
  }
})