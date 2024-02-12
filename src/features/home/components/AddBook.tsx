"use client";
import { createBook } from "@/serverActions/book";
import { Button } from "@/ui/button";
import { useId, useState } from "react";

type AddBookProps = {
  uid: string;
};

export function AddBook({ uid }: AddBookProps) {
  const id = useId();
  const [title, setTitle] = useState("");
  const [totalPage, setTotalPage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleAddBook = async () => {
    if (startDate === "" || endDate === "") return alert("日付指定なし");

    const { data } = await createBook({
      title,
      totalPage: parseInt(totalPage),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      uid: uid,
    });
    alert(JSON.stringify(data));
  };

  const handleChangeTotalPage = (totalPage: string) => {
    const re = /^\d+$/;
    switch (true) {
      case re.test(totalPage):
        setTotalPage(totalPage);
        break;

      case totalPage === "":
        setTotalPage("");
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <div>
        <label htmlFor={`${id}-title`}>タイトル</label>
        <input
          id={`${id}-title`}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor={`${id}-totalPage`}>読むページ数</label>
        <input
          id={`${id}-totalPage`}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          value={totalPage}
          onChange={(e) => handleChangeTotalPage(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor={`${id}-startDate`}>読み始め</label>
        <input
          id={`${id}-startDate`}
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor={`${id}-endDate`}>読み終わり</label>
        <input
          id={`${id}-endDate`}
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <Button onClick={handleAddBook}>本を追加</Button>
    </div>
  );
}
