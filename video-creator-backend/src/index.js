const express = require("express");
const {createVideo} = require("./VideoGenerator");
const {textToVoice} = require("./VoiceGenerator");
const app = express();

app.get("/video/create", (req, res) => {
    const imgUrl = req.query.url
    let str = "上述视频发布后引发众多网友热议，目前已有近8万点赞，评论数接近5万条。有网友科普道，“基本上所有益生菌都是从人体提取出来的，大部分是粪便。不过不要膈应，因为培养后和粪便完全没丁点关系了。”也有网友表示，“虽然知道没什么，但是感觉过不去心里那道坎。”还有网友则调侃称：“能不能找点瘦子的益生菌。”\n" + "\n" + "极目新闻记者注意到，此前已有网友在网络平台晒出了这款酸奶，产品包装上的醒目位置标注了“中国发明专利菌株”“巴马益生菌”“鼠李糖乳杆菌hsryfm1301”等字样。一位网友在晒出这款酸奶时配文写道：“这个巴马益生菌感觉之前在论文里看到过，是从巴马长寿老人……”"
    textToVoice(str, (mp3File) => {
        createVideo(imgUrl, (fileName) => {
            res.send(fileName)
            console.log("createVideo.callback:" + fileName)
        })
    })
});

app.get("/video/get", (req, res) => {
    const fileName = req.query.fileName;
    res.download("/www/wwwroot/video/" + fileName);
});

app.listen("3001", () => {
    console.log("=========服务启动成功，端口:3001=========");
});
// let filePath = path.join(__dirname, "output/" + filePathCallback + ".mp4");
// console.log('开始上传...');
// uploadFile(filePath, "video_" + filePathCallback + ".mp4").then(() => {
//     console.log("上传成功!");
//     res.send("上传成功:" + filePath)
// }).catch(err => {
//     console.log("上传错误:" + err);
//     res.send("上传失败")
// })