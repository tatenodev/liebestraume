import { Header } from "@/common/components/Header";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { AddBook } from "./components/AddBook";
import { Books } from "./components/Books";

export async function Home() {
  const user = await currentUser();

  if (!user) {
    return (
      <main>
        <Header />
        <Link href="/sign-in">SignIn</Link>
      </main>
    );
  }

  return (
    <main>
      <Header />
      <AddBook uid={user.id} />
      <Books />
    </main>
  );
}
