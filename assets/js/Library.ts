import  Book  from "./Book.js";
import { BookCategory } from "./BookCategory.js";

export default class Library {
  private books: Book[] = [];
  addBook(book: Book): void {
    this.books.push(book);
  }
  removeBook(id: number): void {
    this.books = this.books.filter((book) => book.getId() !== id);
  }

searchBooks(searchText: string): Book[] {
  const searchBook = searchText.toLowerCase().trim();
  return this.books.filter((book) => {
    const titleSearch = book.getTitle().toLowerCase();
    const authorSearch = book.getAuthor().toLowerCase();
    return titleSearch.includes(searchBook) || authorSearch.includes(searchBook);
  });
}

filterByCategory(category: BookCategory | "all"): Book[] {
  return this.books.filter(
    (book) => category === "all" || book.getCategory() === category
  );
}
  getBooks(): Book[] {
   return [...this.books];
  }
  getBookById(id: number): Book | undefined {
  return this.books.find((book) => book.getId() === id);
}
toggleAvailability(id: number): void {
  this.books.find((book) => book.getId() === id)?.toggleAvailability();
}


}
