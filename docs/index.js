function createRecord(channel) {
  const container = document.createElement("");
}

// GET - /api/channels
const getChannelsButton = document.querySelector("#getChannels");
getChannelsButton.addEventListener("click", async () => {
  const res = await axios.get("http://localhost:3000/api/channels");
  console.log(res.data);

  const getChannelsResult = document.querySelector("#getChannelsResult");
  res.data.forEach((channel) => {
    getChannelsResult.appendChild();
  });
});
