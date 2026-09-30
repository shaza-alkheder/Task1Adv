import { BookCategory } from "./BookCategory.js";
import  Book  from "./Book.js";
import  Library  from "./Library.js";
import { bookList } from "./data.js";

const navbar: HTMLElement | null = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar?.classList.add("scrolled");
  } else {
    navbar?.classList.remove("scrolled");
  }
});

const library = new Library();
bookList.forEach((book) => {
  library.addBook(book);
});

const books = library.getBooks();
const booksContainer: HTMLElement | null = document.querySelector("#books");
const searchInput: HTMLInputElement | null = document.querySelector("#searchInput");
const categoryFilter: HTMLSelectElement | null =document.querySelector("#categoryFilter");

if (categoryFilter) {
  categoryFilter.innerHTML += Object.values(BookCategory)
    .map(
      (category) =>
        `<option value="${category}">${category}</option>`
    )
    .join("");
}
function displayBooks(books: Book[]): void {
  if (booksContainer) {
    booksContainer.innerHTML = books
      .map(
        (book) => `
        <div class="book-card">
          <h2>${book.getTitle()}</h2>
          <div class="book-card-content">
            <p class="book-author">
              <i class="fa-regular fa-user"></i>
              ${book.getAuthor()}
            </p>
            <p class="book-category">
              <span>Category:</span>
              ${book.getCategory()}
            </p>
            ${ book.hasLocation() ? ` <p class="book-location"> <span>Location:</span> ${book.getLocationCode()} </p> ` : "" }
            <p class="book-description">
              ${book.getDescription()}
            </p>
            <div class="book-availability">
              <span> ${book.getIsAvailable() ? "Available" : "Unavailable"}</span>
              <label class="toggle">
                <input
                  type="checkbox"
                  data-id="${book.getId()}"
                  ${book.getIsAvailable() ? "checked" : ""}
                >
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      `,
      )
      .join("");
    toggleEvents();
  }
}

displayBooks(books);
function toggleEvents(): void {
  if (booksContainer) {
  const toggles = booksContainer.querySelectorAll<HTMLInputElement>(
    'input[type="checkbox"]',
  );

  toggles.forEach((toggle) => {
    toggle.addEventListener("change", () => {
      const id = Number(toggle.dataset.id);
      library.toggleAvailability(id);
      filterBooks();
    });
  });
  }
}
function filterBooks(): void {

    if (searchInput && categoryFilter) {
  const query = searchInput.value;
  const category = categoryFilter.value as BookCategory | "all";
  let filtered = library.searchBooks(query);
  if (category !== "all") {
    filtered = library
      .filterByCategory(category)
      .filter((book) => filtered.includes(book));
  }
  displayBooks(filtered);
}
}

if (searchInput) {
  searchInput.addEventListener("input", filterBooks);
}
if (categoryFilter) {
  categoryFilter.addEventListener("change", filterBooks);
}
filterBooks();
