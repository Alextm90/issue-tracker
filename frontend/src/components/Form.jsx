import React from 'react'

const Form = ({ issue, handleInputChange, handleSubmit }) => {

  return (
    <div>
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
  );
}

export default Form