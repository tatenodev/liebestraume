import { getBooks } from "@/serverActions/book";
import { currentUser } from "@clerk/nextjs";
import { BooksDeleteButton } from "./BooksDeleteButton";

export async function Books() {
  const user = await currentUser();
  const { data } = user ? await getBooks(user.id) : { data: null };

  const calculateProgressRate = (denominator: number, numerator: number) => {
    const result = numerator / denominator;
    return result;
  };

  if (!data) return <></>;

  return (
    <div>
      <div>=========================</div>
      {data.map((item) => (
        <div key={item.id}>
          <div>{item.title}</div>
          <div>
            進捗率: {calculateProgressRate(item.totalPage, item.currentPage)}%
          </div>
          <BooksDeleteButton bookId={item.id} />
          <hr />
        </div>
      ))}
    </div>
  );
}
