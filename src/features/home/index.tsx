import { UserButton, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { AddBook } from "./components/AddBook";

export async function Home() {
  const user = await currentUser();

  if (!user) {
    return (
      <div>
        <h1>Liebestraume</h1>
        <Link href="/sign-in">SignIn</Link>
      </div>
    );
  }

  return (
    <main>
      <h1>Liebestraume</h1>
      <UserButton afterSignOutUrl="/" />
      <AddBook uid={user.id} />
    </main>
  );
}
