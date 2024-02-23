"use client";
import { createBook } from "@/serverActions/book";
import {
  Button,
  ButtonGroup,
  DateRangePicker,
  Form,
  TextField,
} from "@adobe/react-spectrum";
import type { DateValue } from "@react-types/datepicker";
import type { RangeValue } from "@react-types/shared";
import { useState } from "react";

type AddBookProps = {
  uid: string;
};

export function AddBook({ uid }: AddBookProps) {
  const [title, setTitle] = useState("");
  const [totalPage, setTotalPage] = useState("");
  const [schedule, setSchedule] = useState<RangeValue<DateValue>>();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddBook = async () => {
    if (!schedule) return alert("日付指定がない");

    setIsLoading(true);
    await createBook({
      title,
      totalPage: parseInt(totalPage),
      startDate: new Date(schedule.start.toString()),
      endDate: new Date(schedule.end.toString()),
      uid: uid,
    });
    setIsLoading(false);
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
    <Form maxWidth="size-3600">
      <TextField
        label="タイトル"
        type="text"
        value={title}
        onChange={(value) => setTitle(value)}
      />
      <TextField
        label="読むページ数"
        type="text"
        inputMode="numeric"
        pattern="\d*"
        value={totalPage}
        onChange={(value) => handleChangeTotalPage(value)}
      />
      <DateRangePicker
        label="目標の開始日と終了日"
        onChange={(e) => setSchedule(e)}
        value={schedule}
      />
      <ButtonGroup>
        <Button
          onPress={handleAddBook}
          isDisabled={isLoading}
          variant={"primary"}
        >
          {isLoading ? "追加中..." : "本を追加"}
        </Button>
      </ButtonGroup>
    </Form>
  );
}
