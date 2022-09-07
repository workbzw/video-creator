const path = require("path");
const express = require("express");
const app = express();

app.get("/list", (req, res) => {
    // let list = [
    //     {name: "张三", age: 13},
    //     {name: "李四", age: 33},
    //     {name: "王五", age: 22}
    // ];
    // res.json(list);
    let filePath = path.join(__dirname, "../video/output/example.mp4");
    res.download(filePath);
});
app.listen("3000",()=>{
    console.log("=========服务启动了，在3000端口=========");
});