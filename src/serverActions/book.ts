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
  const books = await prisma.book.findMany({
    where: { user: { uid } },
    orderBy: { startDate: "asc" },
  });

  return { data: books };
}

type Book = {
  id: number;
  title: string;
  totalPage: number;
  currentPage: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  userId: number;
};

type CategorizeBooks = {
  all: Book[];
  newBooks: Book[];
  inProgress: Book[];
  done: Book[];
};

export async function getCategorizeBooks(uid: string, nowTime: number) {
  const books = await prisma.book.findMany({
    where: { user: { uid } },
    orderBy: { startDate: "asc" },
  });

  const initialBooks: CategorizeBooks = {
    all: books,
    newBooks: [],
    inProgress: [],
    done: [],
  };

  const categorizeBooks = books.reduce((accumulator, current) => {
    const startTime = new Date(current.startDate).getTime();
    if (current.totalPage === current.currentPage) {
      accumulator.done.push(current);
    } else if (nowTime > startTime || current.currentPage !== 0) {
      accumulator.inProgress.push(current);
    } else {
      accumulator.newBooks.push(current);
    }

    return accumulator;
  }, initialBooks);

  return { data: categorizeBooks };
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

export async function deleteBook(bookId: number) {
  const deleted = await prisma.book.delete({ where: { id: bookId } });
  revalidatePath("/");

  return { data: deleted };
}
