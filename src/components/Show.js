import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import db from "../db/Firebase";

function Show() {
  const [board, setBoard] = useState({});

  let id = window.location.pathname.slice(6);
  const data = [];
  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "boards"));
      querySnapshot.forEach((doc) => {
        data.push({ key: doc.id, ...doc.data() });
      });
      const filteredData = data.filter((board) => board.key === id);

      setBoard(...filteredData);
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleDelete = () => {
    deleteDoc(doc(db, "boards", id))
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  let navigate = useNavigate();
  return (
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>
            <button
              onClick={() => navigate(`/`)}
              type="button"
              className="btn btn-link"
            >
              Board List
            </button>
          </h4>
          <h3 className="panel-title">{board.title}</h3>
        </div>
        <div className="panel-body">
          <dl>
            <dt>Description:</dt>
            <dd>{board.description}</dd>
            <dt>Author:</dt>
            <dd>{board.author}</dd>
          </dl>
          <button
            onClick={() => navigate(`/edit/${board.key}`)}
            type="button"
            className="btn btn-success"
          >
            {" "}
            Edit
          </button>
          &nbsp;
          <button onClick={() => handleDelete()} className="btn btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Show;
