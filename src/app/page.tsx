import { Button } from "@/ui/button";
import { UserButton, currentUser } from "@clerk/nextjs";
import Link from "next/link";

export default async function HomePage() {
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
      <Button>本を追加</Button>
    </main>
  );
}
