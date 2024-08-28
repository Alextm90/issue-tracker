import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { terminal } from 'virtual:terminal';
import IssueList from '../components/IssueList';
import Form from '../components/Form.jsx';
import handleInputChange from '../utils/handleInputChange';
import useAxiosInstance from '../hooks/useAxiosInstance';

const Home = () => {
  const axiosInstance = useAxiosInstance();
  const [issue, setIssue] = useState({
    issue_title: '',
    issue_text: '',
    created_by: '',
    assigned_to: '',
  });

  const [list, setList] = useState([]);

  useEffect(() => {
    getIssues();
  }, []);

  const getIssues = async () => {
    try {
      const response = await axios.get(
        'https://my-backend-latest-0ftm.onrender.com',
      );
      setList(response.data);
    } catch (err) {
      terminal.log(err.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post('/', issue);
      const { success } = response.data;
      getIssues();
    } catch (error) {
      toast('Please enter required fields!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
    setIssue({
      issue_title: '',
      issue_text: '',
      created_by: '',
      assigned_to: '',
    });
  };

  return (
    <div>
      <div id="submitNewIssue">
        <br />
        <h3 id='issue-header'>Submit a new issue:</h3>
        <Form
          issue={issue}
          handleInputChange={(e) => handleInputChange(e, setIssue, issue)}
          handleSubmit={handleSubmit}
        />
      </div>
      <div>
        <IssueList list={list} setList={setList} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
