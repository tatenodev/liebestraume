"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";

export async function deleteBook(bookId: number) {
  const deleted = await prisma.book.delete({ where: { id: bookId } });
  revalidatePath("/");

  return { data: deleted };
}
