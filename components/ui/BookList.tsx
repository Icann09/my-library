import BookCard from "./BookCard";
import BookCardBorrowed from "./BookCardBorrowed";

interface Props {
  title: string;
  books: Book[];
  containerClassName?:string; 
  variant: "Book" | "BorrowedBook";
}

export default function BookList({ title, books, containerClassName, variant }: Props) {
  if (books.length < 2) return;
  
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue font-bold text-4xl w-full text-light-100 text-left mb-4">{title}</h2>
      <div className="book-list no-scrollbar p-4">
        {books.map((book) =>
          variant === "Book" ? (
            <BookCard key={book.id} {...book} />
          ) : (
            <BookCardBorrowed key={book.id} {...book} />
          )
        )}
      </div>
    </section>
  )
}