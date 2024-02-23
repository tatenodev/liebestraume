"use client";

import { Meter, View } from "@adobe/react-spectrum";
import { calculateProgressRate } from "../functions";
import { BooksDeleteButton } from "./BooksDeleteButton";

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
  return (
    <View
      borderRadius="medium"
      marginBottom="size-200"
      marginX="size-200"
      padding="size-100"
      UNSAFE_style={{ boxShadow: "0px 0px 4px rgba(0, 0, 0, .5)" }}
    >
      <div>{item.title}</div>
      <Meter
        label="Progress"
        variant="positive"
        value={calculateProgressRate(item.totalPage, item.currentPage)}
        valueLabel={`${item.currentPage} / ${item.totalPage}ページ`}
        marginY={18}
      />
      <div>
        開始日:{" "}
        {new Date(item.startDate).toLocaleDateString("ja-JP", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </div>
      <div>
        目標日:{" "}
        {new Date(item.endDate).toLocaleDateString("ja-JP", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </div>
      <BooksDeleteButton bookId={item.id} />
    </View>
  );
}
