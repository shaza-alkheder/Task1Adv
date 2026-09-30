export default class Library {
    books = [];
    addBook(book) {
        this.books.push(book);
    }
    getBooks() {
        return [...this.books];
    }
    getBookById(id) {
        return this.books.find((book) => book.getId() === id);
    }
    removeBook(id) {
        this.books = this.books.filter((book) => book.getId() !== id);
    }
    searchBooks(searchText) {
        const searchBook = searchText.toLowerCase().trim();
        return this.books.filter((book) => {
            const titleSearch = book.getTitle().toLowerCase();
            const authorSearch = book.getAuthor().toLowerCase();
            return titleSearch.includes(searchBook) || authorSearch.includes(searchBook);
        });
    }
    filterByCategory(category) {
        return this.books.filter((book) => category === "all" || book.getCategory() === category);
    }
    toggleAvailability(id) {
        this.books.find((book) => book.getId() === id)?.toggleAvailability();
    }
}
