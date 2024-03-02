"use client";
import { deleteBook } from "@/serverActions/book/delete";
import {
  ActionButton,
  AlertDialog,
  DialogTrigger,
} from "@adobe/react-spectrum";
import { useState } from "react";

type DeleteBookProps = {
  bookId: number;
};

export function DeleteBook({ bookId }: DeleteBookProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = async (id: number) => {
    setIsLoading(true);
    await deleteBook(id);
    setIsLoading(false);
  };

  return (
    <DialogTrigger>
      <ActionButton>削除</ActionButton>
      <AlertDialog
        title="本の削除"
        variant="destructive"
        primaryActionLabel="削除する"
        cancelLabel="キャンセル"
        autoFocusButton="cancel"
        onPrimaryAction={() => handlePress(bookId)}
        isPrimaryActionDisabled={isLoading}
      >
        本を削除しますか？
      </AlertDialog>
    </DialogTrigger>
  );
}
