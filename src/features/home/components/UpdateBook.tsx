"use client";
import { updateBook } from "@/serverActions/book";
import {
  ActionButton,
  AlertDialog,
  DialogTrigger,
} from "@adobe/react-spectrum";
import { useState } from "react";

type UpdateBookProps = {
  bookId: number;
};

export function UpdateBook({ bookId }: UpdateBookProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = async (id: number) => {
    setIsLoading(true);
    // await updateBook({id});
    setIsLoading(false);
  };

  return (
    <DialogTrigger>
      <ActionButton>更新</ActionButton>
      <AlertDialog
        title="本の更新"
        variant="information"
        primaryActionLabel="更新する"
        cancelLabel="キャンセル"
        autoFocusButton="cancel"
        onPrimaryAction={() => handlePress(bookId)}
        isPrimaryActionDisabled={isLoading}
      >
        更新
      </AlertDialog>
    </DialogTrigger>
  );
}
