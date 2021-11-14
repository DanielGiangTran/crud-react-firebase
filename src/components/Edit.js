import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import db from "../db/Firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

function Edit() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  let navigate = useNavigate();
  let id = window.location.pathname.slice(6);

  const data = [];
  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "boards"));
      querySnapshot.forEach((doc) => {
        data.push({ key: doc.id, ...doc.data() });
      });
      const [filteredData] = data.filter((book) => book.key === id);

      setTitle(filteredData.title);
      setDescription(filteredData.description);
      setAuthor(filteredData.author);
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleEdit = () => {
    const bookRef = doc(db, "boards", id);
    if (title === "" || description === "" || author === "") {
      alert("All fields are required");
    } else {
      updateDoc(bookRef, {
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
          <h3 className="panel-title">EDIT BOOK</h3>
        </div>
        <div className="panel-body">
          <h4>
            <button
              onClick={() => {
                navigate(`/show/${id}`);
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
                type="text"
                className="form-control"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                className="form-control"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author:</label>
              <input
                type="text"
                className="form-control"
                name="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author"
                required
              />
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleEdit();
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

export default Edit;
