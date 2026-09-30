import { BookCategory } from "./BookCategory.js";
import  Book  from "./Book.js";
import  Library  from "./Library.js";
import  ReferenceBook  from "./ReferenceBook.js";
import { bookList } from "./data.js";

const library = new Library();
bookList.forEach((book) => {
  library.addBook(book);
});

const booksTableBody: HTMLTableSectionElement | null =
  document.querySelector("#booksTableBody");

function displayBooks(): void {
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

function addTableEvents(): void {
  if (booksTableBody) {
    const viewButtons =
      booksTableBody.querySelectorAll<HTMLButtonElement>(".view-btn");
    const deleteButtons =
      booksTableBody.querySelectorAll<HTMLButtonElement>(".delete-btn");
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
const viewBookModal: HTMLElement | null =
  document.querySelector("#viewBookModal");
const closeViewModalBtn: HTMLButtonElement | null =
  document.querySelector("#closeViewModal");
const viewBookTitle: HTMLInputElement | null =
  document.querySelector("#viewBookTitle");
const viewBookAuthor: HTMLInputElement | null =
  document.querySelector("#viewBookAuthor");
const viewBookCategory: HTMLInputElement | null =
  document.querySelector("#viewBookCategory");
const viewBookDescription: HTMLTextAreaElement | null = document.querySelector(
  "#viewBookDescription",
);
const viewBookStatus: HTMLInputElement | null =
  document.querySelector("#viewBookStatus");
const viewBookLocation: HTMLInputElement | null =
  document.querySelector("#viewBookLocation");

function openViewModal(id: number): void {
  const book = library.getBookById(id);
  if (
    !book ||
    !viewBookModal ||
    !viewBookTitle ||
    !viewBookAuthor ||
    !viewBookCategory ||
    !viewBookDescription ||
    !viewBookStatus ||
    !viewBookLocation
  ) {
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

function closeViewModal(): void {
  viewBookModal?.classList.remove("show");
}
closeViewModalBtn?.addEventListener("click", closeViewModal);

const deleteBookModal: HTMLElement | null =
  document.querySelector("#deleteBookModal");
const closeDeleteModalBtn: HTMLButtonElement | null =
  document.querySelector("#closeDeleteModal");
const cancelDeleteBtn: HTMLButtonElement | null =
  document.querySelector("#cancelDeleteBtn");
const confirmDeleteBtn: HTMLButtonElement | null =
  document.querySelector("#confirmDeleteBtn");
let selectedBookId: number | null = null;

function openDeleteModal(id: number): void {
  selectedBookId = id;

  deleteBookModal?.classList.add("show");
}

function closeDeleteModal(): void {
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

const addBookBtn: HTMLButtonElement | null =
  document.querySelector("#addBookBtn");
const bookModal: HTMLElement | null = document.querySelector("#bookModal");
const closeBookModalBtn: HTMLButtonElement | null =
  document.querySelector("#closeBookModal");
const bookForm: HTMLFormElement | null = document.querySelector("#bookForm");
const bookTitle: HTMLInputElement | null = document.querySelector("#bookTitle");
const bookAuthor: HTMLInputElement | null =
  document.querySelector("#bookAuthor");
const bookCategory: HTMLSelectElement | null =
  document.querySelector("#bookCategory");
const bookDescription: HTMLTextAreaElement | null =
  document.querySelector("#bookDescription");
const bookAvailability: HTMLInputElement | null =
  document.querySelector("#bookAvailability");
const locationCode: HTMLInputElement | null =
  document.querySelector("#locationCode");

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
  } else {
    locationCode.style.display = "none";
    locationCode.required = false;
    locationCode.value = "";
  }
});

bookForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (
    !bookTitle ||
    !bookAuthor ||
    !bookCategory ||
    !bookDescription ||
    !bookAvailability ||
    !locationCode
  ) {
    return;
  }
  const title = bookTitle.value.trim();
  const author = bookAuthor.value.trim();
  const category = bookCategory.value as BookCategory;
  const description = bookDescription.value.trim();
  const isAvailable = bookAvailability.checked;
  const books = library.getBooks();
  const id =
    books.length > 0 ? Math.max(...books.map((book) => book.getId())) + 1 : 1;
  if (category === BookCategory.Reference) {
    const referenceBook = new ReferenceBook(
      id,
      title,
      author,
      category,
      isAvailable,
      description,
      locationCode.value.trim(),
    );
    library.addBook(referenceBook);
  } else {
    const book = new Book(
      id,
      title,
      author,
      category,
      isAvailable,
      description,
    );
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

