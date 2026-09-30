import Book  from "./Book.js";
import { BookCategory } from "./BookCategory.js";

export default class ReferenceBook extends Book {
  private locationCode: string;
  constructor(
    id: number,
    title: string,
    author: string,
    category: BookCategory,
    isAvailable: boolean,
    description: string,
    locationCode: string,
  ) {
    super(id, title, author, category, isAvailable, description);
    this.locationCode = locationCode;
  }
  getLocationCode(): string {
    return this.locationCode;
  }

  setLocationCode(code: string): void {
    this.locationCode = code;
  }
  displayInfo(): string {
    return `${super.displayInfo()} | Location: ${this.locationCode}`;
  }
  hasLocation(): boolean {
    return true;
  }
}
