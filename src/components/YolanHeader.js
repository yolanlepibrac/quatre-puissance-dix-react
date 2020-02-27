import React, { Component } from "react";

export default class YolanHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: "",
      dislike: ""
    };
  }

  render() {
    return (
      <div
        style={{
          zIndex: 1000,
          height: this.props.height,
          width: "100%",
          backgroundColor: this.props.backgroundColor,
          boxShadow: "0px 3px 2px 0 rgba(0, 0, 0, 0.5)",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "calc(10px + 2vmin)",
          color: "white"
        }}
      >
        <a
          href="/"
          style={{
            fontFamily: "codelight",
            marginLeft: 50,
            width: 10,
            textAlign: "left",
            fontSize: 20
          }}
        >
          {this.state.pageName}
        </a>
        <div
          style={{
            fontSize: this.props.fontSize,
            textDecoration: "none",
            color: "white",
            width: "100%"
          }}
        >
          {this.props.children}
        </div>
        <div className="menu" style={{ marginRight: 50, width: 10 }}></div>
      </div>
    );
  }
}
