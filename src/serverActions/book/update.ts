"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";

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
  revalidatePath("/");

  return { data: updated };
}

type IncrementPageProps = {
  id: number;
  incrementValue: number;
};

export async function incrementPage({
  id,
  incrementValue,
}: IncrementPageProps) {
  const updated = await prisma.book.update({
    where: { id },
    data: {
      currentPage: {
        increment: incrementValue,
      },
    },
  });
  revalidatePath("/");

  return { data: updated };
}
