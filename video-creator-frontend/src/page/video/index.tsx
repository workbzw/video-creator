import React, {useState} from 'react';
import './style.scss'
import {Layout, Menu, MenuProps} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {GalleryModel} from "./children/GalleryModel";
import {ChartModel} from "./children/ChartModel";

interface P {
}

export const Video = (props: P) => {
    const items = [{text: '图片切换', click: '/video/gallery', key: "0"}, {text: '动态图表', click: '/video/chart', key: "1"}]
    const {Header, Content, Footer} = Layout;
    const [currentKey, setCurrentKey] = useState("0");
    //合成图片视频
    const gallery = <GalleryModel/>
    //合成动态图表视频
    const chart = <ChartModel/>
    const onClick: MenuProps['onClick'] = e => {
        setCurrentKey(e.key);
    }
    return (
        <Layout style={{height: '100%'}}>
            <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
                <div className="logo"/>
                <Menu
                    selectedKeys={[currentKey]}
                    onClick={onClick}
                    theme="dark"
                    mode="horizontal"
                    items={items.map((item, index) => ({
                        key: item.key,
                        label: item.text,
                    }))}
                />
            </Header>
            <Content className="site-layout"
                     style={{marginLeft: 50, marginRight: 50, marginTop: 64, height: '100%', overflowY: "auto"}}>
                {currentKey === "0" ? gallery : chart}
            </Content>
            <Footer style={{textAlign: 'center'}}>workbzw@outlook.com Design ©2018 Created by workbzw</Footer>
        </Layout>
    )
}