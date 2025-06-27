import { db } from "@/utils/prisma";

import  z  from "zod";
import { signUpSchema } from "@/utils/validation";
import { generateSalt, passwordHasher } from "./passwordHasher";

export async function SignIn(unsafeData: z.infer<typeof signUpSchema>) {
    const { data, success, error } = signUpSchema.safeParse(unsafeData);
    
    if (!success) {
        return {
            success: false,
            error: error?.issues[0]?.message || "Invalid input"
        };
    }
    const existingUser = await db.user.findUnique({
        where: {
            email: data?.email
        }
    });
    if (existingUser !== null) {
        return {
            success: false,
            error: "Email already exists"
        };
    }


    try {
    const salt = await generateSalt();
    const hashedPassword = await passwordHasher(data?.password, salt);
    
    const user = await db.user.create({
        data: {
            name: data?.name,
            email: data?.email,
            password: hashedPassword,
            salt: salt
        }
    });
    } catch (error) {
        
    }

    
}