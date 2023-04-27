import React from "react";
import { message, Modal, notification } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

type EmptyFc = () => void;

export const notify = {
    success: (msg: string | React.ReactNode) => {
        notification.success({ message: msg });
    },
    warn: (msg: string | React.ReactNode) => notification.warning({ message: msg }),
    error: (err: string | Error | React.ReactNode | any) => {
        if (err instanceof Error) {
            notification.error({ message: err.message ?? err });
        } else if (typeof err === "object" && err.hasOwnProperty("message")) {
            notification.error({ message: err.message ?? err });
        } else {
            notification.error({ message: err });
        }
    },
    info: (msg: string | React.ReactNode) => notification.info({ message: msg }),
};

export const confirm = (message: string, yes?: EmptyFc, no?: EmptyFc, opts?: { okText?: string; cancelText?: string; icon?: React.ReactElement }) => {
    Modal.confirm({
        icon: opts?.icon ?? <ExclamationCircleOutlined />,
        content: message,
        onOk: yes,
        onCancel: no,
        okText: opts?.okText,
        cancelText: opts?.cancelText,
    });
};

export const toast = {
    success: (msg: string) => message.success(msg),
    warn: (msg: string) => message.warning(msg),
    error: (msg: string) => message.error(msg),
    info: (msg: string) => message.info(msg),
};
