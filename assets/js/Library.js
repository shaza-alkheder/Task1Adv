export default class Library {
    books = [];
    addBook(book) {
        this.books.push(book);
    }
    removeBook(id) {
        this.books = this.books.filter((book) => book.getId() !== id);
    }
    searchBooks(searchText) {
        const search = searchText.toLowerCase().trim();
        return this.books.filter((book) => book.getTitle().toLowerCase().includes(search) ||
            book.getAuthor().toLowerCase().includes(search));
    }
    filterByCategory(category) {
        if (category === "all") {
            return this.books;
        }
        return this.books.filter((book) => book.getCategory() === category);
    }
    getBooks() {
        return this.books;
    }
    toggleAvailability(id) {
        const book = this.books.find((book) => book.getId() === id);
        if (book) {
            book.toggleAvailability();
        }
    }
    getBookById(id) {
        return this.books.find((book) => book.getId() === id);
    }
}
