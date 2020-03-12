var axios = require("axios");

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "Origin"
};

const burl = "https://quatre-puissance-dix.herokuapp.com";
//const burl = "http://localhost:7000";

module.exports = {
  createGame: function(player1, player2, dimensions) {
    return axios.post(
      burl + "/games/new",
      {
        id: this.createToken(),
        player1: player1,
        player2: player2,
        vectors1: [],
        vectors2: [],
        dimensions: dimensions,
        player1ToPlay: true,
        finish: false,
        winner1: undefined
      },
      { headers: headers }
    );
  },
  login: function(email, password) {
    return axios.post(
      burl + "/users/login",
      {
        email: email,
        password: password
      },
      { headers: headers }
    );
  },
  reLogin: function(email) {
    return axios.post(
      burl + "/users/reLogin",
      {
        email: email
      },
      { headers: headers }
    );
  },
  getGames: function(tabOfGames) {
    return axios.post(
      burl + "/games/getUserGames",
      {
        games: tabOfGames
      },
      { headers: headers }
    );
  },
  updateGame: function(game) {
    return axios.post(
      burl + "/games/updateGame",
      {
        game
      },
      { headers: headers }
    );
  },
  register: function(email, password, name) {
    return axios.post(
      burl + "/users/register",
      {
        id: this.createToken(),
        name: name,
        email: email,
        password: password,
        games: []
      },
      { headers: headers }
    );
  },
  setUserGame: function(userMail, gameID) {
    return axios.post(
      burl + "/users/setNewGame",
      {
        email: userMail,
        id: gameID
      },
      { headers: headers }
    );
  },
  createToken: function() {
    var rand = function() {
      return Math.random()
        .toString(36)
        .substr(2); // remove `0.`
    };
    var token = function() {
      return rand() + rand(); // to make it longer
    };
    return token();
  },
  searchUsers: function(name) {
    return axios.post(
      burl + "/users/searchUsers",
      {
        name
      },
      { headers: headers }
    );
  },
  getUserByMail: function(email) {
    return axios.post(
      burl + "/users/getUserByMail",
      {
        email
      },
      { headers: headers }
    );
  }
};
