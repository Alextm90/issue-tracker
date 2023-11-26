import { useLocation, useNavigate } from "react-router-dom";
import { terminal } from "virtual:terminal";
import React, { useState } from "react";
import Form from "../components/form";
import axios from "axios";
import handleInputChange from "../utils/handleInputChange";

const Update = () => {
  const navigate = useNavigate();
  const location = useLocation();
  terminal.log(location.state);

  const [issue, setIssue] = useState({
    _id: location.state._id,
    issue_title: location.state.issue_title,
    issue_text: location.state.issue_text,
    created_by: location.state.created_by,
    assigned_to: location.state.assigned_to,
    status_text: location.state.status_text,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put("http://localhost:3000", issue);
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
