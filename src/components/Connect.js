import React, { useState, useEffect } from "react";
import API from "./API";
import Loading from "./Loading";
import InputLogin from "./InputLogin";
import Login from "./Login";
import Register from "./Register";

export default function Connect(props) {
  const [panel, setPanel] = useState(true);
  const [displayLoading, setDisplayLoading] = useState(false);

  useEffect(() => {
    var email = localStorage.getItem("email");
    console.log(email);
    if (email !== undefined && email !== "undefined") {
      setDisplayLoading(true);
      API.reLogin(email)
        .then(dataUser => {
          API.getGames(dataUser.data.user.games)
            .then(dataGames => {
              props.navigateHome({ user: dataUser.data.user, games: dataGames.data.games });
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          alert("Impossible to connect, try again");
        })
        .then(() => {
          setDisplayLoading(false);
        });
    }
  }, []);

  function togglePanel() {
    setPanel(!panel);
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center"
      }}
    >
      {displayLoading && <Loading></Loading>}

      <div
        style={{
          width: 350,
          position: "absolute",
          top: 150,
          left: "calc(50vw - 150px)"
        }}
      >
        {panel === true ? (
          <Login
            navigateHome={data => props.navigateHome(data)}
            setDisplayLoading={setDisplayLoading}
            togglePanel={togglePanel}
          />
        ) : (
          <Register
            navigateHome={data => props.navigateHome(data)}
            setDisplayLoading={setDisplayLoading}
            togglePanel={togglePanel}
          />
        )}
      </div>
    </div>
  );
}
