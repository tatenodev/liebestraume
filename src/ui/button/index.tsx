"use client";
import { ButtonHTMLAttributes, forwardRef } from "react";

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  return (
    <button type={props.type} ref={ref} {...props}>
      {props.children}
    </button>
  );
});
