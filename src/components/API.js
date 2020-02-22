var axios = require("axios");

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "Origin"
};

const burl = "http://localhost:7000";

module.exports = {
  login: function(email, password) {
    return axios.post(burl + "/users", { email: email, password: password }, { headers: headers });
  },
  register: function(email, username, password) {
    return axios.post(
      burl + "/getHello",
      { email: email, password: password, username: username },
      { headers: headers }
    );
  }
};
