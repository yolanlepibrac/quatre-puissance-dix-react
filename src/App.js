import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Myapp from "./components/MyApp";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Myapp />
      </Router>
    </div>
  );
}

export default App;
