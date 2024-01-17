const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");
const axios = require("axios");

chai.use(chaiHttp);

suite("Functional Tests", async function () {
  const username = "testUser";
  const password = "testPassword";
  let accessToken;
  let id;
  // #1
  test("should receive You are now registered message.", async () => {
    const response = await axios.post("http://localhost:3000/signup", {
      username,
      password,
    });
    const { message, accesstoken } = response.data;
    accessToken = accesstoken;
    assert.equal(response.status, 200);
    assert.equal(message, "You are now registered.");
  });

  // #2
  test("should create an issue with every field", async () => {
    const res = await axios.post(
      "http://localhost:3000/",
      {
        issue_title: "Issue1",
        issue_text: "test-text",
        created_by: "test-user",
        assigned_to: "assigned",
        status_text: "status-text",
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    assert.equal(res.status, 200);
    assert.equal(res.data.issue_title, "Issue1");
    assert.equal(res.data.issue_text, "test-text");
    assert.equal(res.data.created_by, "test-user");
    assert.equal(res.data.assigned_to, "assigned");
    assert.equal(res.data.status_text, "status-text");
  });

  // #3
  test("should create an issue with only required fields", async () => {
    const res = await axios.post(
      "http://localhost:3000/",
      {
        issue_title: "Issue1",
        issue_text: "test-text",
        created_by: "test-user",
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    id = res.data._id
    assert.equal(res.status, 200);
    assert.equal(res.data.issue_title, "Issue1");
    assert.equal(res.data.issue_text, "test-text");
    assert.equal(res.data.created_by, "test-user");
  });

  // #4
  test("should receive 400 error with missing required fields", async () => {
    const res = await axios
      .post(
        "http://localhost:3000/",
        {
          issue_title: "Issue1",
          issue_text: "test-text",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        assert.equal(error.response.status, 400);
      });
  });

  // #5
  test("should return an array of project(s) w/ specific properties", async () => {
    const res = await axios.get("http://localhost:3000/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    assert.equal(res.status, 200);
    assert.isArray(res.data);
    assert.property(res.data[0], "_id");
    assert.property(res.data[0], "issue_title");
    assert.property(res.data[0], "issue_text");
    assert.property(res.data[0], "created_on");
    assert.property(res.data[0], "updated_on");
    assert.property(res.data[0], "created_by");
    assert.property(res.data[0], "assigned_to");
    assert.property(res.data[0], "open");
    assert.property(res.data[0], "status_text");
  });

  // #6
  test("should update one field on an issue and return successfully updated", async () => {
    const res = await axios.put(
      "http://localhost:3000/",
      {
        _id: id,
        issue_title: "new issue text",
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    assert.equal(res.status, 200);
    assert.equal(res.data.result, "successfully updated");
  });

  // //#8
  // test("Update multiple fields on an issue", (done) => {
  //   chai
  //     .request(server)
  //     .put("/api/issues/test-project")
  //     .send({
  //       _id: id,
  //       issue_title: "Issue",
  //       issue_text: "updated issue",
  //     })
  //     .end((err, res) => {
  //       assert.equal(res.body.result, "successfully updated");
  //       done();
  //     });
  // });

  // //#9
  // test("Update an issue with missing _id", (done) => {
  //   chai
  //     .request(server)
  //     .put("/api/issues/test-project")
  //     .send({
  //       issue_text: "updated issue",
  //     })
  //     .end((err, res) => {
  //       console.log(res, "res");
  //       assert.equal(res.body.error, "missing _id");
  //       done();
  //     });
  // });

  // //#10
  // test("Update an issue with no fields", (done) => {
  //   chai
  //     .request(server)
  //     .put("/api/issues/test-project")
  //     .send({
  //       _id: id,
  //     })
  //     .end((err, res) => {
  //       assert.equal(res.body.error, "no update field(s) sent");
  //       done();
  //     });
  // });

  // //#11
  // test("Update an issue with an invalid _id", (done) => {
  //   chai
  //     .request(server)
  //     .put("/api/issues/test-project")
  //     .send({
  //       _id: "jfj4853k494",
  //       issue_title: "new issue text",
  //     })
  //     .end((err, res) => {
  //       console.log(res, "res");
  //       assert.equal(res.body.error, "could not update");
  //       done();
  //     });
  // });

  // //12
  // test("Delete an issue", (done) => {
  //   chai
  //     .request(server)
  //     .delete("/api/issues/test-project")
  //     .send({
  //       _id: id,
  //     })
  //     .end((err, res) => {
  //       assert.equal(res.body.result, "successfully deleted");
  //       done();
  //     });
  // });

  // //13
  // test("Delete an issue with and invalid _id", (done) => {
  //   chai
  //     .request(server)
  //     .delete("/api/issues/test-project")
  //     .send({
  //       _id: "jfj4853k494",
  //     })
  //     .end((err, res) => {
  //       console.log(res, "res");
  //       assert.equal(res.body.error, "could not delete");
  //       done();
  //     });
  // });

  // //14
  // test("Delete an issue with a missing _id", (done) => {
  //   chai
  //     .request(server)
  //     .delete("/api/issues/test-project")
  //     .send({})
  //     .end((err, res) => {
  //       console.log(res, "res");
  //       assert.equal(res.body.error, "missing _id");
  //       done();
  //     });
  // });
});
