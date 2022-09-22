import React from 'react';
import 'antd/dist/antd.min.css';
import {useNavigate} from "react-router";
import {BaseRoot} from "../base/BaseRoot";
import {Button} from 'antd';

export const Home = () => {
    const navigate = useNavigate()
    return (
        <BaseRoot>
            <div style={{position: 'absolute', width: '100%', height: 10000, textAlign: 'center'}}>
                <div style={{
                    marginTop: 200,
                    position: 'absolute',
                    width: '100%',
                    color: '#fff',
                    fontSize: 90,
                    fontWeight: 'bold'
                }}>图片合成视频
                </div>
                <div style={{position: 'absolute', width: '100%', marginTop: 520,}}>
                    <Button type={'primary'} style={{position: 'absolute'}} onClick={() => {
                        navigate('/video')
                    }}>点击开始</Button>
                </div>
                <img
                    src={'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp2.itc.cn%2Fq_70%2Fimages03%2F20210608%2F5986ca45d9f3402096901e20e51ed24a.jpeg&refer=http%3A%2F%2Fp2.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666107445&t=9f56f2a1aace935ab14ac950d50a5a4f'}
                    className={'bgImg'} alt=""/>
            </div>
        </BaseRoot>
    )
}
