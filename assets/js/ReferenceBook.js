import Book from "./Book.js";
export default class ReferenceBook extends Book {
    locationCode;
    constructor(id, title, author, category, isAvailable, description, locationCode) {
        super(id, title, author, category, isAvailable, description);
        this.locationCode = locationCode;
    }
    getLocationCode() {
        return this.locationCode;
    }
    setLocationCode(code) {
        this.locationCode = code;
    }
    displayInfo() {
        return `${super.displayInfo()} | Location: ${this.locationCode}`;
    }
    hasLocation() {
        return true;
    }
}
