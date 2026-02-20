import BookCard from "./BookCard";
import BookCardBorrowed from "./BookCardBorrowed";

interface LoanedBook extends Book {
  dueDate: string | Date
  borrowedAt: string | Date
}

type Props =
  | {
      title: string;
      books: Book[];
      containerClassName?: string;
      variant: "Book";
    }
  | {
      title: string;
      books: LoanedBook[];
      containerClassName?: string;
      variant: "BorrowedBook";
    };


export default function BookList(props: Props) {
  const { title, containerClassName, variant } = props;

  if (props.books.length < 1) return null;

  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue font-bold text-4xl w-full text-light-100 text-left mb-4">
        {title}
      </h2>

      <div className="book-list no-scrollbar p-4">
        {variant === "Book"
          ? props.books.map((book) => (
              <BookCard key={book.id} {...book} />
            ))
          : props.books.map((book) => (
              <BookCardBorrowed key={book.id} {...book} />
            ))}
      </div>
    </section>
  );
}