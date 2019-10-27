import React from "react";
import "./App.css";
import GetChannel from "./components/GetChannel";
import PostChannel from "./components/PostChannel";
import PatchChannel from "./components/PatchChannel";
import DeleteChannel from "./components/DeleteChannel";

function App() {
  return (
    <>
      <h1>Virtual YouTuber API</h1>
      <div className="container">
        <hr></hr>
        <ul className="list-group list-group-horizontal">
          <li className="list-group-item active">GET</li>
          <li className="list-group-item">/api/channels</li>
        </ul>

        <GetChannel></GetChannel>

        <ul className="list-group list-group-horizontal">
          <li className="list-group-item active">POST</li>
          <li className="list-group-item">/api/channels/:channelId</li>
        </ul>

        <PostChannel></PostChannel>

        <ul className="list-group list-group-horizontal">
          <li className="list-group-item active">PATCH</li>
          <li className="list-group-item">/api/channels/:channelId</li>
        </ul>

        <PatchChannel></PatchChannel>

        <ul className="list-group list-group-horizontal">
          <li className="list-group-item active">DELETE</li>
          <li className="list-group-item">/api/channels/:channelId</li>
        </ul>

        <DeleteChannel></DeleteChannel>
      </div>
    </>
  );
}

export default App;
