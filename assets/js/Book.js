export default class Book {
    id;
    title;
    author;
    category;
    isAvailable;
    description;
    constructor(id, title, author, category, isAvailable, description) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.category = category;
        this.isAvailable = isAvailable;
        this.description = description;
    }
    getId() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getAuthor() {
        return this.author;
    }
    getCategory() {
        return this.category;
    }
    getIsAvailable() {
        return this.isAvailable;
    }
    getDescription() {
        return this.description;
    }
    setTitle(title) {
        this.title = title;
    }
    setAuthor(author) {
        this.author = author;
    }
    setCategory(category) {
        this.category = category;
    }
    setDescription(description) {
        this.description = description;
    }
    toggleAvailability() {
        this.isAvailable = !this.isAvailable;
    }
    displayInfo() {
        return `${this.title} | ${this.author} |[${this.category}] - ${this.isAvailable ? "Available" : "Unavailable"}`;
    }
    hasLocation() {
        return false;
    }
    getLocationCode() {
        return null;
    }
}
