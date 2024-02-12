"use server";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";

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

type UpdateBookProps = {
  id: number;
  title?: string;
  totalPage?: number;
  currentPage?: number;
  startDate?: Date;
  endDate?: Date;
};

export async function updateBook(props: UpdateBookProps) {
  const updated = await prisma.book.update({
    where: { id: props.id },
    data: {
      ...props,
    },
  });

  return { data: updated };
}

export async function deleteBook(bookId: number) {
  const deleted = await prisma.book.delete({ where: { id: bookId } });
  revalidatePath("/");

  return { data: deleted };
}
