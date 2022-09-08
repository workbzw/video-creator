const path = require("path");
const express = require("express");
const {createVideo} = require("./VideoGenerator");
const app = express();

app.get("/video", (req, res) => {
    const imgUrl = req.query.url
    createVideo((filePathCallback) => {
        console.log("createVideo.callback:" + filePathCallback)
        let filePath = path.join(__dirname, "output/" + filePathCallback + ".mp4");
        res.download(filePath);
    },imgUrl)
});
app.listen("3000", () => {
    console.log("=========服务启动了，在3000端口=========");
});