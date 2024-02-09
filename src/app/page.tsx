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
      <div>{JSON.stringify(user)}</div>
    </main>
  );
}
