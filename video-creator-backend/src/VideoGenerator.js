const {FFScene, FFText, FFVideo, FFAlbum, FFImage, FFCreator} = require("ffcreator");
const path = require('path');
const colors = require('colors');
const canvasWidth = 360;
const canvasHeight = 640;
const totalTime = 16;

exports.createVideo = (audioPath, imgArray, callback) => {
    const videoName = "video_" + Date.parse(new Date().toString()).toString() + Math.floor(Math.random() * 99999999) + ".mp4";
    console.log(videoName)
    const creator = new FFCreator({
        cacheDir: "cache", outputDir: "output", width: canvasWidth, height: canvasHeight
    });

    const scene = new FFScene();
    scene.setBgColor("#ffcc22");
    scene.setDuration(16);
    scene.setTransition("GridFlip", 2);
    creator.addChild(scene);
    const everyOneTime = totalTime / imgArray.length;
    for (let i = 0; i < imgArray.length; i++) {
        let img = imgArray[i];
        console.log("/www/wwwroot/video_create/" + img)
        const image = new FFImage({
            path: "/www/wwwroot/video_create/" + img, x: 180, y: 320, width: canvasWidth, height: canvasWidth
        });
        image.addEffect("rotateIn", i === 0 ? 0 : 1, i * everyOneTime);
        image.addEffect("fadeOut", 1, (i + 1) * everyOneTime);
        scene.addChild(image);
    }
    // scene.addAudio({path: path.join(__dirname, "../" + audioPath)})
    scene.addAudio({path: "/www/wwwroot/video_create/" + audioPath})
    const text = new FFText({
        text: "你好", x: 0, y: 0
    });
    text.setColor("#ffffff");
    text.setBackgroundColor("#000000");
    text.addEffect("fadeIn", 1, 1);
    scene.addChild(text);
    // creator.output(path.join(__dirname, "output/" + videoName));
    creator.output("/www/wwwroot/video_create/" + videoName);
    creator.start().then(() => {
        console.log("开始")
    });        // 开始加工
    creator.closeLog();     // 关闭log(包含perf)

    creator.on('start', () => {
        console.log(`FFCreator start`);
    });
    creator.on('error', (e) => {
        console.log(`FFCreator error: ${JSON.stringify(e)}`);
    });
    creator.on('progress', (e) => {
        console.log(colors.yellow(`FFCreator progress: ${e.state} ${(e.percent * 100) >> 0}%`));
    });
    creator.on('complete', (e) => {
        callback(videoName)
        console.log(colors.magenta(`FFCreator completed: \n USEAGE: ${e.useage} \n PATH: ${e.output} `));
    });
}
