import React from 'react';
import {Carousel, Image} from 'antd';
import {useSelector} from "react-redux";
import {RootState} from "../../../store";

const contentStyle: React.CSSProperties = {
    aspectRatio: 1,
    color: '#ffffff',
    lineHeight: 21,
    overflow: 'hidden',
    textAlign: 'center',
    background: '#ffffff',
    objectFit: 'cover'
};

export const Gallery = () => {
    const state = useSelector((state: RootState) => state);
    return (
        <Carousel autoplay dots={false} style={{margin: 4}}>
            {state.video.imgUrlList.map((imgUrl) => (
                <div>
                    <Image preview={false} style={contentStyle} src={`http://localhost:3001/api/v1/file/${imgUrl}`}/>
                </div>
            ))}
        </Carousel>
    )
}
