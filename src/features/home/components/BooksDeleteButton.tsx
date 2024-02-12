"use client";
import { deleteBook } from "@/serverActions/book";
import { Button } from "@/ui/button";

type BooksDeleteButtonProps = {
  bookId: number;
}

export function BooksDeleteButton({ bookId }: BooksDeleteButtonProps) {
  const handleClick = async (id: number) => {
    const deleted = await deleteBook(id);
  };

  return <Button onClick={() => handleClick(bookId)}>削除</Button>;
}
