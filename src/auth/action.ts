'use server';
import { db } from "@/utils/prisma";
import { cookies } from "next/headers";
import { z } from "zod"; 
import { signUpSchema } from "@/utils/validation";
import { createSalt, passwordHasher } from "./passwordHasher";
import { createUserSession } from "./session";
import { redirect } from "next/navigation";

export async function signUp(
  unSafeData: z.infer<typeof signUpSchema>
): Promise<string | null> {
  const { data, success } = signUpSchema.safeParse(unSafeData);
  if (!success) {
    throw new Error("Invalid input data");
  }

  const existingUser = await db.user.findUnique({
    where: { email: data.email },
  });
  if (existingUser !== null) {
    throw new Error("User with this email already exists");
  }

  try {
    const salt = createSalt();
    const hashedPassword = await passwordHasher(data.password, salt);

    const user = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        salt: salt,
      },
    });

    if (user === null) return "unable to create user";

    await createUserSession(
      {
        userId: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      await cookies()
    );
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }

  redirect("/");
}