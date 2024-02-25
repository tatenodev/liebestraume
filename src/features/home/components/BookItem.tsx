"use client";

import { Flex, Meter, View } from "@adobe/react-spectrum";
import { Text } from "@adobe/react-spectrum";
import { calculateProgressRate } from "../functions";
import { DeleteBook } from "./DeleteBook";
import { UpdateBook } from "./UpdateBook";

export type BookItemProps = {
  book: {
    id: number;
    title: string;
    totalPage: number;
    currentPage: number;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    userId: number;
  };
};

export function BookItem({ book }: BookItemProps) {
  const meterLabel = (totalPage: number, currentPage: number) => {
    if (totalPage <= currentPage) return "読了";
    return "進行中";
  };

  return (
    <View
      borderRadius="medium"
      marginBottom="size-200"
      padding="size-100"
      UNSAFE_style={{ boxShadow: "0px 0px 4px rgba(0, 0, 0, .5)" }}
    >
      <h2>{book.title}</h2>
      <Meter
        label={meterLabel(book.totalPage, book.currentPage)}
        variant="positive"
        value={calculateProgressRate(book.currentPage, book.totalPage)}
        valueLabel={`${book.currentPage} / ${book.totalPage}ページ`}
        marginY={18}
        width="100%"
      />
      <div>
        <Text>
          Period:{" "}
          {new Date(book.startDate).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}{" "}
          ―{" "}
          {new Date(book.endDate).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </Text>
      </div>
      <Flex justifyContent="end" gap="size-100">
        <UpdateBook book={book} />
        <DeleteBook bookId={book.id} />
      </Flex>
    </View>
  );
}
