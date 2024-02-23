import { getBooks } from "@/serverActions/book";
import { currentUser } from "@clerk/nextjs";
import { BookItem } from "./BookItem";

export async function Books() {
  const user = await currentUser();
  const { data } = user ? await getBooks(user.id) : { data: null };

  if (!data) return <></>;

  return (
    <div>
      <div>=========================</div>
      {data.map((item) => (
        <BookItem key={item.id} item={item} />
      ))}
    </div>
  );
}
