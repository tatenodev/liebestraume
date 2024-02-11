import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type ClerkWebhookMessage = {
  data: { id: string };
  type: "user.created" | "user.updated" | "user.deleted";
};

export async function POST(req: Request) {
  const { data, type }: ClerkWebhookMessage = await req.json();
  const uid = data.id;

  switch (type) {
    case "user.created":
      await prisma.user.create({ data: { uid } });
      break;

    case "user.deleted": {
      const deleteBooks = prisma.book.deleteMany({ where: { user: { uid } } });
      const deleteUser = prisma.user.delete({ where: { uid } });
      prisma.$transaction([deleteBooks, deleteUser]);
      break;
    }

    default:
      break;
  }

  return new Response("Success!", {
    status: 200,
  });
}
