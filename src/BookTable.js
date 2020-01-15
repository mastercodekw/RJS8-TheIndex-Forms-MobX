import React from "react";

import BookRow from "./BookRow";
import AddBookModal from "./AddBookModal";
import { observer } from "mobx-react";

const BookTable = props => {
  // const authorID = props.match.params.authorID;
  // console.log("a: " + authorID);

  const bookRows = props.books.map(book => (
    <BookRow key={book.id} book={book} />
  ));

  return (
    <>
      <table className="mt-3 table">
        <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Authors</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>{bookRows}</tbody>
      </table>
      <AddBookModal author={props.author} />
    </>
  );
};

export default observer(BookTable);
