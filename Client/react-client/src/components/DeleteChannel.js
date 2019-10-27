import React from "react";
import "../App.css";
import axios from "axios";

class DeleteChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: false,
      status: false,
    };
  }

  click = async (arg) => {
    axios
      .delete("http://localhost:3000/api/channels/UCPe7UZ81sD3zkj6jxDyCC2w")
      .then((res) => {
        this.setState({
          status: true,
        });
        console.log(res.data);
      })
      .catch((err) => {
        this.setState({
          err: true,
        });
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <div className="input-group mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="DELETE query"
            aria-label="deleteChannels"
            aria-describedby="deleteChannels"
          ></input>
          <div className="input-group-append">
            <button
              className="btn btn-outline-primary"
              type="button"
              id="deleteChannels"
              onClick={this.click}
            >
              Button
            </button>
          </div>
        </div>

        <p>{this.state.err ? "ERROR!! This channel already exists..." : ""}</p>

        <p>{this.state.status ? "Successfully deleted." : ""}</p>
        <hr></hr>
      </div>
    );
  }
}

export default DeleteChannel;
