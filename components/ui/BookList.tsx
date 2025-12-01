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
      <h2 className="font-bebas-neue font-bold text-4xl w-full text-light-100 text-left">{title}</h2>
      <ul className="book-list">
        {books.map((book) =>
          variant === "Book" ? (
            <BookCard key={book.id} {...book} />
          ) : (
            <BookCardBorrowed key={book.id} {...book} />
          )
        )}
      </ul>
    </section>
  )
}