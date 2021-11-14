import React, { useEffect, useState } from "react";
import "./App.css";
import db from "./db/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function App() {
  const [books, setBooks] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    const data = [];
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "boards"));
      querySnapshot.forEach((doc) => {
        data.push({ key: doc.id, ...doc.data() });
      });
      setBooks(data);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">BOOK LIST</h3>
          </div>
          <div className="panel-body">
            <h4>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/create")}
                type="button"
              >
                Add Book
              </button>
            </h4>
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.key}>
                    <td>
                      <button
                        onClick={() => navigate(`/show/${book.key}`)}
                        type="button"
                        className="btn btn-link"
                      >
                        {book.title}
                      </button>
                    </td>
                    <td>{book.description}</td>
                    <td>{book.author}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
