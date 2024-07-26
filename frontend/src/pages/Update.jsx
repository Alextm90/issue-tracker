import { useLocation, useNavigate } from "react-router-dom";
import { terminal } from "virtual:terminal";
import React, { useState } from "react";
import Form from "../components/Form.jsx";
import axios from "axios";
import handleInputChange from "../utils/handleInputChange";

const Update = () => {
  const navigate = useNavigate();
  const location = useLocation();
 
  const { issue_title, issue_text, created_by, assigned_to, status_text } = location.state

  const [issue, setIssue] = useState({
    _id: location.state._id,
    issue_title: issue_title,
    issue_text:  issue_text,
    created_by:  created_by,
    assigned_to: assigned_to,
    status_text: status_text,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put("https://issue-tracker-nwp9.onrender.com", issue);
      alert("Issue successfully updated!");
      navigate("/");
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
  };

  return (
    <div>
      <p>Update Issue: {location.state._id}</p>
      <Form
        issue={issue}
        handleInputChange={(e) => handleInputChange(e, setIssue, issue)}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Update;
