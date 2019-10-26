const axios = require("axios");
const fs = require("fs");
const path = require("path");

const GOOGLE_API_KEY = fs.readFileSync("./credential-keys.txt", "utf-8"); // Google API key is saved in credential file

const readJSONFile = name =>
  new Promise((resolve, reject) => {
    fs.readFile(name, "utf8", (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });

const writeJSONFile = (name, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(name, JSON.stringify(data), "utf8", err => {
      if (err) reject(err);
      resolve("Done");
    });
  });

module.exports = {
  readJSONFile,
  writeJSONFile
};

class YoutubeChannel {
  constructor(title, channelId, desc, publishedAt, thumbnails) {
    this.title = title;
    this.channelId = channelId;
    this.channelUrl = "https://youtube.com/channel/" + channelId;
    this.desc = desc;
    this.publishedAt = publishedAt;
    this.thumbnails = thumbnails;
  }
}

class YoutubeChannelStatistics {
  constructor(
    title,
    channelId,
    channelUrl,
    viewCount,
    subscriberCount,
    videoCount
  ) {
    this.title = title;
    this.channelId = channelId;
    this.channelUrl = channelUrl;
    this.viewCount = viewCount;
    this.subscriberCount = subscriberCount;
    this.videoCount = videoCount;
  }
}

class YoutubeDataAPISearchWrapper {
  constructor() {
    this.channels = [];
    this.channelBasic = [];
    this.channelStats = [];
  }

  async getVtuberRelatedVideos(query, limit = 10) {
    try {
      const uriDict = {};
      let nextPageToken = "";
      for (let i = 0; i < limit; i++) {
        if (i > 0) query = query.replace(/pageToken.+/, "");
        let uri =
          "https://www.googleapis.com/youtube/v3/" +
          query +
          "&key=" +
          GOOGLE_API_KEY;
        if (i > 0) uri += "&pageToken=" + nextPageToken;
        if (nextPageToken === undefined) break;

        const response = await axios.get(uri);
        const data = response.data;

        nextPageToken = data.nextPageToken;
        console.log(nextPageToken);

        for (const video of data.items) {
          // console.log(video);
          const title = video.snippet.channelTitle;
          const channelId = video.snippet.channelId;
          const desc = video.snippet.description;
          const publishedAt = video.snippet.publishedAt || "";
          const thumbnails = video.snippet.thumbnails.high.url || "";

          if (channelId in uriDict) continue;
          uriDict[channelId] = true;
          this.channels.push(
            new YoutubeChannel(title, channelId, desc, publishedAt, thumbnails)
          );
        }
      }
      return;
    } catch (err) {
      console.log(err);
    }
  }

  async getVtuberChannelStatistics(file, query = "channels?part=statistics") {
    try {
      const uriDict = {};
      let jsonData = await readJSONFile(file);
      jsonData = JSON.parse(jsonData).channels;

      for (const channel of jsonData) {
        let uri =
          "https://www.googleapis.com/youtube/v3/" +
          query +
          "&id=" +
          channel.channelId +
          "&key=" +
          GOOGLE_API_KEY;
        const response = await axios.get(uri);
        const data = response.data.items[0];
        const viewCount = data.statistics.viewCount;
        const subscriberCount = data.statistics.subscriberCount;
        const videoCount = data.statistics.videoCount;

        if (channel.channelId in uriDict) return;
        uriDict[channel.channelId] = true;

        this.channelStats.push(
          new YoutubeChannelStatistics(
            channel.title,
            channel.channelId,
            channel.channelUrl,
            viewCount,
            subscriberCount,
            videoCount
          )
        );
      }
      return;
    } catch (err) {
      console.log(err);
    }
  }

  async getVtuberChannelBasicData(
    file,
    query = "channels?part=snippet&fields=items(id,snippet(title,description,publishedAt,thumbnails(high)))"
  ) {
    const uriDict = {};
    let jsonData = await readJSONFile(file);
    jsonData = JSON.parse(jsonData).channels;

    for (const channel of jsonData) {
      let uri =
        "https://www.googleapis.com/youtube/v3/" +
        query +
        "&id=" +
        channel.channelId +
        "&key=" +
        GOOGLE_API_KEY;
      const response = await axios.get(uri);

      const data = response.data.items[0];
      const title = data.snippet.title;
      const channelId = data.id;
      const desc = data.snippet.description;
      const publishedAt = data.snippet.publishedAt || "";
      const thumbnails = data.snippet.thumbnails.high.url || "";

      if (channelId in uriDict) continue;
      uriDict[channelId] = true;

      this.channelBasic.push(
        new YoutubeChannel(title, channelId, desc, publishedAt, thumbnails)
      );
    }
    return;
  }
  catch(err) {
    console.log(err);
  }
}

// TODO: VTuber
// q=vtuber
// order=viewCount
// type=video
// relatedToVideoId=S3CAGeeMRvo
// pageToken=CBQQAA
// maxResults=10
const testWrapper = new YoutubeDataAPISearchWrapper();
// FIXME: testWrapper.getVtuberRelatedVideos("search?part=snippet&q=vtuber&order=viewCount&type=video&maxResults=50&regionCode=JP&fields=nextPageToken,items(snippet(publishedAt,channelId,title,channelTitle,description,thumbnails(high)))&relatedToVideoId=S3CAGeeMRvo") // 関連Video検索
// testWrapper.getVtuberRelatedVideos("search?part=snippet&q=vtuber&order=date&type=channel&maxResults=50&regionCode=JP") // VTuber
// testWrapper.getVtuberRelatedVideos("search?part=snippet&q=vtuber&order=date&type=channel&maxResults=50&regionCode=JP&pageToken=CPQDEAA") // VTuber
// testWrapper.getVtuberRelatedVideos("search?part=snippet&q=vtuber&order=viewCount&type=channel&maxResults=50&regionCode=JP") // VTuber

// testWrapper.getVtuberRelatedVideos("search?part=snippet&q=%E3%81%AB%E3%81%98%E3%81%95%E3%82%93%E3%81%98&order=viewCount&type=channel&maxResults=50&regionCode=JP") // にじさんじ
// testWrapper.getVtuberRelatedVideos("search?part=snippet&q=%E3%81%AB%E3%81%98%E3%81%95%E3%82%93%E3%81%98%E6%89%80%E5%B1%9E&order=viewCount&type=channel&maxResults=50&regionCode=JP") // にじさんじ所属
// testWrapper.getVtuberRelatedVideos("search?part=snippet&q=%E3%83%9B%E3%83%AD%E3%83%A9%E3%82%A4%E3%83%96&order=viewCount&type=channel&maxResults=50&regionCode=JP") // ホロライブ
// testWrapper.getVtuberRelatedVideos("search?part=snippet&q=upd8&order=viewCount&type=channel&maxResults=50&regionCode=JP") // upd8

//FIXME: testWrapper.getVtuberRelatedVideos("search?part=snippet&q=javascript&order=viewCount&type=video&maxResults=50&fields=nextPageToken,items(snippet(publishedAt,channelId,title,channelTitle,description,thumbnails(high)))&pageToken=CPQDEAA")
// .then(data => writeJSONFile("test_videoId-related_S3CAGeeMRvo_1.json", {
//   channels: testWrapper.channels
// }));
// testWrapper.getVtuberRelatedVideos("search?part=snippet&q=nodejs&order=viewCount&type=video&maxResults=50&fields=nextPageToken,items(snippet(publishedAt,channelId,title,channelTitle,description,thumbnails(high)))")
//   .then(data => writeJSONFile("test_video_nodejs_1.json", {
//     channels: testWrapper.channels
//   }));
// testWrapper.getVtuberRelatedVideos("search?part=snippet&q=nodejs&order=viewCount&type=video&maxResults=50&fields=nextPageToken,items(snippet(publishedAt,channelId,title,channelTitle,description,thumbnails(high)))&pageToken=CPQDEAA")
//   .then(data => writeJSONFile("./data/test_video_nodejs_2.json", {
//     channels: testWrapper.channels
//   }));

// チャンネルの統計データ取得
// channels?part=statistics&id=UCsg-YqdqQ-KFF0LNk23BY4A
// testWrapper.getVtuberChannelStatistics(path.join(__dirname, "/data/test_channel_VTuber_2.json"))
//   .then(data => writeJSONFile(path.join(__dirname, "/data/stat_channel_VTuber_2.json"), {
//     channels: testWrapper.channelStats
//   }));
// testWrapper.getVtuberChannelStatistics(path.join(__dirname, "/data/test_video_JavaScript_1.json"))
//   .then(data => writeJSONFile(path.join(__dirname, "/data/stat_video_JavaScript_1.json"), {
//     channels: testWrapper.channelStats
//   }));
// testWrapper.getVtuberChannelStatistics(path.join(__dirname, "/data/test_video_JavaScript_2.json"))
//   .then(data => writeJSONFile(path.join(__dirname, "/data/stat_video_JavaScript_2.json"), {
//     channels: testWrapper.channelStats
//   }));
// testWrapper.getVtuberChannelStatistics(path.join(__dirname, "/data/test_video_nodejs_1.json"))
//   .then(data => writeJSONFile(path.join(__dirname, "/data/stat_video_nodejs_1.json"), {
//     channels: testWrapper.channelStats
//   }));
// testWrapper.getVtuberChannelStatistics(path.join(__dirname, "/data/test_video_nodejs_2.json"))
//   .then(data => writeJSONFile(path.join(__dirname, "/data/stat_video_nodejs_2.json"), {
//     channels: testWrapper.channelStats
//   }));

// チャンネルの基本データ取得
// testWrapper.getVtuberChannelBasicData(path.join(__dirname, "/data/test_channel_HoloLive_1.json"))
//   .then(data => writeJSONFile(path.join(__dirname, "/data/basic_channel_HoloLive_1.json"), {
//     channels: testWrapper.channelBasic
//   }));
// testWrapper.getVtuberChannelBasicData(path.join(__dirname, "/data/test_channel_Nijisanji-Syozoku_1.json"))
//   .then(data => writeJSONFile(path.join(__dirname, "/data/basic_channel_Nijisanji-Syozoku_1.json"), {
//     channels: testWrapper.channelBasic
//   }));
// testWrapper.getVtuberChannelBasicData(path.join(__dirname, "/data/test_channel_VTuber_VC_1.json"))
//   .then(data => writeJSONFile(path.join(__dirname, "/data/basic_channel_VTuber_VC_1.json"), {
//     channels: testWrapper.channelBasic
//   }));
// testWrapper.getVtuberChannelBasicData(path.join(__dirname, "/data/test_channel_VTuber_1.json"))
//   .then(data => writeJSONFile(path.join(__dirname, "/data/basic_channel_VTuber_1.json"), {
//     channels: testWrapper.channelBasic
//   }));
// testWrapper.getVtuberChannelBasicData(path.join(__dirname, "/data/test_channel_VTuber_2.json"))
//   .then(data => writeJSONFile(path.join(__dirname, "/data/basic_channel_VTuber_2.json"), {
//     channels: testWrapper.channelBasic
//   }));
// testWrapper.getVtuberChannelBasicData(path.join(__dirname, "/data/test_video_JavaScript_2.json"))
//   .then(data => writeJSONFile(path.join(__dirname, "/data/basic_video_JavaScript_2.json"), {
//     channels: testWrapper.channelBasic
//   }));
// testWrapper.getVtuberChannelBasicData(path.join(__dirname, "/data/test_video_nodejs_1.json"))
//   .then(data => writeJSONFile(path.join(__dirname, "/data/basic_video_nodejs_1.json"), {
//     channels: testWrapper.channelBasic
//   }));
// testWrapper.getVtuberChannelBasicData(path.join(__dirname, "/data/test_video_nodejs_2.json"))
//   .then(data => writeJSONFile(path.join(__dirname, "/data/basic_video_nodejs_2.json"), {
//     channels: testWrapper.channelBasic
//   }));
