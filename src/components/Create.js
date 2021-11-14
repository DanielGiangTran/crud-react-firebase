import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import db from "../db/Firebase";
import { collection, addDoc } from "firebase/firestore";

function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");

  let navigate = useNavigate();

  const addBook = () => {
    if (title === "" || description === "" || author === "") {
      alert("All fields are required");
    } else {
      addDoc(collection(db, "boards"), {
        title: title,
        description: description,
        author: author,
      })
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    }
  };

  return (
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">ADD BOOK</h3>
        </div>
        <div className="panel-body">
          <h4>
            <button
              onClick={() => {
                navigate("/");
              }}
              className="btn btn-primary"
            >
              Book List
            </button>
          </h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                id={title}
                type="text"
                className="form-control"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id={description}
                className="form-control"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                cols="80"
                rows="3"
                value={description}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="author">Author:</label>
              <input
                id={author}
                type="text"
                className="form-control"
                name="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author"
              />
            </div>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                addBook();
              }}
              className="btn btn-success"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
