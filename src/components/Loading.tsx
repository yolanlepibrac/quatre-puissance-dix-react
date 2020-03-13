import React, { FunctionComponent, useState, useEffect } from "react";
import "./Loading.css";

interface Props {
  onClick: any;
}

const Loading: FunctionComponent<Props> = props => {
  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgba(255,255,255,0.7)",
            height: "100vh",
            width: "100%",
            position: "absolute",
            zIndex: 1000,
            top: 0,
            left: 0
          }}
        ></div>
        <div className="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {props.children}
      </div>
    </div>
  );
};
export default Loading;
