const createVideo = require("../video/video_creation")

const path = require("path");
const express = require("express");
const app = express();


app.get("/list", (req, res) => {
    createVideo((filePathCallback: string) => {
        console.log("createVideo.callback:" + filePathCallback)
        let filePath = path.join(__dirname, "../video/output/example.mp4");
        res.download(filePath);
    })
});
app.listen("3000", () => {
    console.log("=========服务启动了，在3000端口=========");
});