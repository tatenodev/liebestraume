import { Header } from "@/common/components/Header";
import { getCategorizeBooks } from "@/serverActions/book/read";
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

  const categorizeBooks = await getCategorizeBooks(
    user.id,
    new Date().getTime(),
  );

  return (
    <main>
      <Header />
      <Books data={categorizeBooks.data} />
    </main>
  );
}
