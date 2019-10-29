import React from "react";
import "../App.css";
import axios from "axios";

class PostChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [],
      err: false,
      url: props.url,
      channelTitleJp: "VTuber Naoto JP",
      channelTitleEn: "VTuber Naoto EN",
      channelId: "UCPe7UZ81sD3zkj6jxDyCC2w",
      thumbnail: "https://source.unsplash.com/collection/21/400x400",
    };
  }

  onChangeChannelTittleJp = (e) => {
    this.setState({ channelTitleJp: e.target.value });
  };

  onChangeChannelTittleEn = (e) => {
    this.setState({ channelTitleEn: e.target.value });
  };

  onChangeChannelId = (e) => {
    this.setState({ channelId: e.target.value });
  };

  onChangeThumbnail = (e) => {
    this.setState({ thumbnail: e.target.value });
  };

  click = async (arg) => {
    axios
      .post(this.state.url, {
        channel_title_jp: this.state.channelTitleJp,
        channel_title_en: this.state.channelTitleEn,
        channel_id: this.state.channelId,
        thumbnail: this.state.thumbnail,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          channels: [],
        });
        this.setState({
          channels: this.state.channels.concat(res.data),
          err: false,
        });
        // this.setState({
        //   channels: res.data,
        //   err: false,
        // });
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
            readOnly
            value={this.state.url}
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
              Post Your Channel
            </button>
          </div>
        </div>

        <div className="form-group mb-3 mt-3">
          {/* Channel Title JP */}
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Channel Title JP</label>
            <div className="col-sm-10">
              <input
                type="text"
                onChange={this.onChangeChannelTittleJp}
                value={this.state.channelTitleJp}
                className="form-control"
                placeholder="Channel Title JP"
              ></input>
            </div>
          </div>

          {/* Channel Title EN */}
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Channel Title EN</label>
            <div className="col-sm-10">
              <input
                type="text"
                onChange={this.onChangeChannelTittleEn}
                value={this.state.channelTitleEn}
                className="form-control"
                placeholder="Channel Title EN"
              ></input>
            </div>
          </div>

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

          {/* Thumbnail */}
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Thumbnail</label>
            <div className="col-sm-10">
              <input
                type="text"
                onChange={this.onChangeThumbnail}
                value={this.state.thumbnail}
                className="form-control"
                placeholder="Thumbnail"
              ></input>
            </div>
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
