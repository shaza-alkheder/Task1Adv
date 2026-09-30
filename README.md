# Library Management System

## About
A simple Library Management System made with TypeScript, HTML, and css. The main purpose of this project is to practice Object-Oriented Programming (OOP) concepts using TypeScript .

The system allows the user to:
-View a list of books.
-Search for books by title or author.
-Filter books by category.
-Change the availability of a book.
-Add new books.
-View book details.
-Delete books from the library.
-Add a location code for reference books.

## OOP Concepts Used
- Encapsulation
The properties inside the classes are private, and methods are used to access or change their values.

-Inheritance
The ReferenceBook class extends the Book class and adds a locationCode property.

-Polymorphism
The ReferenceBook class overrides the displayInfo() method from the Book class to show additional information about the book location.

-Abstraction
The application works with methods such as getTitle(), getAuthor(), getCategory(), and getIsAvailable() instead of accessing the class properties directly.

## Files
index.html – The main page that displays the library books.
dashboard.html – The dashboard page used to manage the books.
Book.ts – Contains the Book class and its properties and methods.
ReferenceBook.ts – Extends the Book class and adds the location code.
BookCategory.ts – Contains the available book categories.
Library.ts – Handles adding, removing, searching, filtering, and updating books.
data.ts – Contains the initial list of books.
index.ts – Handles the home page, book display, search, category filter, and availability toggle.
dashboard.ts – Handles the dashboard, adding, viewing, and deleting books.
style.css – The compiled CSS file used by the HTML pages.


