"use client";

import { View } from "@adobe/react-spectrum";
import { BookItem } from "./BookItem";
import {Item, TabList, TabPanels, Tabs} from '@adobe/react-spectrum'

type BooksProps = {
  data:
    | {
        id: number;
        title: string;
        totalPage: number;
        currentPage: number;
        startDate: Date;
        endDate: Date;
        createdAt: Date;
        userId: number;
      }[]
    | null;
};

export function Books({ data }: BooksProps) {
  if (!data) return <></>;

  return (
    <View paddingX="size-200">
      <Tabs>
        <TabList marginBottom="size-200">
          <Item key="New">これから読む</Item>
          <Item key="InProgress">進行中</Item>
          <Item key="Done">読了</Item>
        </TabList>
        <TabPanels>
          <Item key="New">
            {data.map((item) => (
              <BookItem key={item.id} book={item} />
            ))}
          </Item>
          <Item key="InProgress">in progress</Item>
          <Item key="Done">Done</Item>
        </TabPanels>
      </Tabs>
      </View>
  );
}
