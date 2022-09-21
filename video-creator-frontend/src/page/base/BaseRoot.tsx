import React from "react";
import './style.scss'
import {PageHeader} from "antd";

interface BaseProps {
    // title: string,
    // subTitle?: string,
    // showBackIcon?: boolean,
    children?: any;
}


export const BaseRoot = (props: BaseProps) => {
    // let {title, subTitle, children, showBackIcon} = props;
    let {children} = props;
    return (
        <div className={'baseRoot'}>
            {/*{showBackIcon ?*/}
            {/*    <PageHeader*/}

            {/*        ghost={false}*/}
            {/*        className="site-page-header"*/}
            {/*        onBack={() => window.history.back()}*/}
            {/*        title={title}*/}
            {/*        subTitle={subTitle}*/}
            {/*        extra={[]}*/}
            {/*    />*/}
            {/*    :*/}
            {/*    <PageHeader*/}
            {/*        ghost={false}*/}
            {/*        backIcon={''}*/}
            {/*        className="site-page-header"*/}
            {/*        onBack={() => window.history.back()}*/}
            {/*        title={title}*/}
            {/*        subTitle={subTitle}*/}
            {/*        extra={[]}*/}
            {/*    />*/}
            {/*}*/}
            {children}
        </div>
    )
}