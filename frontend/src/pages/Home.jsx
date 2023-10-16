//import React from 'react'
import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  return (
    <div id="submitNewIssue">
      <br />
      <h3>Submit a new issue:</h3>
      <form id="newIssue" method="post" action="/api/">
        <input
          type="text"
          name="issue_title"
          placeholder="*Title"
          style={{ width: "320px", marginBottom: "3px" }}
          required={true}
        />
        <br />
        <textarea
          type="text"
          name="issue_text"
          placeholder="*Text"
          style={{ width: "320px", height: "100px", marginBottom: "-5px" }}
          required="true"
        ></textarea>
        <br></br>
        <input
          type="text"
          name="created_by"
          placeholder="*Created by"
          style={{ width: "100px", marginRight: "2px" }}
          required={true}
        ></input>
        <input
          type="text"
          name="assigned_to"
          placeholder="(opt)Assigned to"
          style={{ width: "100px", marginRight: "2px" }}
        ></input>
        <input
          type="text"
          name="status_text"
          placeholder="(opt)Status text"
          style={{ width: "100px" }}
        ></input>
        <br />
        <button type="submit">Submit Issue</button>
      </form>
      <div id="issueDisplay"></div>
    </div>
  );
}

export default Home