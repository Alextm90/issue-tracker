import React, { useEffect, useState } from "react";
import axios from "axios";
import { terminal } from "virtual:terminal";

const IssueList = ({ list }) => {
  return (
    <>
      {list.map((item) => (
        <div key={item._id} className="issue">
          <p>id: {item._id}</p>
          <h3>{item.issue_title} - {item.open ? "(Open)" : "(Closed)"}</h3>
          <p>{item.issue_text}</p>
          <p>Created by: {item.created_by}</p>
          <p>Assigned to: {item.assigned_to}</p>
          <p>Created on: {item.created_on}</p>
          <p>Updated on: {item.updated_on}</p>
        </div>
      ))}
    </>
  );
};

export default IssueList;
