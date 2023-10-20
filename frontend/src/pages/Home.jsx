//import React from 'react'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { terminal } from "virtual:terminal";

const Home = () => {
  //state for issue
  const [issue, setIssue] = useState({
    issue_title: "",
    issue_text: "",
    created_by: "",
    assigned_to: "",
    status_text: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setIssue({ ...issue, [name]: value });
    terminal.log(issue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      issue.issue_title == "" ||
      issue.issue_text == "" ||
      issue.created_by == ""
    ) {
      alert("required fields missing!");
    } else {
      try {
        await axios.post("http://localhost:3000/api/issues/:project", issue);
      } catch (error) {
        console.error(error);
      }
      setIssue({
        issue_title: "",
        issue_text: "",
        created_by: "",
        assigned_to: "",
        status_text: "",
      });
    }
  };

  return (
    <div id="submitNewIssue">
      <br />
      <h3>Submit a new issue:</h3>
      <form id="newIssue" method="post" action="/api/">
        <input
          type="text"
          name="issue_title"
          placeholder="*Title"
          value={issue.issue_title}
          style={{ width: "320px", marginBottom: "3px" }}
          required={true}
          onChange={handleInputChange}
        />
        <br />
        <textarea
          type="text"
          name="issue_text"
          value={issue.issue_text}
          placeholder="*Text"
          style={{ width: "320px", height: "100px", marginBottom: "-5px" }}
          required={true}
          onChange={handleInputChange}
        ></textarea>
        <br></br>
        <input
          type="text"
          name="created_by"
          placeholder="*Created by"
          value={issue.created_by}
          style={{ width: "100px", marginRight: "2px" }}
          required={true}
          onChange={handleInputChange}
        ></input>
        <input
          type="text"
          name="assigned_to"
          value={issue.assigned_to}
          placeholder="(opt)Assigned to"
          style={{ width: "100px", marginRight: "2px" }}
          onChange={handleInputChange}
        ></input>
        <input
          type="text"
          name="status_text"
          value={issue.status_text}
          placeholder="(opt)Status text"
          style={{ width: "100px" }}
          onChange={handleInputChange}
        ></input>
        <br />
        <button type="submit" onClick={handleSubmit}>
          Submit Issue
        </button>
      </form>
      <div id="issueDisplay"></div>
    </div>
  );
};

export default Home;
