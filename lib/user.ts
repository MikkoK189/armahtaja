import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUserData(userEmail : string) {
    console.log(userEmail)
    try {
        const userData = await prisma.user.findUnique({
            where: {
                email: userEmail
            },
        });
        console.log(userData)
        return userData
    } catch (error) {
        console.error('Error retrieving user data:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}