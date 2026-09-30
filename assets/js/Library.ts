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
    const search = searchText.toLowerCase().trim();
    return this.books.filter(
      (book) =>
        book.getTitle().toLowerCase().includes(search) ||
        book.getAuthor().toLowerCase().includes(search),
    );
  }

  filterByCategory(category: BookCategory | "all"): Book[] {
    if (category === "all") {
      return this.books;
    }
    return this.books.filter((book) => book.getCategory() === category);
  }
  getBooks(): Book[] {
    return this.books;
  }

  toggleAvailability(id: number): void {
    const book = this.books.find((book) => book.getId() === id);

    if (book) {
      book.toggleAvailability();
    }
  }

  getBookById(id: number): Book | undefined {
  return this.books.find((book) => book.getId() === id);
}
}
