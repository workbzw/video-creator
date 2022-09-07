const {FFScene, FFText, FFVideo, FFAlbum, FFImage, FFCreator} = require("ffcreator");
const path = require('path');
const colors = require('colors');
const canvasWidth = 360;
const canvasHeight = 640;
const totalTime = 16;
const imgArray = [
    {path: path.join(__dirname, "imgs/img.png"), eff: "zoomingIn", x: 180, y: 320, w: canvasWidth, h: 200},
    {path: path.join(__dirname, "imgs/img_1.png"), eff: "zoomingIn", x: 180, y: 320, w: canvasWidth, h: 200},
    {path: path.join(__dirname, "imgs/img_2.png"), eff: "zoomingIn", x: 180, y: 320, w: canvasWidth, h: 200},
    {path: path.join(__dirname, "imgs/img_3.png"), eff: "zoomingIn", x: 180, y: 320, w: canvasWidth, h: 200}]

const creator = new FFCreator({
    cacheDir: "cache",
    outputDir: "output",
    width: canvasWidth,
    height: canvasHeight
});

const scene = new FFScene();
scene.setBgColor("#ffcc22");
scene.setDuration(16);
scene.setTransition("GridFlip", 2);
creator.addChild(scene);

const everyOneTime = totalTime / imgArray.length;
for (let i = 0; i < imgArray.length; i++) {
    let img = imgArray[i];
    const image = new FFImage({
        path: img.path,
        x: img.x,
        y: img.y,
        width: img.w,
        height: img.h
    });
    image.addEffect("rotateIn", i == 0 ? 0 : 1, i * everyOneTime);
    image.addEffect("fadeOut", 1, (i + 1) * everyOneTime);
    scene.addChild(image);
}

const text = new FFText({
    text: "你好",
    x: 0,
    y: 0
});
text.setColor("#ffffff");
text.setBackgroundColor("#000000");
text.addEffect("fadeIn", 1, 1);
scene.addChild(text);

creator.output(path.join(__dirname, "output/example.mp4"));
creator.start().then(r => {
    console.log("开始")
});        // 开始加工
creator.closeLog();     // 关闭log(包含perf)

creator.on('start', () => {
    console.log(`FFCreator start`);
});
creator.on('error', e => {
    console.log(`FFCreator error: ${JSON.stringify(e)}`);
});
creator.on('progress', e => {
    console.log(colors.yellow(`FFCreator progress: ${e.state} ${(e.percent * 100) >> 0}%`));
});
creator.on('complete', e => {
    console.log(colors.magenta(`FFCreator completed: \n USEAGE: ${e.useage} \n PATH: ${e.output} `));
});
