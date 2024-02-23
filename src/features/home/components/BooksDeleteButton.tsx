"use client";
import { deleteBook } from "@/serverActions/book";
import { Button } from "@adobe/react-spectrum";
import { useState } from "react";

type BooksDeleteButtonProps = {
  bookId: number;
};

export function BooksDeleteButton({ bookId }: BooksDeleteButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (id: number) => {
    setIsLoading(true);
    await deleteBook(id);
    setIsLoading(false);
  };

  return (
    <Button
      onPress={() => handleClick(bookId)}
      isDisabled={isLoading}
      variant="primary"
    >
      {isLoading ? "削除中..." : "削除する"}
    </Button>
  );
}
