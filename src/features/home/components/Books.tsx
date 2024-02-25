"use client";

import { View } from "@adobe/react-spectrum";
import { Item, TabList, TabPanels, Tabs } from "@adobe/react-spectrum";
import { BookItem } from "./BookItem";

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

type BooksProps = {
  data: Book[] | null;
};

type CategorizeBooks = {
  newBooks: Book[];
  inProgress: Book[];
  done: Book[];
};

export function Books({ data }: BooksProps) {
  if (!data) return <></>;

  const nowTime = new Date().getTime();
  const initialBooks: CategorizeBooks = {
    newBooks: [],
    inProgress: [],
    done: [],
  };

  const categorizeBooks = data.reduce((accumulator, current) => {
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

  return (
    <View paddingX="size-200">
      <Tabs>
        <TabList marginBottom="size-200">
          <Item key="New">これから読む</Item>
          <Item key="InProgress">進行中</Item>
          <Item key="Done">読了</Item>
          <Item key="All">全て</Item>
        </TabList>
        <TabPanels>
          <Item key="New">
            {categorizeBooks.newBooks.map((book) => (
              <BookItem key={book.id} book={book} />
            ))}
          </Item>
          <Item key="InProgress">
            {categorizeBooks.inProgress.map((book) => (
              <BookItem key={book.id} book={book} />
            ))}
          </Item>
          <Item key="Done">
            {categorizeBooks.done.map((book) => (
              <BookItem key={book.id} book={book} />
            ))}
          </Item>
          <Item key="All">
            {data.map((book) => (
              <BookItem key={book.id} book={book} />
            ))}
          </Item>
        </TabPanels>
      </Tabs>
    </View>
  );
}
