"use client";

import { View } from "@adobe/react-spectrum";
import { BookItem } from "./BookItem";

type BooksProps = {
  data:
    | {
        id: number;
        title: string;
        totalPage: number;
        currentPage: number;
        startDate: Date;
        endDate: Date;
        createdAt: Date;
        userId: number;
      }[]
    | null;
};

export function Books({ data }: BooksProps) {
  if (!data) return <></>;

  return (
    <View paddingTop="size-300">
      {data.map((item) => (
        <BookItem key={item.id} book={item} />
      ))}
    </View>
  );
}
