"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

type CreateBookProps = {
  title: string;
  totalPage: number;
  currentPage?: number;
  startDate: Date;
  endDate: Date;
  uid: string;
};

export async function createBook({
  title,
  totalPage,
  currentPage = 0,
  startDate,
  endDate,
  uid,
}: CreateBookProps) {
  const book = await prisma.book.create({
    data: {
      title,
      totalPage,
      currentPage,
      startDate,
      endDate,
      user: {
        connect: {
          uid,
        },
      },
    },
  });

  revalidatePath("/");
  return { data: book };
}

export async function getBooks(uid: string) {
  const books = await prisma.book.findMany({ where: { user: { uid } } });

  return { data: books };
}
