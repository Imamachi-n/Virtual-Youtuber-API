import React from "react";
import "../App.css";
import axios from "axios";

class PostChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
    };
  }
}

export default PostChannel;
