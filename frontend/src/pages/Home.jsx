//import React from 'react'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { terminal } from "virtual:terminal";
import IssueList from "../components/IssueList";
import Form from "../components/form";
import handleInputChange from "../utils/handleInputChange";

const Home = () => {
  const [issue, setIssue] = useState({
    issue_title: "",
    issue_text: "",
    created_by: "",
    assigned_to: "",
    status_text: "",
  });

  const [list, setList] = useState([]);

  useEffect(() => {
    getIssues();
  }, []);

  const getIssues = async () => {
    try {
      const response = await axios.get("http://localhost:3000");
      setList(response.data);
    } catch (err) {
      terminal.log(err);
    }
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
        await axios.post("http://localhost:3000", issue);
        getIssues();
      } catch (error) {
        terminal.error(error);
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
    <div>
      <div id="submitNewIssue">
        <br />
        <h3>Submit a new issue:</h3>
        <Form
          issue={issue}
          handleInputChange={(e) => handleInputChange(e, setIssue, issue)}
          handleSubmit={handleSubmit}
        />
      </div>
      <div>
        <IssueList list={list} setList={setList} />
      </div>
    </div>
  );
};

export default Home;
