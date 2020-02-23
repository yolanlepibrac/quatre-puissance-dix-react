var axios = require("axios");

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "Origin"
};

const burl = "https://quatre-puissance-dix.herokuapp.com";

module.exports = {
  login: function(email, password) {
    //return axios.get(burl + "/users", { email: email, password: password }, { headers: headers });
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://quatre-puissance-dix.herokuapp.com/users");
    xhr.send(null);
  },
  register: function(email, username, password) {
    return axios.post(
      burl + "/getHello",
      { email: email, password: password, username: username },
      { headers: headers }
    );
  }
};
