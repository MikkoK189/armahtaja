import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { userId } = req.query;

    if(!userId) return res.status(404);

    try {
        const operations = await prisma.operation.findMany({
            where: {
                authorId: userId.toString()
            },
            select: {
                id: true,
                title: true
            }
        });

        if (!operations) {
            return res.status(404).json({ message: 'Operations not found' });
        }

        return res.status(200).json(operations);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
