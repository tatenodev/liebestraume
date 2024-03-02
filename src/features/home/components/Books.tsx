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
  data: CategorizeBooks | null;
};

type CategorizeBooks = {
  all: Book[];
  newBooks: Book[];
  inProgress: Book[];
  done: Book[];
};

export function Books({ data }: BooksProps) {
  if (!data) return <></>;

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
            {data.newBooks.map((book) => (
              <BookItem key={book.id} book={book} />
            ))}
          </Item>
          <Item key="InProgress">
            {data.inProgress.map((book) => (
              <BookItem key={book.id} book={book} />
            ))}
          </Item>
          <Item key="Done">
            {data.done.map((book) => (
              <BookItem key={book.id} book={book} />
            ))}
          </Item>
          <Item key="All">
            {data.all.map((book) => (
              <BookItem key={book.id} book={book} />
            ))}
          </Item>
        </TabPanels>
      </Tabs>
    </View>
  );
}
