import { BookCategory } from "./BookCategory.js";
import Book from "./Book.js";
import Library from "./Library.js";
import ReferenceBook from "./ReferenceBook.js";
import { bookList } from "./data.js";
const library = new Library();
bookList.forEach((book) => {
    library.addBook(book);
});
const booksTableBody = document.querySelector("#booksTableBody");
function displayBooks() {
    if (booksTableBody) {
        const books = library.getBooks();
        booksTableBody.innerHTML = books
            .map((book) => {
            return `
        <tr>
          <td>${book.getId()}</td>
          <td>${book.getTitle()}</td>
          <td>${book.getAuthor()}</td>
          <td>${book.getCategory()}</td>
          <td>${book.hasLocation() ? book.getLocationCode() : "-"}</td>
          <td>
            ${book.getIsAvailable() ? "Available" : "Unavailable"}
          </td>
          <td class="table-actions">
            <button
              class="view-btn"
              data-id="${book.getId()}"
              title="View Book"
            >
              <i class="fa-regular fa-eye"></i>
            </button>
            <button
              class="delete-btn"
              data-id="${book.getId()}"
              title="Delete Book"
            >
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </td>
        </tr>
      `;
        })
            .join("");
        addTableEvents();
    }
}
function addTableEvents() {
    if (booksTableBody) {
        const viewButtons = booksTableBody.querySelectorAll(".view-btn");
        const deleteButtons = booksTableBody.querySelectorAll(".delete-btn");
        viewButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const id = Number(button.dataset.id);
                openViewModal(id);
            });
        });
        deleteButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const id = Number(button.dataset.id);
                openDeleteModal(id);
            });
        });
    }
}
const viewBookModal = document.querySelector("#viewBookModal");
const closeViewModalBtn = document.querySelector("#closeViewModal");
const viewBookTitle = document.querySelector("#viewBookTitle");
const viewBookAuthor = document.querySelector("#viewBookAuthor");
const viewBookCategory = document.querySelector("#viewBookCategory");
const viewBookDescription = document.querySelector("#viewBookDescription");
const viewBookStatus = document.querySelector("#viewBookStatus");
const viewBookLocation = document.querySelector("#viewBookLocation");
function openViewModal(id) {
    const book = library.getBookById(id);
    if (!book ||
        !viewBookModal ||
        !viewBookTitle ||
        !viewBookAuthor ||
        !viewBookCategory ||
        !viewBookDescription ||
        !viewBookStatus ||
        !viewBookLocation) {
        return;
    }
    viewBookTitle.value = book.getTitle();
    viewBookAuthor.value = book.getAuthor();
    viewBookCategory.value = book.getCategory();
    viewBookDescription.value = book.getDescription();
    viewBookStatus.value = book.getIsAvailable() ? "Available" : "Unavailable";
    viewBookLocation.value = book.hasLocation()
        ? (book.getLocationCode() ?? "-")
        : "-";
    viewBookModal.classList.add("show");
}
function closeViewModal() {
    viewBookModal?.classList.remove("show");
}
closeViewModalBtn?.addEventListener("click", closeViewModal);
const deleteBookModal = document.querySelector("#deleteBookModal");
const closeDeleteModalBtn = document.querySelector("#closeDeleteModal");
const cancelDeleteBtn = document.querySelector("#cancelDeleteBtn");
const confirmDeleteBtn = document.querySelector("#confirmDeleteBtn");
let selectedBookId = null;
function openDeleteModal(id) {
    selectedBookId = id;
    deleteBookModal?.classList.add("show");
}
function closeDeleteModal() {
    deleteBookModal?.classList.remove("show");
    selectedBookId = null;
}
closeDeleteModalBtn?.addEventListener("click", closeDeleteModal);
cancelDeleteBtn?.addEventListener("click", closeDeleteModal);
confirmDeleteBtn?.addEventListener("click", () => {
    if (selectedBookId === null) {
        return;
    }
    library.removeBook(selectedBookId);
    closeDeleteModal();
    displayBooks();
});
const addBookBtn = document.querySelector("#addBookBtn");
const bookModal = document.querySelector("#bookModal");
const closeBookModalBtn = document.querySelector("#closeBookModal");
const bookForm = document.querySelector("#bookForm");
const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor");
const bookCategory = document.querySelector("#bookCategory");
const bookDescription = document.querySelector("#bookDescription");
const bookAvailability = document.querySelector("#bookAvailability");
const locationCode = document.querySelector("#locationCode");
/* Categories */
if (bookCategory) {
    bookCategory.innerHTML += Object.values(BookCategory)
        .map((category) => `<option value="${category}">${category}</option>`)
        .join("");
}
/*  (Add Modal) */
addBookBtn?.addEventListener("click", () => {
    bookForm?.reset();
    if (bookAvailability) {
        bookAvailability.checked = true;
    }
    if (locationCode) {
        locationCode.style.display = "none";
        locationCode.required = false;
    }
    bookModal?.classList.add("show");
});
/* Close Add Modal */
closeBookModalBtn?.addEventListener("click", () => {
    bookModal?.classList.remove("show");
});
/* ----- Show Location only for Reference----- */
bookCategory?.addEventListener("change", () => {
    if (!bookCategory || !locationCode) {
        return;
    }
    if (bookCategory.value === BookCategory.Reference) {
        locationCode.style.display = "block";
        locationCode.required = true;
    }
    else {
        locationCode.style.display = "none";
        locationCode.required = false;
        locationCode.value = "";
    }
});
bookForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!bookTitle ||
        !bookAuthor ||
        !bookCategory ||
        !bookDescription ||
        !bookAvailability ||
        !locationCode) {
        return;
    }
    const title = bookTitle.value.trim();
    const author = bookAuthor.value.trim();
    const category = bookCategory.value;
    const description = bookDescription.value.trim();
    const isAvailable = bookAvailability.checked;
    const books = library.getBooks();
    const id = books.length > 0 ? Math.max(...books.map((book) => book.getId())) + 1 : 1;
    if (category === BookCategory.Reference) {
        const referenceBook = new ReferenceBook(id, title, author, category, isAvailable, description, locationCode.value.trim());
        library.addBook(referenceBook);
    }
    else {
        const book = new Book(id, title, author, category, isAvailable, description);
        library.addBook(book);
    }
    bookForm.reset();
    bookAvailability.checked = true;
    locationCode.style.display = "none";
    locationCode.required = false;
    bookModal?.classList.remove("show");
    displayBooks();
});
displayBooks();
