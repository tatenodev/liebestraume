"use client";
import { deleteBook } from "@/serverActions/book";
import { Button } from "@/ui/button";
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
    <Button onClick={() => handleClick(bookId)} disabled={isLoading}>
      {isLoading ? "削除中..." : "削除する"}
    </Button>
  );
}
