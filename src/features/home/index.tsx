import { Header } from "@/common/components/Header";
import { getBooks } from "@/serverActions/book";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
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

  const { data } = user ? await getBooks(user.id) : { data: null };

  return (
    <main>
      <Header />
      <Books data={data} />
    </main>
  );
}
