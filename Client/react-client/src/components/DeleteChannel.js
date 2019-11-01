import React from "react";
import "../App.css";
import axios from "axios";

class DeleteChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: false,
      status: false,
      url: this.props.url,
      channelId: "UCPe7UZ81sD3zkj6jxDyCC2w",
    };
  }

  click = async (arg) => {
    axios
      .delete(this.state.url + "/" + this.state.channelId)
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

  onChangeChannelId = (e) => {
    this.setState({ channelId: e.target.value });
  };

  render() {
    return (
      <div>
        <div className="input-group mb-3 mt-3">
          <input
            type="text"
            readOnly
            value={this.state.url}
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

        <div className="form-group mb-3 mt-3">
          {/* Channel ID */}
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Channel ID</label>
            <div className="col-sm-10">
              <input
                type="text"
                onChange={this.onChangeChannelId}
                value={this.state.channelId}
                className="form-control"
                placeholder="Channel ID"
              ></input>
            </div>
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
