import React from "react";
import "../App.css";
import axios from "axios";

class GetChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
    };
  }

  click = async (arg) => {
    const res = await axios.get("http://localhost:3000/api/channels");
    this.setState({
      channels: [],
    });
    this.setState({
      channels: this.state.channels.concat(res.data),
    });
    console.log(res.data);
  };

  render() {
    return (
      <div>
        <div className="input-group mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="GET query"
            aria-label="getChannels"
            aria-describedby="getChannels"
          ></input>
          <div className="input-group-append">
            <button
              className="btn btn-outline-primary"
              type="button"
              id="getChannels"
              onClick={this.click}
            >
              Button
            </button>
          </div>
        </div>
        <hr></hr>

        {this.state.channels.map((channel, index) => (
          <table className="table" key={index}>
            <tbody id="getChannelsResult">
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
                    href="https://youtube.com/channel/UCdn5BQ06XqgXoAxIhbqw5Rg"
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

export default GetChannel;
