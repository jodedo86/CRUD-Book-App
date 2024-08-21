// Wait until the DOM content is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  // API endpoint for books
  const apiUrl = "http://localhost:3000/books";

  // Get references to HTML elements
  const bookForm = document.getElementById("bookForm");
  const bookList = document.getElementById("bookList");

  // Function to fetch all books from the API and display them
  async function fetchBooks() {
    try {
      // Fetch the list of books from the API
      const response = await fetch(apiUrl);
      // Convert the response to JSON
      const books = await response.json();
      // Call displayBooks to show the books on the page
      displayBooks(books);
    } catch (error) {
      // Log any errors that occur during the fetch
      console.error("Error fetching books:", error);
    }
  }

  // Function to display books in the list
  function displayBooks(books) {
    // Clear the existing book list
    bookList.innerHTML = "";
    // Iterate over each book and create list items
    books.forEach((book) => {
      const li = document.createElement("li");
      // Add Bootstrap classes to the list item
      li.classList.add("list-group-item");
      // Set the text content of the list item using temperate literals
      li.textContent = `${book.title} by ${book.author}`;

      // Create a delete button for each book
      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("btn", "btn-danger", "btn-sm", "float-right");
      deleteBtn.textContent = "Delete";

      // Add an event listener to handle delete button clicks
      deleteBtn.addEventListener("click", () => deleteBook(book.id));
      // Append the delete button to the list item
      li.appendChild(deleteBtn);
      // Append the list item to the book list
      bookList.appendChild(li);
    });
  }

  // Function to delete a book by its ID
  async function deleteBook(id) {
    try {
      // Send a DELETE request to the API to remove the book
      await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      });
      // After deletion, fetch the updated list of books
      fetchBooks();
    } catch (error) {
      // Log any errors that occur during the delete request
      console.error("Error deleting book:", error);
    }
  }

  // Handle form submission to add a new book
  bookForm.addEventListener("submit", async (e) => {
    // Prevent the form from refreshing the page
    e.preventDefault();

    // Get values from form inputs
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = document.getElementById("year").value;

    try {
      // Send a POST request to add a new book
      await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, author }),
      });
      // Reset the form fields
      bookForm.reset();
      // Fetch and display the updated list of books
      fetchBooks();
    } catch (error) {
      // Log any errors that occur during the POST request
      console.error("Error adding book:", error);
    }
  });

  // Initial fetch to load and display books when the page loads
  fetchBooks();
});
