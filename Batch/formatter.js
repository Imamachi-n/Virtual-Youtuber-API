const { readJSONFile, writeJSONFile } = require("./index");
const path = require("path");

async function generateMergedJSONFile(fileBaseName) {
  const allData = [];

  let basicData = await readJSONFile(
    path.join(__dirname, "/data/basic_" + fileBaseName)
  );
  let statData = await readJSONFile(
    path.join(__dirname, "/data/stat_" + fileBaseName)
  );
  basicData = JSON.parse(basicData).channels;
  statData = JSON.parse(statData).channels;

  for (let i = 0; i < basicData.length; i++) {
    allData.push(sanitizeData(basicData[i], statData[i]));
  }
  return allData;
}

function sanitizeData(basicData, statData) {
  return {
    channelTitle: basicData.title,
    channelId: basicData.channelId,
    channelUrl: basicData.channelUrl,
    publishedAt: basicData.publishedAt,
    thumbnails: basicData.thumbnails,
    viewCount: statData.viewCount,
    subscriberCount: statData.subscriberCount,
    videoCount: statData.videoCount,
  };
}

async function generateAlldata(...files) {
  const allData = [];
  const keyDict = {};

  for (const file of files) {
    let data = await readJSONFile(path.join(__dirname, "/data/" + file));
    data = JSON.parse(data).channels;
    for (const channel of data) {
      if (channel.channelId in keyDict) continue;
      keyDict[channel.channelId] = true;
      allData.push(channel);
    }
  }

  console.log(Object.keys(keyDict).length);
  return allData;
}

// const fileBase = "channel_HoloLive_1.json";
// const fileBase = "channel_Nijisanji-Syozoku_1.json";
// const fileBase = "channel_VTuber_1.json";
// const fileBase = "channel_VTuber_2.json";
// const fileBase = "channel_VTuber_VC_1.json";
// const fileBase = "video_JavaScript_1.json";
// const fileBase = "video_JavaScript_2.json";
// const fileBase = "video_nodejs_1.json";
// const fileBase = "video_nodejs_2.json";
// generateMergedJSONFile(fileBase).then(data => writeJSONFile(path.join(__dirname, "/data/all_" + fileBase), {
//   channels: data
// }));

// const file = "VTuber_alldata.json";
// generateAlldata(
//   "all_channel_HoloLive_1.json",
//   "all_channel_Nijisanji-Syozoku_1.json",
//   "all_channel_VTuber_1.json",
//   "all_channel_VTuber_2.json",
//   "all_channel_VTuber_VC_1.json"
// ).then(data => {
//   writeJSONFile(path.join(__dirname, "/data/" + file), {
//     channels: data
//   });
// });
const file = "JS_NodeJS_alldata.json";
generateAlldata(
  "all_video_JavaScript_1.json",
  "all_video_JavaScript_2.json",
  "all_video_nodejs_1.json",
  "all_video_nodejs_2.json"
).then((data) => {
  writeJSONFile(path.join(__dirname, "/data/" + file), {
    channels: data,
  });
});
