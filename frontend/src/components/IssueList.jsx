import React, { useEffect, useState } from "react";
import axios from "axios";
import { terminal } from "virtual:terminal";


const IssueList = ({ list }) => {


  const handleDeleteIssue = async (e) => {
    e.preventDefault();
    try {
      await axios
        .delete(`http://localhost:3000/${e.target.value}`)
    } catch (error) {
      terminal.error(error);
    }
  };


  const handleCloseIssue = async (e) => {
    try {
      await axios
        .put("http://localhost:3000", { _id: e.target.value, open: false })
    } catch (error) {
      terminal.error(error);
    }
  };

  return (
    <div>
      {list.map((item, key) => (
        <div key={item._id} className={item.open ? "open-issue" : "closed-issue"}>
          <p>id: {item._id}</p>
          <h3>
            {item.issue_title} - {item.open == true ? "(Open)" : "(Closed)"}
          </h3>
          <p>{item.issue_text}</p>
          <p>Created by: {item.created_by}</p>
          <p>Assigned to: {item.assigned_to}</p>
          <p>Created on: {item.created_on}</p>
          <p>Updated on: {item.updated_on}</p>
          <div className="button-container">
            <button>Edit</button>
            <button value={item._id} onClick={(e) => handleCloseIssue(e)}>
              Close
            </button>
            <button value={item._id} onClick={(e) => handleDeleteIssue(e)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IssueList;