import React from 'react';
import {Carousel, Image} from 'antd';
import {useSelector} from "react-redux";
import {RootState} from "../../../store";

export const Gallery = () => {
    const state = useSelector((state: RootState) => state);
    return (
        <Carousel autoplay dots={false} style={{margin: 4}}>
            {state.video.imgUrlList.map((imgUrl) => (
                <div>
                    <Image preview={false} className={'img'} src={`/api/v1/file/${imgUrl}`}/>
                </div>
            ))}
        </Carousel>
    )
}
