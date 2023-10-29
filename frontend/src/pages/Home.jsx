//import React from 'react'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { terminal } from "virtual:terminal";
import IssueList from "../components/IssueList";

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
    const getIssues = async () => {
      try {
        const response = await axios.get("http://localhost:3000");
        setList(response.data);
      } catch (err) {
        terminal.log(err);
      }
    };
    getIssues();
  }, [issue]);

terminal.log(list)
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setIssue({ ...issue, [name]: value });
  };

  const handleSubmit = async (event) => {
    terminal.log(list, "list")
    event.preventDefault();
    if (
      issue.issue_title == "" ||
      issue.issue_text == "" ||
      issue.created_by == ""
    ) {
      alert("required fields missing!");
    } else {
      try {
        await axios.post("http://localhost:3000", issue).then((res) => {
          //terminal.log(res.data);
        });
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
      </div>
      <div>
        <IssueList list={list}/>
      </div>
    </div>
  );
};

export default Home;
