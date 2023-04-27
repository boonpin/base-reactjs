import { ArrowLeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Layout, Row, Space, Spin, Typography } from "antd";
import React, { FC, PropsWithChildren, ReactElement } from "react";
import { useNavigate } from "react-router-dom";

type ContainerProps = {
    back?: boolean | string | (() => void);
    title?: string | ReactElement;
    subTitle?: string | ReactElement;
    loading?: boolean;
    extra?: ReactElement;
    breadcrumbs?: {
        name: string;
        path?: string;
    }[];
    showFooter?: boolean;
    showHeader?: boolean;
    style?: React.CSSProperties;
};

export const AppContainer: FC<PropsWithChildren<ContainerProps>> = (props) => {
    const { children, style, back, title, subTitle, extra, loading = false, breadcrumbs } = props;

    const navigate = useNavigate();

    return (
        <>
            <Layout style={style ?? { padding: "0 48px 64px 48px", minHeight: "max-content" }}>
                {title && (
                    <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
                        <Col>
                            <Space size={4} align="center" direction="horizontal">
                                {back && (
                                    <Button
                                        style={{ color: "black" }}
                                        type="link"
                                        icon={<ArrowLeftOutlined style={{ cursor: "pointer" }} />}
                                        onClick={() => {
                                            if (typeof back === "string") {
                                                navigate(back);
                                            } else if (typeof back === "function") {
                                                back();
                                            } else if (back) {
                                                navigate(-1);
                                            }
                                        }}
                                    />
                                )}
                                <Typography.Title level={5} style={{ margin: 0, marginLeft: 4 }}>
                                    {title}
                                </Typography.Title>
                                {subTitle && (
                                    <Typography.Text style={{ color: "#676767" }}>
                                        &nbsp;<small>{subTitle}</small>
                                    </Typography.Text>
                                )}
                            </Space>
                        </Col>
                        <Col>{extra}</Col>
                    </Row>
                )}

                {breadcrumbs && (
                    <Breadcrumb style={{ marginBottom: 8 }}>
                        {breadcrumbs?.map((b, i) => {
                            return (
                                <Breadcrumb.Item key={i} href={b.path}>
                                    {b.name}
                                </Breadcrumb.Item>
                            );
                        })}
                    </Breadcrumb>
                )}

                <Layout.Content style={{ minHeight: "80vh" }}>
                    <Spin spinning={loading}>{children}</Spin>
                </Layout.Content>
            </Layout>
        </>
    );
};
