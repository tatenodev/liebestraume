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
            開始日:{" "}
            {new Date(item.startDate).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </div>
          <div>
            目標日:{" "}
            {new Date(item.endDate).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </div>
          <div>ページ数: {item.totalPage}ページ</div>
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
