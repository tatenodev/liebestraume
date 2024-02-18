import { UserButton } from "@clerk/nextjs";
import style from "./Header.module.css";

export function Header() {
  return (
    <header className={style.header}>
      <h1>Liebestraume</h1>
      <UserButton afterSignOutUrl="/" />
    </header>
  );
}
