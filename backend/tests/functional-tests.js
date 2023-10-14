// const chaiHttp = require("chai-http");
// const chai = require("chai");
// const assert = chai.assert;
// const server = require("../server");
// const Issue = require("../models");

// chai.use(chaiHttp);

// suite("Functional Tests", function () {
//   let id;
//   //#1
//   test("Create an issue with every field", (done) => {
//     chai
//       .request(server)
//       .post("/api/issues/test-project")
//       .send({
//         issue_title: "Issue1",
//         issue_text: "test-text",
//         created_by: "Alex",
//         assigned_to: "Mike",
//         status_text: "Needs work",
//       })
//       .end((err, res) => {
//         id = res.body._id;
//         console.log(id, "id");
//         assert.equal(res.status, 200);
//         assert.equal(res.body.issue_title, "Issue1");
//         assert.equal(res.body.issue_text, "test-text");
//         assert.equal(res.body.created_by, "Alex");
//         assert.equal(res.body.assigned_to, "Mike");
//         assert.equal(res.body.status_text, "Needs work");
//         console.log(res.status, "res.body");
//         done();
//       });
//   });

//   //#2
//   test("Create an issue with only required fields", (done) => {
//     chai
//       .request(server)
//       .post("/api/issues/test-project")
//       .send({
//         issue_title: "Issue2",
//         issue_text: "test-text",
//         created_by: "Alex",
//       })
//       .end((err, res) => {
//         assert.equal(res.status, 200);
//         assert.equal(res.body.issue_title, "Issue2");
//         assert.equal(res.body.issue_text, "test-text");
//         assert.equal(res.body.created_by, "Alex");
//         done();
//       });
//   });

//   //#3
//   test("Create an issue with missing required fields", (done) => {
//     chai
//       .request(server)
//       .post("/api/issues/test-project")
//       .send({
//         issue_title: "Issue3",
//         issue_text: "test-text",
//       })
//       .end((err, res) => {
//         assert.equal(res.body.error, "required field(s) missing");
//         done();
//       });
//   });

//   //#4
//   test("View issues on a project", (done) => {
//     chai
//       .request(server)
//       .get("/api/issues/test-project")
//       .end((err, res) => {
//         assert.equal(res.status, 200);
//         assert.isArray(res.body);
//         assert.property(res.body[0], "_id");
//         assert.property(res.body[0], "issue_title");
//         assert.property(res.body[0], "issue_text");
//         assert.property(res.body[0], "created_on");
//         assert.property(res.body[0], "updated_on");
//         assert.property(res.body[0], "created_by");
//         assert.property(res.body[0], "assigned_to");
//         assert.property(res.body[0], "open");
//         assert.property(res.body[0], "status_text");
//         assert.property(res.body[0], "project");
//         console.log(res.body);
//         done();
//       });
//   });

//   //#5
//   test("View issues on a project with one filter", (done) => {
//     chai
//       .request(server)
//       .get("/api/issues/test-project")
//       .query({ created_by: "test" })
//       .end((err, res) => {
//         console.log(res.body);
//         assert.equal(res.status, 200);
//         res.body.forEach((element) => {
//           assert.equal(element.created_by, "Alex");
//         });
//         done();
//       });
//   });

//   //#6
//   test("View issues on a project with multiple filters", (done) => {
//     chai
//       .request(server)
//       .get("/api/issues/test-project")
//       .query({
//         created_by: "Alex",
//         assigned_to: "Mike",
//         issue_text: "test-text",
//       })
//       .end((err, res) => {
//         console.log(res.body, "res");
//         assert.equal(res.status, 200);
//         res.body.forEach((element) => {
//           assert.equal(element.created_by, "Alex");
//           assert.equal(element.assigned_to, "Mike");
//           assert.equal(element.issue_text, "test-text");
//         });
//         done();
//       });
//   });

//   //#7
//   test("Update one field on an issue", (done) => {
//     chai
//       .request(server)
//       .put("/api/issues/test-project")
//       .send({
//         _id: id,
//         issue_title: "new issue text",
//       })
//       .end((err, res) => {
//         assert.equal(res.body.result, "successfully updated");
//         done();
//       });
//   });

//   //#8
//   test("Update multiple fields on an issue", (done) => {
//     chai
//       .request(server)
//       .put("/api/issues/test-project")
//       .send({
//         _id: id,
//         issue_title: "Issue",
//         issue_text: "updated issue",
//       })
//       .end((err, res) => {
//         assert.equal(res.body.result, "successfully updated");
//         done();
//       });
//   });

//   //#9
//   test("Update an issue with missing _id", (done) => {
//     chai
//       .request(server)
//       .put("/api/issues/test-project")
//       .send({
//         issue_text: "updated issue",
//       })
//       .end((err, res) => {
//         console.log(res, "res");
//         assert.equal(res.body.error, "missing _id");
//         done();
//       });
//   });

//   //#10
//   test("Update an issue with no fields", (done) => {
//     chai
//       .request(server)
//       .put("/api/issues/test-project")
//       .send({
//         _id: id,
//       })
//       .end((err, res) => {
//         assert.equal(res.body.error, "no update field(s) sent");
//         done();
//       });
//   });

//   //#11
//   test("Update an issue with an invalid _id", (done) => {
//     chai
//       .request(server)
//       .put("/api/issues/test-project")
//       .send({
//         _id: "jfj4853k494",
//         issue_title: "new issue text",
//       })
//       .end((err, res) => {
//         console.log(res, "res");
//         assert.equal(res.body.error, "could not update");
//         done();
//       });
//   });

//   //12
//   test("Delete an issue", (done) => {
//     chai
//       .request(server)
//       .delete("/api/issues/test-project")
//       .send({
//         _id: id,
//       })
//       .end((err, res) => {
//         assert.equal(res.body.result, "successfully deleted");
//         done();
//       });
//   });

//   //13
//   test("Delete an issue with and invalid _id", (done) => {
//     chai
//       .request(server)
//       .delete("/api/issues/test-project")
//       .send({
//         _id: "jfj4853k494",
//       })
//       .end((err, res) => {
//         console.log(res, "res");
//         assert.equal(res.body.error, "could not delete");
//         done();
//       });
//   });

//   //14
//   test("Delete an issue with a missing _id", (done) => {
//     chai
//       .request(server)
//       .delete("/api/issues/test-project")
//       .send({})
//       .end((err, res) => {
//         console.log(res, "res");
//         assert.equal(res.body.error, "missing _id");
//         done();
//       });
//   });
// });
