
 const handleInputChange = (e, setIssue, issue) => {
    const { name, value } = e.target;
    setIssue({ ...issue, [name]: value });
  };

  export default handleInputChange