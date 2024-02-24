import { AddBook } from "@/features/home/components/AddBook";
import { UserButton, currentUser } from "@clerk/nextjs";
import style from "./Header.module.css";

export async function Header() {
  const user = await currentUser();

  return (
    <header className={style.header}>
      <h1>Books</h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ paddingRight: "10px" }}>
          {user ? <AddBook uid={user.id} /> : <></>}
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}
