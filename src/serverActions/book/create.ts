"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";

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
