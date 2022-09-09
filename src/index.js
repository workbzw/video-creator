const path = require("path");
const express = require("express");
const {createVideo} = require("./VideoGenerator");
const {uploadingFile, uploadFile, downloadFile} = require("./FTPUtils");
const fs = require("fs");
const app = express();

app.get("/video/create", (req, res) => {
    const imgUrl = req.query.url
    createVideo((fileName) => {
        res.send(fileName)
        console.log("createVideo.callback:" + fileName)
        // let filePath = path.join(__dirname, "output/" + filePathCallback + ".mp4");
        // console.log('开始上传...');
        // uploadFile(filePath, "video_" + filePathCallback + ".mp4").then(() => {
        //     console.log("上传成功!");
        //     res.send("上传成功:" + filePath)
        // }).catch(err => {
        //     console.log("上传错误:" + err);
        //     res.send("上传失败")
        // })
    }, imgUrl)
});
app.get("/video/get", (req, res) => {
    const fileName = req.query.fileName;
    res.download("/www/wwwroot/video/" + fileName);
});

app.listen("3000", () => {
    console.log("=========服务启动了，在3000端口=========");
});