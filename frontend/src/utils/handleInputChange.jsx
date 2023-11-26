import React from 'react'
import { terminal } from "virtual:terminal";

 const handleInputChange = (e, setIssue, issue) => {
    terminal.log(issue)
    const { name, value } = e.target;
    setIssue({ ...issue, [name]: value });
  };

  export default handleInputChange