"use server";

import prisma from "../prisma";

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
