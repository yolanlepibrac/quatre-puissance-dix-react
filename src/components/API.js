var axios = require("axios");

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "Origin"
};

const burl = "https://test-mongoose-qpd.herokuapp.com";

module.exports = {
  login: function(email, password) {
    console.log(email);
    return axios.post(
      burl + "/user/login",
      { email: email, password: password },
      { headers: headers }
    );
    /* var xhttp = new XMLHttpRequest();
    try {
      xhttp.onreadystatechange = function() {
        console.log(xhttp);
        if (xhttp.readyState == 4 && xhttp.status == 0) {
          alert("Unknown Error Occured. Server response not received.");
        }
      };
      xhttp.open("POST", "http://localhost:7000/users", true);
      xhttp.send();
    } catch (e) {
      console.log("catch", e);
    }
    return new Promise((resolve, res) => {
      resolve();
    }); */
  },
  register: function(email, username, password) {
    return axios.post(
      burl + "/getHello",
      { email: email, password: password, username: username },
      { headers: headers }
    );
  }
};
