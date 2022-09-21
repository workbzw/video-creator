const express = require("express");
const {createVideo} = require("./VideoGenerator");
const {textToVoice} = require("./VoiceGenerator");
const {random} = require("./Utils");
const cors = require('cors')
const Busboy = require('busboy');
const fs = require("fs");

const app = express();
app.use(express.urlencoded({extended: true})); // 现在就方便多了，express的两个方法一执行就行啦
app.use(express.json());
app.use(cors());

// {
//     code:200,
//     msg:{
//         imgUrl:""
//     },
//     state:200
// }

// 处理上传文件服务
app.post('/api/v1/upload', (req, res) => {
    let randomName = random()
    let fileNameResult = ""
    const busboy = Busboy({headers: req.headers});
    busboy.on('file', (fieldName, file, fileInfo, encoding, mimetype) => {
        let fName = fileInfo.filename;
        fileNameResult = randomName + fName;
        console.log(fileNameResult)
        // file.pipe(fs.createWriteStream(`/www/wwwroot/video_create/${fileNameResult}`));
        file.pipe(fs.createWriteStream(`/Users/bzw/workspace/web/video-creator/video-creator-backend/upload/${fileNameResult}`));
    });

    busboy.on('finish', function () {
        console.log(fileNameResult)
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        let result = {code: 200, msg: "success", data: {fileName: fileNameResult}};
        res.end(JSON.stringify(result));
    });
    return req.pipe(busboy);
});

app.post("/api/v1/video/create", (req, res) => {
    console.log(req.body)
    const appKey = req.body.data.ttsConfig.appKey.toString().trim();
    const id = req.body.data.ttsConfig.accessKeyId.toString().trim();
    const secret = req.body.data.ttsConfig.accessKeySecret.toString().trim();
    const imgUrlList = req.body.data.video.imgUrlList.toString().trim();
    const str = req.body.data.video.dubbing.toString().trim();
    console.log('appKey：' + appKey + '，id：' + id + '，secret：' + secret)
    textToVoice(str, appKey, id, secret, (mp3File) => {
        createVideo(mp3File, imgUrlList, (fileName) => {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            let result = {code: 200, msg: "success", data: {fileName: fileName}};
            res.end(JSON.stringify(result))
            console.log("createVideo.callback:" + fileName)
        })
    })
});

app.get("/api/v1/file/:fileName", (req, res) => {
    const fName = req.params.fileName
    // res.download("/www/wwwroot/video_create/" + fileName);
    res.download("./upload/" + fName);
});

app.listen('3001', () => {
    console.log("访问地址为:http://%s:%s", 'localhost', '3001');
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