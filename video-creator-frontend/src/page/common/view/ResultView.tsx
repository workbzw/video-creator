import {Button, Result} from 'antd';
import React from 'react';

interface P {
    title: string
    subTitle: string
    submitText: string
    cancelText: string
    submitHandle: () => void
    cancelHandle: () => void

}

export const ResultView: React.FC<P> = ({title, subTitle, submitText, cancelText, submitHandle, cancelHandle}) => (
    <Result
        status="success"
        title={title}
        subTitle={subTitle}
        extra={[
            <Button onClick={submitHandle} type="primary" key="console">
                {submitText}
            </Button>,
            <Button onClick={cancelHandle} key="buy">{cancelText}</Button>,
        ]}
    />
);
