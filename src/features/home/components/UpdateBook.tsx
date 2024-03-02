"use client";
import { incrementPage } from "@/serverActions/book/update";
import {
  ActionButton,
  ButtonGroup,
  Content,
  Dialog,
  DialogTrigger,
  Form,
  TextField,
} from "@adobe/react-spectrum";
import { useState } from "react";
import type { BookItemProps } from "./BookItem";

export function UpdateBook({ book }: BookItemProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState("");

  const handlePress = async (onClose: () => void) => {
    const rest = book.totalPage - book.currentPage;
    if (rest < parseInt(page)) return alert("ページの上限が超えている");
    setIsLoading(true);
    await incrementPage({
      id: book.id,
      incrementValue: parseInt(page),
    });
    setIsLoading(false);
    setPage("");
    onClose();
  };

  const handleChangePage = (page: string) => {
    const re = /^\d+$/;
    if (re.test(page)) setPage(page);
    if (page === "") setPage("");
  };

  return (
    <DialogTrigger isDismissable>
      <ActionButton>更新</ActionButton>
      {(close) => (
        <Dialog>
          <Content>
            <Form>
              <TextField
                type="text"
                label="今日読んだページ数"
                inputMode="numeric"
                pattern="\d*"
                value={page}
                onChange={(value) => handleChangePage(value)}
              />
              <ButtonGroup align="center">
                <ActionButton
                  onPress={() => handlePress(close)}
                  isDisabled={page === "" || isLoading}
                >
                  更新
                </ActionButton>
              </ButtonGroup>
            </Form>
          </Content>
        </Dialog>
      )}
    </DialogTrigger>
  );
}
