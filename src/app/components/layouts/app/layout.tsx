import { Col, Layout, Row } from "antd";
import { MenuNav } from "@/src/app/components/layouts/app/menu-nav";
import { Header } from "./header";
import React, { useState } from "react";
import { APP } from "@/src/config";
import moment from "dayjs";

const siderWidth = 240;
const isTopNavMode = false;

export const AppLayout: React.FC<any> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout>
            <Header siderWidth={siderWidth} menuCollapsed={collapsed} onToggleMenu={() => setCollapsed(!collapsed)} />
            <Layout hasSider={!isTopNavMode}>
                {!isTopNavMode && (
                    <Layout.Sider
                        theme="light"
                        collapsed={collapsed}
                        width={siderWidth}
                        style={{
                            overflow: "auto",
                            position: "static",
                            left: 0,
                            top: 0,
                            bottom: 0,
                        }}>
                        <MenuNav mode="inline" style={{ marginTop: 8 }} />
                    </Layout.Sider>
                )}

                <Layout.Content>
                    <div style={isTopNavMode ? { paddingLeft: 48, paddingRight: 48 } : { marginTop: 24 }}>{children}</div>
                    <Layout.Footer
                        style={{
                            backgroundColor: "white",
                            position: "fixed",
                            padding: "12px 0",
                            bottom: 0,
                            margin: 0,
                            width: `calc(100% - ${collapsed ? 80 : siderWidth}px)`,
                        }}>
                        <Row justify="space-between" style={{ marginLeft: 24, marginRight: 24 }}>
                            <Col>{`${APP.NAME} @${moment().year()}`}</Col>
                            <Col style={{ textAlign: "right" }}>
                                <span>v{APP.VERSION}</span>
                            </Col>
                        </Row>
                    </Layout.Footer>
                </Layout.Content>
            </Layout>
        </Layout>
    );
};

export const FullMidLayout: React.FC<any> = ({ children }) => {
    return (
        <Layout style={{ height: "100vh", width: "100%" }}>
            <Layout.Content>
                <Row align="middle" justify="center" style={{ width: "100%" }}>
                    <Col span={24}>{children}</Col>
                </Row>
            </Layout.Content>
        </Layout>
    );
};
