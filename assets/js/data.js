import Book from "./Book.js";
import { BookCategory } from "./BookCategory.js";
import ReferenceBook from "./ReferenceBook.js";
export const bookList = [
    new Book(1, "Clean Code", "Robert C. Martin", BookCategory.Programming, true, "A practical guide to writing clean, readable and maintainable code."),
    new Book(2, "The Pragmatic Programmer", "Andrew Hunt", BookCategory.Programming, false, "A guide to becoming a better and more effective programmer."),
    new ReferenceBook(3, "JavaScript Guide", "John Doe", BookCategory.Reference, true, "A complete JavaScript reference.", "A-12"),
    new Book(4, "Introduction to Algorithms", "Thomas H. Cormen", BookCategory.Mathematics, true, "A comprehensive introduction to algorithms and computational problem solving."),
    new Book(5, "The Pragmatic Programmer", "Andrew Hunt", BookCategory.Programming, false, "Your journey to mastery."),
    new Book(6, "A Brief History of Time", "Stephen Hawking", BookCategory.Science, true, "An introduction to cosmology, space and the nature of time."),
    new Book(7, "The Selfish Gene", "Richard Dawkins", BookCategory.Science, true, "An introduction to evolutionary biology and genetics."),
    new ReferenceBook(8, "Programming Language Reference", "Jane Smith", BookCategory.Reference, false, "A detailed reference guide for programming languages.", "B-04"),
];
