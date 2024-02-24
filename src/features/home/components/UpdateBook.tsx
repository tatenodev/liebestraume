"use client";
import { incrementPage } from "@/serverActions/book";
import {
  ActionButton,
  ButtonGroup,
  Content,
  Dialog,
  DialogTrigger,
} from "@adobe/react-spectrum";
import { useState } from "react";

type UpdateBookProps = {
  bookId: number;
};

export function UpdateBook({ bookId }: UpdateBookProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = async (onClose: () => void) => {
    setIsLoading(true);
    await incrementPage({
      id: bookId,
      incrementValue: 10,
    });
    setIsLoading(false);
    onClose();
  };

  return (
    <DialogTrigger isDismissable>
      <ActionButton>更新</ActionButton>
      {(close) => (
        <Dialog>
          <Content>
            <ButtonGroup>
              <ActionButton
                onPress={() => handlePress(close)}
                isDisabled={isLoading}
              >
                更新
              </ActionButton>
            </ButtonGroup>
          </Content>
        </Dialog>
      )}
    </DialogTrigger>
  );
}
