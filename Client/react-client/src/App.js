import React from "react";
import "./App.css";
import GetChannel from "./components/GetChnnel";

function App() {
  return (
    <div className="container">
      <h1>Virtual YouTuber API</h1>

      <hr></hr>
      <ul className="list-group list-group-horizontal">
        <li className="list-group-item active">GET</li>
        <li className="list-group-item">/api/channels</li>
      </ul>

      <GetChannel></GetChannel>
    </div>
  );
}

export default App;
