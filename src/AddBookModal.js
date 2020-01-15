import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Modal from "react-responsive-modal";
import BookForm from "./BookForm";

class AddBookModal extends Component {
  state = {
    open: false
  };

  onOpenModal = () => this.setState({ open: true });

  onCloseModal = () => this.setState({ open: false });

  render() {
    const { open } = this.state;

    const authorID = this.props.match.params.authorID;
    console.log("addbookmodal: " + authorID);

    if (!authorID) {
      return <> </>;
    } else {
      return (
        <div>
          <Modal open={open} onClose={this.onCloseModal} center>
            <BookForm
              author={this.props.author}
              onCloseModal={this.onCloseModal}
            />
          </Modal>
          <input
            type="button"
            onClick={this.onOpenModal}
            value="Add New Book!"
          />
        </div>
      );
    }
  }
}
export default withRouter(AddBookModal);
