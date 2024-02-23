"use client";

import { Meter } from "@adobe/react-spectrum";
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
  const calculateProgressRate = (denominator: number, numerator: number) => {
    const result = numerator / denominator;
    return result;
  };

  return (
    <div>
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
    </div>
  );
}
