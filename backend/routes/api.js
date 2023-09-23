"use strict";
const Issue = require("../models");
const mongoose = require("mongoose");
const express = require("express");
const ObjectId = require("mongoose").Types.ObjectId;
const db = require("../dbconnect.js");

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    //get request
    .get(async function (req, res) {
      let projectName = req.params.project;
      const {
        issue_title,
        issue_text,
        created_by,
        created_on,
        open,
        updated_on,
        assigned_to,
        status_text,
        project,
        _id,
      } = req.query;
      //create filter
      let issuesToFind = { project: projectName };
      for (const key in req.query) {
        issuesToFind[key] = req.query[key];
      }
      //find by project
      try {
        const projects = await Issue.find(issuesToFind);
        res.json(projects);
      } catch (err) {
        console.log(err);
      }
    })

    //post request
    .post(function (req, res) {
      console.log(res.body, "res");
      const { issue_title, issue_text, created_by, assigned_to, status_text } =
        req.body;
      console.log(req.body);
      //check for requirements
      if (
        issue_text == undefined ||
        issue_title == undefined ||
        created_by == undefined
      ) {
        res.json({ error: "required field(s) missing" });
        return;
      }
      //create instance of issue
      const newIssue = new Issue({
        issue_title: issue_title,
        issue_text: issue_text,
        created_on: new Date(),
        open: true,
        updated_on: new Date(),
        created_by: created_by,
        assigned_to: assigned_to || "",
        status_text: status_text || "",
        project: req.params.project,
      });
      newIssue
        .save()
        .then((item) => {
          res.json({
            issue_text,
            issue_title,
            created_on: item.created_on,
            updated_on: item.updated_on,
            open: item.open,
            created_by,
            assigned_to,
            status_text: item.status_text,
            _id: item._id,
          });
        })
        .catch((err) => {
          console.log(err);
          res.json({ message: "unable to save to database" });
        });
    })

    //put request
    .put(async function (req, res) {
      let project = req.params.project;
      const id = req.body._id;
      console.log(Object.keys(req.body));
      console.log(req.body._id, "req.body.id");

      //check for missing id
      if (!id) {
        res.json({ error: "missing _id" });
        return;
      }

      const keyArray = Object.keys(req.body);
      if (keyArray.length == 1) {
        res.json({ error: "no update field(s) sent", _id: req.body._id });
        return;
      }

      if (ObjectId.isValid(id)) {
        try {
          const foundIssue = await Issue.findById(id);
          if (foundIssue) {
            console.log(foundIssue, "issue3"); //just added
            let issueId = foundIssue._id.toString(); //just added
            //update values
            for (const key in req.body) {
              foundIssue[key] = req.body[key];
            }
            foundIssue.updated_on = new Date();
            const savedObj = await foundIssue.save();

            if (savedObj) {
              console.log("saved");
              res.json({
                result: "successfully updated",
                _id: id,
              });
            }
          } else {
            console.log("here");
            res.json({ error: "could not update", _id: id });
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log("here2");
        res.json({ error: "could not update", _id: id });
      }
    })

    //delete request
    .delete(async function (req, res) {
      let project = req.params.project;
      const id = req.body._id;

      //check for missing id
      if (!id) {
        res.json({ error: "missing _id" });
        return;
      }
      //check for valid id
      if (ObjectId.isValid(id)) {
        try {
          const foundIssue = await Issue.findById(id);
          if (foundIssue) {
            const deletedIssue = await Issue.deleteOne({ _id: id });
            console.log(deletedIssue);
            res.json({ result: "successfully deleted", _id: id });
          } else {
            res.json({ error: "could not delete", _id: id });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
};

