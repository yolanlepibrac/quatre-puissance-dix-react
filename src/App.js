import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Myapp from "./components/MyApp";
import { BrowserRouter as Router, HashRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <HashRouter basename="/">
          <Myapp />
        </HashRouter>
      </Router>
    </div>
  );
}

export default App;
