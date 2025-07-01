import { db } from "@/utils/prisma";

type CreateUserInput = {
  email: string;
  name: string;
  password: string;
  salt: string;
  role?: "ADMIN" | "USER";
};

export default async function createEmployee(data: CreateUserInput) {
  const employee = await db.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: data.password,
      salt: data.salt,
      role: data.role ?? "USER",
    },
  });
  return employee;
}