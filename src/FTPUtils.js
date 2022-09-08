const fs = require('fs');
const FTPClient = require('ftp');
const path = require("path");
const {cwd} = require("ftp");

const dirPath = '/Users/bzw/apk'; // 本地FTP目录
const remoteFtpPath = 'video_creation'; // 远程FTP目录
const localFiles = []; // 本地文件
let localFileLength = 0; // 上传文件个数
let uploadTime = 0; // 上传耗时
let ftp = null;

// 连接服务器
ftp = new FTPClient();
ftp.on('ready', () => {
    console.log('连接成功!');
});
ftp.connect({
    host: '39.106.129.66',
    port: 21,
    user: 'workbzw',
    password: 'bizhiwei001',
    connTimeout: 1000 * 10, // 连接超时时间
    pasvTimeout: 1000 * 10, // PASV data 连接超时时间
    keepalive: 1000 * 10, // 多久发送一次请求，以保持连接
});


// 正在获取本地文件
function readingFile() {
    return new Promise((resolve, reject) => {
        readFiles(dirPath).catch(err => reject(err));
        // 判断是否读取完毕（1s内 localFiles长度不再变化）
        console.log('正在读取本地文件，请稍后...');
        let timer = setInterval(() => {
            if (localFileLength == localFiles.length) {
                clearInterval(timer);
                resolve();
                return console.log('读取完成');
            }
        }, 1000);
    })
}

// 递归读取文件
function readFiles(filepath) {
    return new Promise((resolve, reject) => {
        fs.readdir(filepath, {withFileTypes: true}, (err, files) => {
            if (err) throw err;
            if (files.length > 0) {
                files.map(file => {
                    if (file.isFile()) { // 文件
                        const child_filepath = filepath + '/' + file.name;
                        fs.readFile(child_filepath, (err, data) => {
                            if (err) throw err;
                            const dir = remoteFtpPath + filepath.replace(dirPath, '').replace('\\', '/');
                            localFiles.push({
                                dir,
                                filepath: dir + '/' + file.name,
                                filedata: data
                            })
                            localFileLength = localFiles.length;
                        });
                    } else { // 目录
                        const child_filepath = filepath + '\\' + file.name;
                        readFiles(child_filepath);
                    }
                });
            }
        });
    });
}

// 正在上传文件
function uploadingFile() {
    return new Promise((resolve, reject) => {
        localFiles.map(file => {
            uploadFiles(file.dir, file.filepath, file.filedata).catch(err => reject(err));
        })
        console.log('正在上传，请稍后...');
        let timer = setInterval(() => {
            if (localFileLength == 0) {
                clearInterval(timer);
                resolve();
                return console.log('上传完成');
            }
            uploadTime++;
            console.log(`已用时：${uploadTime}s`);
        }, 1000);
    })
}

// 覆盖上传文件
function uploadFiles(dir, filepath, filedata) {
    return new Promise((resolve, reject) => {
        ftp.mkdir(dir, true, err1 => {
            if (err1) reject(err1);
            ftp.put(filedata, filepath, err2 => {
                if (err2) reject(err2);
                localFileLength--;
                ftp.end();
                resolve();
            });
        })
    })
}

// 覆盖上传文件
async function uploadFile(filepath,remoteFileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, (err, data) => {
            if (err) throw err;
            ftp.put(data, remoteFileName, err2 => {
                if (err2) reject(err2);
                // ftp.end();
                resolve();
            });
        });
    })
}
async function downloadFile(filePath,res){
    const dirPath = path.dirname(filePath);
    const fileName = path.basename(filePath);
    let {err : ea,dir} = await cwd(dirPath);
    return new Promise((resolve,reject)=>{
        ftp.get(fileName,(err,rs)=>{
            let ws = fs.createWriteStream(fileName).pipe(res);
            // rs.pipe(ws);
            resolve({err : err});
        });
    });
}

module.exports = {uploadFiles,uploadFile,downloadFile};