import {Button, Modal} from 'antd';
import React, {useState} from 'react';

const useDialog = () => {
    let secondsToGo = 5;
    const [open, setOpen] = useState(true);

    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const modal = Modal.success({
        // onOk:()=>{},
        open:open,
        cancelText:'取消',
        okText:'确定',
        title: 'This is a notification message',
        content: `hahaha`,
    });

    // const timer = setInterval(() => {
    //     secondsToGo -= 1;
    //     modal.update({
    //         content: `This modal will be destroyed after ${secondsToGo} second.`,
    //     });
    // }, 1000);

    // setTimeout(() => {
    //     clearInterval(timer);
    //     modal.destroy();
    // }, secondsToGo * 1000);
};

const CreatingDialog: React.FC = () => <Button onClick={useDialog}>Open modal to close in 5s</Button>;

export default CreatingDialog;