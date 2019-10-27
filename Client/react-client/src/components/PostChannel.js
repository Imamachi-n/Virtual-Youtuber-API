import React from "react";
import "../App.css";
import axios from "axios";

class PostChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      err: false,
    };
  }

  click = async (arg) => {
    const newChannel = {
      channel_title_jp: "VTuber Naoto JP",
      channel_title_en: "VTuber Naoto EN",
      channel_id: "UCPe7UZ81sD3zkj6jxDyCC2w",
      thumbnail: "https://source.unsplash.com/collection/21/400x400",
    };
    console.log(newChannel);
    axios
      .post("http://localhost:3000/api/channels", newChannel)
      .then((res) => {
        this.setState({
          channels: [],
        });
        this.setState({
          channels: this.state.channels.concat(res.data),
          err: false,
        });
        console.log(res.data);
      })
      .catch((err) => {
        this.setState({
          channels: [],
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
            placeholder="POST query"
            aria-label="postChannels"
            aria-describedby="postChannels"
          ></input>
          <div className="input-group-append">
            <button
              className="btn btn-outline-primary"
              type="button"
              id="postChannels"
              onClick={this.click}
            >
              Button
            </button>
          </div>
        </div>

        <p>{this.state.err ? "ERROR!! This channel already exists..." : ""}</p>

        <hr></hr>

        {this.state.channels.map((channel, index) => (
          <table className="table" key={index}>
            <tbody>
              <tr>
                <td rowSpan="6">
                  <img src={channel.thumbnail} alt=""></img>
                </td>
                <td>Channel Title</td>
                <td>{channel.channel_title_jp}</td>
              </tr>
              <tr>
                <td>Channel Title (English)</td>
                <td>{channel.channel_title_en}</td>
              </tr>
              <tr>
                <td>Channel URL</td>
                <td>
                  <a
                    href={`${channel.channel_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    YouTube Channel
                  </a>
                  <i className="fas fa-external-link-alt"></i>
                </td>
              </tr>
              <tr>
                <td>Subscriber Count</td>
                <td>{channel.subscriber_count}</td>
              </tr>
              <tr>
                <td>View Count</td>
                <td>{channel.view_count}</td>
              </tr>
              <tr>
                <td>Video Count</td>
                <td>{channel.video_count}</td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    );
  }
}

export default PostChannel;
