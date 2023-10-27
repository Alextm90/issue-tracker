import React, { useEffect, useState } from "react";
import axios from "axios";
import { terminal } from "virtual:terminal";


const IssueList = ({ list }) => {
  //const mike = list[0]._id
  return (
    <div className="card">
      {list.map((item) => (
        <div key={item._id} >{item.created_by}</div>
      ))}
    </div>
  );
}

export default IssueList
