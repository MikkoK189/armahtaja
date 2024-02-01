
import prisma from '../../../lib/prisma';

// POST /api/post

export default async function handle(req: any, res: any) {
  const {operation, removedSlots, removedGroups} = req.body;

  const result = await prisma.operation.update({
    data: {
        id: operation.id,
        title: operation.title,
        content: operation.content,
        authorId: operation.authorId,
        groups: {
            upsert: operation.groups.map((group: any) => ({
                where: {
                    id: group.id,
                },
                update: {
                    id: group.id,
                    title: group.title,
                    slots: {
                        upsert: group.slots.map((slot: any) => ({
                            where: {
                                id: slot.id,
                            },
                            update: {
                                id: slot.id,
                                title: slot.title,
                                description: slot.description,
                                startTime: slot.startTime,
                                endTime: slot.endTime,
                                day: slot.day,
                            },
                            create: {
                                id: slot.id,
                                title: slot.title,
                                description: slot.description,
                                startTime: slot.startTime,
                                endTime: slot.endTime,
                                day: slot.day,
                            },
                        })),
                    },
                },
                create: {
                    id: group.id,
                    title: group.title,
                    slots: {
                        create: group.slots.map((slot) => ({
                            id: slot.id,
                            title: slot.title,
                            description: slot.description,
                            startTime: slot.startTime,
                            endTime: slot.endTime,
                            day: slot.day,
                        })),
                    },
                },
            })),
        }
        },
        where: {
            id: operation.id,
    },
  });
  const removingSlots = await prisma.slot.deleteMany({
    where: {
        id: {
            in: removedSlots
        }
    }
  });
  const removingGroups = await prisma.group.deleteMany({
    where: {
        id: {
            in: removedGroups
        }
    }
  });
  res.json(result);
}