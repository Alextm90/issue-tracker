import React, { useEffect, useState } from "react";
import axios from "axios";
import { terminal } from "virtual:terminal";


const IssueList = () => {

    const [issueList, setIssueList] = useState([])

      useEffect(() => {
        const getIssues = async () => {
          try {
            const response = await axios.get("http://localhost:3000/api/issues/:project");
            setIssueList(response.data);
            terminal.log(issueList)
          } catch (err) {
            console.log(err);
          }
        };
        getIssues();
      }, []);

       terminal.log(issueList);

  return (
    <div>
      <div>{issueList}</div>
    </div>
  );
}

export default IssueList