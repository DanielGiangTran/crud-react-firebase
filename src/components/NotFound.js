import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  let navigate = useNavigate();
  return (
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">BOARD LIST</h3>
        </div>
        <div className="panel-body">
          <h4>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/create")}
              type="button"
            >
              Book List
            </button>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
