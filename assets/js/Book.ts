import { BookCategory } from "./BookCategory.js";

export default class Book{
  private id: number;
  private title: string;
  private author: string;
  private category:  BookCategory;
  private isAvailable: boolean;
  private description: string;

  constructor(
    id: number,
    title: string,
    author: string,
    category: BookCategory,
    isAvailable: boolean,
    description: string,
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.category = category;
    this.isAvailable = isAvailable;
    this.description = description;
  }
  getId(): number {
    return this.id;
  }
  getTitle(): string {
    return this.title;
  }
  getAuthor(): string {
    return this.author;
  }
    getCategory(): BookCategory {
    return this.category;
  }
    getIsAvailable(): boolean  {
    return this.isAvailable;
  }
    getDescription(): string {
    return this.description;
  }
    setTitle(title: string): void {
    this.title = title;
  }
  setAuthor(author: string): void {
    this.author = author;
  }
  setCategory(category: BookCategory): void {
    this.category = category;
  }
  setDescription(description: string): void {
    this.description = description;
  }
 toggleAvailability(): void {
    this.isAvailable = !this.isAvailable;
  }
  displayInfo(): string {
    return `${this.title} | ${this.author} |[${this.category}] - ${
      this.isAvailable ? "Available" : "Unavailable"
    }`;
}
hasLocation(): boolean {
  return false;
}
getLocationCode(): string | null {
  return null;
}
}


