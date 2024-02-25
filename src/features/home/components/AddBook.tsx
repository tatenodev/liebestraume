"use client";
import { createBook } from "@/serverActions/book";
import {
  ActionButton,
  Button,
  ButtonGroup,
  Content,
  DateRangePicker,
  Dialog,
  DialogTrigger,
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

  const handleAddBook = async (onClose: () => void) => {
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
    onClose();
  };

  const handleChangeTotalPage = (totalPage: string) => {
    const re = /^\d+$/;
    if (re.test(totalPage)) setTotalPage(totalPage);
    if (totalPage === "") setTotalPage("");
  };

  return (
    <DialogTrigger isDismissable>
      <Button variant="accent">本を追加</Button>
      {(close) => (
        <Dialog>
          <Content>
            <Form>
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
              <ButtonGroup align="center">
                <ActionButton
                  onPress={() => handleAddBook(close)}
                  isDisabled={isLoading}
                >
                  {isLoading ? "追加中..." : "追加"}
                </ActionButton>
              </ButtonGroup>
            </Form>
          </Content>
        </Dialog>
      )}
    </DialogTrigger>
  );
}
