import React, { useEffect, useState } from "react";
import axios from "axios";
import { terminal } from "virtual:terminal";
import { useParams } from "react-router-dom";

const IssueList = ({ list }) => {
  const { id } = useParams();

  const handleDeleteIssue = async (e) => {
     e.preventDefault();
    try {
      await axios
        .delete(`http://localhost:3000/${e.target.value}`)
        .then((res) => {
          terminal.log(e, "id");
        });
    } catch (error) {
      terminal.error(error);
    }
  };

  return (
    <>
      {list.map((item) => (
        <div key={item._id} className="issue">
          <p>id: {item._id}</p>
          <h3>
            {item.issue_title} - {item.open ? "(Open)" : "(Closed)"}
          </h3>
          <p>{item.issue_text}</p>
          <p>Created by: {item.created_by}</p>
          <p>Assigned to: {item.assigned_to}</p>
          <p>Created on: {item.created_on}</p>
          <p>Updated on: {item.updated_on}</p>
          <div className="button-container">
            <button>Edit</button>
            <button>Close</button>
            <button value={item._id} onClick={(e) => handleDeleteIssue(e)}>Delete</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default IssueList;
