import React, { FunctionComponent, useState, useEffect } from "react";
import API from "./API";
import InputLogin from "./InputLogin";
import "./Login.css";

interface Props {
  setDisplayLoading: any;
  navigateHome: any;
  togglePanel: any;
}

const Register: FunctionComponent<Props> = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [username, setUsername] = useState("");

  function sendRegister() {
    if (password !== cpassword) {
      alert("password and confirmation does not match");
      return;
    }
    props.setDisplayLoading(true);
    API.register(email.toLowerCase(), password, username.toLowerCase()).then((dataUser: any) => {
      localStorage.setItem("email", email);
      props.setDisplayLoading(false);
      props.navigateHome({ user: dataUser.data, games: [] });
    });
  }

  function handleKeyPress(event: MouseEvent) {
    if (event.which === 13) {
      sendRegister();
    }
  }

  return (
    <div id="container">
      <div id="topBar">Create you account</div>
      <div id="content">
        <InputLogin
          id={1}
          label="name"
          locked={false}
          active={false}
          value={username}
          onChange={(e: string) => setUsername(e)}
        ></InputLogin>
        <InputLogin
          id={2}
          label="e-mail"
          locked={false}
          active={false}
          value={email}
          onChange={(e: string) => setEmail(e)}
        ></InputLogin>
        <InputLogin
          id={3}
          label="password"
          locked={false}
          active={false}
          value={password}
          onChange={(e: string) => setPassword(e)}
          visibilityActive={true}
        ></InputLogin>
        <InputLogin
          id={4}
          label="confirm password"
          locked={false}
          active={false}
          value={cpassword}
          onChange={(e: string) => setCpassword(e)}
          visibilityActive={true}
        ></InputLogin>

        <div id="validate" onKeyPress={(e: any) => handleKeyPress(e)} tabIndex={0} onClick={() => sendRegister()}>
          Register
        </div>
        <div id="changeTab" onClick={() => props.togglePanel()}>
          Connexion
        </div>
      </div>
    </div>
  );
};

export default Register;
