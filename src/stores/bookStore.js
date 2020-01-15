import { decorate, observable, computed } from "mobx";
import axios from "axios";
import authorStore from "./authorStore";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com/api/"
});

instance.defaults.headers.common.Authorization =
  "jwt eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxODksInVzZXJuYW1lIjoidGVzdGluZ2c1IiwiZXhwIjoxNTc5MTA4NDU0LCJlbWFpbCI6InRlc3QxQGluZ2cuY29tIn0.W_SlwFLAPshRc7XOtNaBR6YFLdZ6XVvg6qcg5o1AVMQ";

function errToArray(err) {
  return Object.keys(err).map(key => `${key}: ${err[key]}`);
}

class BookStore {
  books = [];

  query = "";

  loading = true;

  fetchBooks = async () => {
    try {
      const res = await instance.get("books/");
      const books = res.data;
      this.books = books;
      this.loading = false;
    } catch (err) {}
  };

  get filteredBooks() {
    return this.books.filter(book => {
      return book.title.toLowerCase().includes(this.query.toLowerCase());
    });
  }

  getBookById = id => this.books.find(book => +book.id === +id);

  getBooksByColor = color =>
    this.filteredBooks.filter(book => book.color === color);

  get getColors() {
    let colors = [];
    this.books.forEach(book => {
      if (!colors.includes(book.color)) {
        colors.push(book.color);
      }
    });
    return colors;
  }

  addBook = async newBook => {
    try {
      const res = await instance.post("books/", newBook);
      const book = res.data;
      this.books.unshift(book);

      authorStore.authors.forEach(author => {
        if (newBook.authors.includes(author.id)) {
          author.books.push(book.id);
        }
      });

      this.errors = null;
    } catch (err) {
      console.error(err);
      // this.errors = errToArray(err.response);
    }
  };
}

decorate(BookStore, {
  books: observable,
  query: observable,
  loading: observable,
  filteredBooks: computed,
  getColors: computed
});

const bookStore = new BookStore();
bookStore.fetchBooks();

export default bookStore;
