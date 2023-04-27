import { Button, Card, Col, Form, Input, Row, Space, Typography } from "antd";
import { useAppDispatch, useAppStore } from "@/src/app/store";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { api, ui } from "@/src/app/services";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import "./login.css";
import { APP } from "@/src/config";
import { FullMidLayout } from "@/src/app/components/layouts";

export const Login: React.FC<any> = () => {
    const {} = useAppStore();

    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handlers = {
        submit: async ({ username, password }: any) => {
            setLoading(true);
            try {
                const rs = await api.auth.login({ username, password });
                ui.notify.success(`Welcome, ${rs.name}`);
                dispatch.user.set(rs);
            } catch (err: any) {
                ui.notify.error(err);
                setLoading(false);
            }
        },
    };

    return (
        <FullMidLayout>
            <Row justify="center" align="middle" style={{ height: "100vh" }}>
                <Col md={8} sm={20}>
                    <Card bodyStyle={{ margin: "8px 40px" }}>
                        <Form onFinish={(form) => handlers.submit(form)}>
                            <Space direction="vertical" style={{ width: "100%" }} size={4}>
                                <div style={{ marginBottom: 40, textAlign: "center" }}>
                                    <img alt="logo" src="/assets/images/logo.png" style={{ width: 120, padding: 4 }} />
                                    <Typography.Title level={3} style={{ marginTop: 24 }}>
                                        {APP.NAME}
                                    </Typography.Title>
                                    <Typography.Text>PORTAL</Typography.Text>
                                </div>

                                <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            message: "Username is require",
                                        },
                                    ]}
                                    name="username">
                                    <Input placeholder="username" prefix={<UserOutlined />} />
                                </Form.Item>
                                <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            message: "Password is require",
                                        },
                                    ]}
                                    name="password">
                                    <Input type="password" placeholder="password" prefix={<LockOutlined />} />
                                </Form.Item>

                                <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: "right", padding: 0 }}>
                                    <Button type="primary" htmlType="submit" loading={loading}>
                                        Sign In
                                    </Button>
                                </Form.Item>
                            </Space>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </FullMidLayout>
    );
};
