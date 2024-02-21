import { authOption } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/libs/prismadb"


export async function getSection() {
    return await getServerSession(authOption)
}
export async function getCurrentUser() {
    try {
        const session = await getSection()
        if (!session?.user?.email) {
            return null
        }
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email,
            }
        })

        if (!currentUser) {
            return null
        }
        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVeryfied: currentUser.emailVerified?.toString() || null
        }
    } catch (error: any) {
        console.log(error)
        return null
    }

}