"use strict"
require('log-timestamp')(`${process.pid}`)
const fs = require("fs")
const Nls = require("alibabacloud-nls")
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs))
const util = require("util")
const readline = require("readline")
const {requestToken} = require("./TakeToken");
const {random} = require("./Utils");
const args = process.argv.slice(2)
//const Memwatch = require("node-memwatch-new")

const URL = "wss://nls-gateway.cn-shanghai.aliyuncs.com/ws/v1"
const APPKEY = "92V7T8uUg4KyHMjq"      //获取Appkey请前往控制台：https://nls-portal.console.aliyun.com/applist
const TOKEN = "Your Token"      //获取Token具体操作，请参见：https://help.aliyun.com/document_detail/450514.html

let b1 = []
let loadIndex = 0
//let hd = new Memwatch.HeapDiff()
let needDump = true

async function runOnce(token, line, callback) {
    console.log(`speak: ${line}`)
    loadIndex++
    const fileName = "voice_" + random() + ".mp3"
    let dumpFile = fs.createWriteStream(fileName, {flags: "w"})
    let tts = new Nls.SpeechSynthesizer({
        url: URL, appkey: APPKEY, token: token
    })
    tts.on("meta", (msg) => {
        console.log("Client recv metainfo:", msg)
    })
    tts.on("data", (msg) => {
        console.log(`recv size: ${msg.length}`)
        console.log(dumpFile.write(msg, "binary"))
    })
    tts.on("completed", (msg) => {
        console.log("Client recv completed:", msg)
        callback(fileName)
    })
    tts.on("closed", () => {
        console.log("Client recv closed")
    })
    tts.on("failed", (msg) => {
        console.log("Client recv failed:", msg)
    })
    let param = tts.defaultStartParams()
    param.text = line
    param.voice = "Rosa"
    try {
        await tts.start(param, true, 6000)
    } catch (error) {
        console.log("error on start:", error)
        return
    } finally {
        dumpFile.end()
    }
    console.log("synthesis done")
    await sleep(2000)
}

exports.textToVoice = (str,callback) => {
    requestToken((token) => {
        runOnce(token, str, (fileName) => {
            console.log("fileName:" + fileName)
            callback(fileName)
        }).then(r => {
            console.log("finish!!!")
        })
    })
}
