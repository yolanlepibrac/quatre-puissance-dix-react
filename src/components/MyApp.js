import React, { Component } from "react";
import Counter from "./Counter";

export default class MyApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    console.log("mount");
  };

  click = e => {
    console.log("clack");
    if (e === 2) {
      console.log("2");
    } else {
      console.log("else");
    }
  };

  doubleCick = () => {
    if ("e" === "b") {
      console.log("d");
      console.log("im the world");
    }
  };

  newClick = () => {
    console.log("a");
    console.log("b");
    console.log("c");
    console.log("d");
  };

  render() {
    return (
      <div id="appContainer">
        <div className="MyButton" onClick={this.click}>
          My App
        </div>
        <Counter />
      </div>
    );
  }
}
