// Function to fetch books from the API and display them
async function getBooks() {
  const response = await fetch("http://localhost:3000/books");
  const books = await response.json();
  displayBooks(books);
}

document.getElementById("book-form").onsubmit = function (event) {
  event.preventDefault();
  const title = document.getElementById("book-title").value;
  const author = document.getElementById("book-author").value;
  const year = document.getElementById("book-year").value;
  createBook(title, author, year);
};

function displayBooks(books) {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";
  books.forEach((book) => {
    const listItem = document.createElement("li");
    listItem.className =
      "list-group-item d-flex justify-content-between align-items-center";
    listItem.textContent = `${book.title} by ${book.author} (${book.year})`;

    // Add delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "btn btn-primary";
    deleteButton.onclick = () => deleteBook(book.id); // Attach the delete functionality
    listItem.appendChild(deleteButton); // Append the delete button to the list item
    bookList.appendChild(listItem); //Append the list item to the book list
  });
}

//DELETE Entity
async function deleteBook(id) {
  await fetch(`http://localhost:3000/books/${id}`, {
    method: "DELETE",
  });
  getBooks(); // Refresh the list
}
