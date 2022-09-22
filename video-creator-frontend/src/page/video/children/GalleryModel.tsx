import {RootState, stateActions, store} from "../../../store";
import {Button, Form, Input, Modal, Row, Spin} from "antd";
import {ImageUpload} from "../../common/view/ImageUpload";
import {VideoCameraOutlined} from "@ant-design/icons";
import {Gallery} from "../../common/view/Gallery";
import TextArea from "antd/es/input/TextArea";
import {useSelector} from "react-redux";
import React, {useState} from "react";
import './style.scss'


export const GalleryModel = () => {
    const state = useSelector((state: RootState) => state);
    const [loading, setLoading] = useState(false);

    function handleClick(e: any) {
        setLoading(true)
        postData('http://110.42.242.63:3001/api/v1/video/create', {code: 200, msg: "success", data: store.getState()})
            .then((data) => {
                console.log(data.data.fileName); // JSON data parsed by `data.json()` call
                setLoading(false)
                Modal.confirm({
                    title: '视频合成成功',
                    icon: <VideoCameraOutlined/>,
                    content: '请点击下方`下载到本地`',
                    okText: '下载到本地',
                    cancelText: '取消',
                    onOk: () => {
                        window.location.href = 'http://110.42.242.63:3001/api/v1/file/' + data.data.fileName
                    }
                });
            });

    }

    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'user-agent': 'Example',
                'Content-Type': 'application/json;charset=utf-8'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    const handleInputAppKey = (e: any) => {
        store.dispatch(stateActions.setAppKey(e.target.value.trim()))
    }
    const handleInputAccessKeyId = (e: any) => {
        store.dispatch(stateActions.setAccessKeyId(e.target.value.trim()))
    }
    const handleInputAccessKeySecret = (e: any) => {
        store.dispatch(stateActions.setAccessKeySecret(e.target.value.trim()))
    }
    return (
        <div className={'page'}>
            <Spin spinning={loading} style={{width: '100%', height: '100%'}}>
                <div style={{marginLeft: 12, position: 'relative', overflowY: 'auto', width: 350, height: '100%'}}>
                    <Form className={'form-item'}>
                        AppKey:<Input maxLength={20} value={state.ttsConfig.appKey} onChange={handleInputAppKey}/>
                    </Form>
                    <Form className={'form-item'}>
                        AccessKeyId:<Input maxLength={20} value={state.ttsConfig.accessKeyId}
                                           onChange={handleInputAccessKeyId}/>
                    </Form>
                    <Form className={'form-item'}>
                        AccessKeySecret:<Input maxLength={40} value={state.ttsConfig.accessKeySecret}
                                               onChange={handleInputAccessKeySecret}/>
                    </Form>
                    <Form className={'form-item'}>
                        标题:<Input maxLength={12} value={state.video.title}
                                  onChange={e => store.dispatch(stateActions.setTitle(e.target.value.trim().replace(/\s*/g, "")))}/>
                    </Form>
                    <Form className={'form-item'}>
                        图片:<ImageUpload/>
                    </Form>
                    <Form className={'form-item'}>
                        副标题:<Input maxLength={24} value={state.video.subTitle}
                                   onChange={e => store.dispatch(stateActions.setSubTitle(e.target.value.trim().replace(/\s*/g, "")))}/>
                    </Form>
                    <Form className={'form-item'}>
                        配音:<TextArea maxLength={300} value={state.video.dubbing}
                                     autoSize={{maxRows: 3, minRows: 2}}
                                     onChange={e => store.dispatch(stateActions.setDubbing(e.target.value.trim().replace(/\s*/g, "")))}/>
                    </Form>
                    <Button onClick={handleClick} style={{width: '100%', marginTop: 6}} type={'primary'}>点击合成</Button>
                </div>
            </Spin>
            <div className={'mobile'}>
                <div className={'mobile-child-vertical-center'}>
                    <div className={'child-title'}>
                        <Row justify="center" align="middle">
                            <div style={{fontSize: 22, lineHeight: 1}}>{state.video.title}</div>
                        </Row>
                    </div>
                    <div className={'child-gallery'}>
                        <Gallery/>
                    </div>
                    <div className={'child-subtitle'}>
                        <Row justify="center" align="middle">
                            <div style={{fontSize: 18, lineHeight: 1}}>{state.video.subTitle}</div>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    )
}
