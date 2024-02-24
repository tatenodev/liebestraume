"use client";

import { Flex, Meter, View } from "@adobe/react-spectrum";
import { Text } from "@adobe/react-spectrum";
import { calculateProgressRate } from "../functions";
import { DeleteBook } from "./DeleteBook";
import { UpdateBook } from "./UpdateBook";

type BookItemProps = {
  item: {
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

export function BookItem({ item }: BookItemProps) {
  const meterLabel = (totalPage: number, currentPage: number) => {
    if (totalPage <= currentPage) return "読了";
    return "進行中";
  };

  return (
    <View
      borderRadius="medium"
      marginBottom="size-200"
      marginX="size-200"
      padding="size-100"
      UNSAFE_style={{ boxShadow: "0px 0px 4px rgba(0, 0, 0, .5)" }}
    >
      <h2>{item.title}</h2>
      <Meter
        label={meterLabel(item.totalPage, item.currentPage)}
        variant="positive"
        value={calculateProgressRate(item.currentPage, item.totalPage)}
        valueLabel={`${item.currentPage} / ${item.totalPage}ページ`}
        marginY={18}
        width="100%"
      />
      <div>
        <Text>
          Period:{" "}
          {new Date(item.startDate).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}{" "}
          ―{" "}
          {new Date(item.endDate).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </Text>
      </div>
      <Flex justifyContent="end" gap="size-100">
        <UpdateBook bookId={item.id} />
        <DeleteBook bookId={item.id} />
      </Flex>
    </View>
  );
}
