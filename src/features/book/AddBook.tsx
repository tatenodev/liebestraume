"use client";
import { createBook } from "@/serverActions/book";
import { Button } from "@/ui/button";

type AddBookProps = {
  uid: string;
};

export function AddBook({ uid }: AddBookProps) {
  const handleAddBook = async () => {
    const { data } = await createBook({
      title: "foo",
      totalPage: 100,
      currentPage: 50,
      startDate: new Date(),
      endDate: new Date(),
      uid: uid,
    });
    alert(JSON.stringify(data));
  };

  return <Button onClick={handleAddBook}>本を追加</Button>;
}
