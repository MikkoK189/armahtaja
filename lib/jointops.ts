import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getOperationPaths() {
    try {
        const operationPaths = await prisma.operation.findMany();
        const paths = operationPaths.map((c) => {
            return {
                params: {
                    id: c.id.toString()
                }
            };
        });
        return paths;
        
    } catch (error) {
        console.error('Error retrieving operation paths:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

export async function getOperationData(id : string) {
    try {
        const operationData = await prisma.operation.findUnique({
            where: {
                id: id
            },
            include: { 
                groups: {
                    include: {
                        slots: true
                    }
                } 
            }
        });
        console.log(operationData)
        return operationData
    } catch (error) {
        console.error('Error retrieving operation data:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}