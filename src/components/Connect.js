import React, { useState } from "react";
import API from "./API";
import { resolve } from "dns";

export default function Connect() {
  const [panel, setPanel] = useState(0);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div style={{ width: 200, height: 500 }}>
        <div style={{ display: "flex", cursor: "pointer", height: 30, width: "100%", justifyContent: "space-between" }}>
          <div
            onClick={() => setPanel(0)}
            style={{ width: "100%", backgroundColor: panel === 0 ? "rgba(200,200,200,1)" : "rgba(100,100,100,1)" }}
          >
            Login
          </div>
          <div
            onClick={() => setPanel(1)}
            style={{ width: "100%", backgroundColor: panel === 1 ? "rgba(200,200,200,1)" : "rgba(100,100,100,1)" }}
          >
            Register
          </div>
        </div>
        {panel === 0 ? <Login /> : <Register />}
      </div>
    </div>
  );
}

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function sendLogin() {
    API.login(email, password).then(data => {
      console.log(data);
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label>email</label>
      <input onChange={e => setEmail(e.target.value)} value={email} />
      <label>password</label>
      <input onChange={e => setPassword(e.target.value)} value={password} />
      <div onClick={sendLogin}>Validate</div>
    </div>
  );
};

const Register = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [username, setUsername] = useState("");

  function sendRegister() {
    if (password !== cpassword) {
      alert("password and confirmation does not match");
    }
    API.register(email, username, password).then(data => {
      console.log(data);
    });
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label>name</label>
      <input onChange={e => setUsername(e.target.value)} value={username} />
      <label>email</label>
      <input onChange={e => setEmail(e.target.value)} value={email} />
      <label>password</label>
      <input onChange={e => setPassword(e.target.value)} value={password} />
      <label>cPassword</label>
      <input onChange={e => setCpassword(e.target.value)} value={cpassword} />
      <div onClick={sendRegister}>Validate</div>
    </div>
  );
};
