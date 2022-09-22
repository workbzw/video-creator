import React from "react";
import './style.scss'

interface BaseProps {
    children?: any;
}


export const BaseRoot = (props: BaseProps) => {
    let {children} = props;
    return (
        <div className={'baseRoot'}>
            {children}
        </div>
    )
}