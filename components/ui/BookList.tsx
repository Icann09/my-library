import BookCard from "./BookCard";

interface Props {
  title: string;
  books: Book[];
  containerClassName?:string; 
}

export default function BookList({ title, books, containerClassName }: Props) {
  if (books.length < 2) return;
  
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue font-bold text-4xl w-full text-light-100 text-left">{title}</h2>
      <ul className="book-list">
        {books.map((book) => {
          return <BookCard key={book.id} {...book}/>
        })}
      </ul>
    </section>
  )
}