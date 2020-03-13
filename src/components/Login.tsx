import React, { FunctionComponent, useState, useEffect } from "react";
import API from "./API";
import InputLogin from "./InputLogin";
import "./Login.css";

interface Props {
  setDisplayLoading: any;
  navigateHome: any;
  togglePanel: any;
}

const Login: FunctionComponent<Props> = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function sendLogin() {
    props.setDisplayLoading(true);
    API.login(email.toLowerCase(), password)
      .then((dataUser: any) => {
        API.getGames(dataUser.data.user.games)
          .then((dataGames: any) => {
            localStorage.setItem("email", email);
            props.navigateHome({ user: dataUser.data.user, games: dataGames.data.games });
          })
          .catch((error: any) => {
            console.log(error);
          });
      })
      .catch((error: any) => {
        console.log(error);
        alert("Impossible to connect");
      })
      .then(() => {
        props.setDisplayLoading(false);
      });
  }

  function handleKeyPress(event: MouseEvent) {
    if (event.which === 13) {
      sendLogin();
    }
  }

  return (
    <div id="container">
      <div id="topBar">You already have an account ?</div>
      <div id="content">
        <InputLogin
          id={1}
          label="e-mail"
          locked={false}
          active={false}
          value={email}
          onChange={(e: string) => setEmail(e)}
        ></InputLogin>
        <InputLogin
          id={1}
          label="password"
          locked={false}
          active={false}
          value={password}
          onChange={(e: string) => setPassword(e)}
          visibilityActive={true}
        ></InputLogin>
        <div id="validate" onKeyPress={(e: any) => handleKeyPress(e)} tabIndex={0} onClick={() => sendLogin()}>
          Connexion
        </div>
        <div id="changeTab" onClick={() => props.togglePanel()}>
          Register
        </div>
      </div>
    </div>
  );
};

export default Login;
