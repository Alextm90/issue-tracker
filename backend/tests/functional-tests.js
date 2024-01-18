const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const axios = require("axios");
require("../server");

chai.use(chaiHttp);

suite("Functional Tests", async function () {
  suiteTeardown(() => {
    console.log("done")
  })

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
    id = res.data._id;
    assert.equal(res.status, 200);
    assert.equal(res.data.issue_title, "Issue1");
    assert.equal(res.data.issue_text, "test-text");
    assert.equal(res.data.created_by, "test-user");
  });

  // #4
  test("should retrun 400 error with missing required fields", async () => {
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

  // #7
  test("should update multiple fields on an issue and return 'successfully updated'", async () => {
    const res = await axios.put(
      "http://localhost:3000/",
      {
        _id: id,
        issue_title: "Issue",
        issue_text: "updated issue",
        assigned_to: "Mike",
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

  // #8
  test("update issue with missing id should return 400 error", async () => {
    const res = await axios
      .put(
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
        assert.equal(error.response.data.error, "missing _id");
        assert.equal(error.response.status, 400);
      });
  });

  // #9
  test("update issue with empty fields should return 400 error", async () => {
    const res = await axios
      .put(
        "http://localhost:3000/",
        {
          _id: id,
          issue_title: "",
          issue_text: "",
          created_by: "",
          assigned_to: "",
          status_text: "",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res, "res");
      })
      .catch((error) => {
        assert.equal(error.response.data.error, "no update field(s) sent");
        assert.equal(error.response.status, 400);
      });
  });

  // #10
  test("update issue with invalid id should return 400 error", async () => {
    const res = await axios
      .put(
        "http://localhost:3000/",
        {
          _id: "jfj4853k494",
          issue_title: "new title",
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
        assert.equal(error.response.data.error, "could not update");
        assert.equal(error.response.status, 400);
      });
  });

  // #11
  test("delete an issue should return 'successfully deleted'", async () => {
    const res = await axios.delete(`http://localhost:3000/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(res, "res");
    assert.equal(res.data.result, "successfully deleted");
    assert.equal(res.status, 200);
  });

  // #12
  test("delete issue with invalid id should return 400 error", async () => {
    const res = await axios
      .delete(`http://localhost:3000/${"jfj4853k494"}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error, "error");
        assert.equal(error.response.data.error, "could not delete");
        assert.equal(error.response.status, 400);
      });
  });

  // #13
  test("delete issue with no id should return 400 error", async () => {
    const res = await axios
      .delete("http://localhost:3000/{}", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        assert.equal(error.response.data.error, "missing _id");
        assert.equal(error.response.status, 400);
      });
  });

  // #14
  test("logout route should return success message", async () => {
    const res = await axios.post("http://localhost:3000/logout", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    assert.equal(res.status, 200);
    assert.equal(res.data.message, "You have successfully logged out!");
  });

    after(function () {
      console.log("done");
    });

});
