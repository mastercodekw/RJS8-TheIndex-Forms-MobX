import React from "react";
import bookStore from "./stores/bookStore";
import authorStore from "./stores/authorStore";

export default class BookForm extends React.Component {
  state = {
    title: "",
    color: ""
  };

  textChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitBook = async event => {
    event.preventDefault();

    const authorID = this.props.author.id;
    if (!authorID) {
      console.error("No Author ID !");
      return;
    }

    console.log("id: " + authorID);

    let newBook = [];

    const book_title = this.state.title;
    const filteredBook = bookStore.books.filter(
      book => book.title === book_title
    );

    if (filteredBook.length === 0) {
      // new book
      newBook = { ...this.state, authors: [authorID] };
    } else {
      // existed book, get authors
      const book_id = filteredBook[0].id;
      const authors = authorStore.authors
        .filter(author => author.books.includes(book_id))
        .map(author => author.id);
      newBook = { ...this.state, authors: [...authors, authorID] };
    }

    await bookStore.addBook(newBook);
    if (!bookStore.errors) {
      console.log("Book added with no errors!");
      this.props.onCloseModal();
    }
  };

  render() {
    return (
      <form onSubmit={this.submitBook}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Book Title</span>
          </div>
          <input
            type="text"
            className="form-control"
            name="title"
            onChange={this.textChangeHandler}
          />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Book Color</span>
          </div>
          <select name="color" onChange={this.textChangeHandler}>
            {bookStore.getColors.map(color => (
              <option key={color}>{color}</option>
            ))}
          </select>
        </div>
        <input type="submit" />
      </form>
    );
  }
}
