import React, {useState} from 'react';
import type {UploadProps} from 'antd';
import {message} from "antd";
import {InboxOutlined} from '@ant-design/icons';
import {stateActions, store} from "../../../store";
import 'antd/dist/antd.min.css';
import './style.scss'
import Dragger from "antd/es/upload/Dragger";

export const ImageUpload = () => {
    let [files, setFiles] = useState<any[]>([])
    const props: UploadProps = {
        name: 'img',
        fileList: files,
        showUploadList: false,
        multiple: true,
        maxCount: 16,
        accept: 'image/*',

        action: 'http://localhost:3001/api/v1/upload',
        headers: {
            authorization: 'authorization-text',
            XRequestedWith:""
        },
        onChange(info) {
            setFiles([...info.fileList])
            if (info.file.status !== 'uploading') {
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} 上传成功！`).then(r => {
                });
                store.dispatch(stateActions.addImgUrlToList(info.file.response.data.fileName))
                console.log(store.getState().video.imgUrlList);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} 上传失败！`).then(r => {
                });
            }
        },
    };

    return (
        <div>
            <Dragger {...props} style={{width: '100%'}}>
                <p className={"ant-upload-drag-icon"}>
                    <InboxOutlined/>
                </p>
                <p className={"ant-upload-text"}>点击上传图片</p>
                <p className={"ant-upload-hint"}>最多上传16张图片(可多选)</p>
            </Dragger>
        </div>
    )
}