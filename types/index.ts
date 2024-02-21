import { User } from "@prisma/client";
import { type } from "os";

export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVeryfied"> & {
    createdAt: string,
    updatedAt: string,
    emailVeryfied: string | null
}