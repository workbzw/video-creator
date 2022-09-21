import React from "react";
import {ResultView} from "./view/ResultView";

export const Page404 = () => {
    let handleSubmit=()=>{

    }
    return (
        <div style={{width: '100%', height: '100%'}}>
            <ResultView  submitHandle={()=>{}} subTitle={''} title={''} cancelHandle={()=>{}} cancelText={'取消'} submitText={'下载'}/>
        </div>
    )
}