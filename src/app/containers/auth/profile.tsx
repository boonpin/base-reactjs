import { api, ui } from "@/src/app/services";
import { useAppStore } from "@/src/app/store";
import { Button, Card, Col, Form, Input, Modal, Row } from "antd";
import React, { useState } from "react";
import { AppContainer } from "@/src/app/components/layouts/app";

export const Profile: React.FC<any> = () => {
    const [formRef] = Form.useForm();
    const [passwordFormRef] = Form.useForm();

    const [loading, setLoading] = useState(false);

    const [showChangePassword, setShowChangePassword] = useState(false);

    const { user } = useAppStore();

    const initialValues: any = {
        name: user?.name,
        email: user?.email,
    };

    const handlers = {
        submit: (values: any) => {
            if (user?._id) {
                ui.confirm("Are you sure to update your profile?", async () => {
                    setLoading(true);
                    try {
                        await api.auth.update(values);
                        ui.notify.success("Updated");
                    } catch (err: any) {
                        ui.notify.error(err);
                        setLoading(false);
                    }
                });
            }
        },
        changePassword: (values: any) => {
            const { current_password, new_password } = values;
            if (current_password && new_password) {
                ui.confirm("Are you sure to update your password?", async () => {
                    setShowChangePassword(false);
                    try {
                        setLoading(true);
                        await api.auth.password.update(current_password, new_password);
                        ui.notify.success("Updated new password");
                    } catch (err) {
                        ui.notify.error(err);
                    } finally {
                        setLoading(false);
                    }
                });
            }
        },
    };
    const extra = (
        <Button type="primary" onClick={() => setShowChangePassword(true)}>
            Change Password
        </Button>
    );

    return (
        <AppContainer title="User Profile" extra={extra} loading={loading}>
            <Card className="app-card">
                <Row>
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                        <Form layout="vertical" onFinish={handlers.submit} autoComplete="off" form={formRef} initialValues={initialValues}>
                            <Form.Item label="Username">
                                <Input value={user?.username} disabled />
                            </Form.Item>

                            <Form.Item
                                label="Name"
                                name={"name"}
                                rules={[
                                    {
                                        required: true,
                                        message: "Name is require",
                                    },
                                ]}>
                                <Input placeholder="Name" />
                            </Form.Item>
                            <Form.Item label="E-mail" name={"email"}>
                                <Input placeholder="E-mail" type="email" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Card>

            <Modal
                title="Change Password"
                open={showChangePassword}
                okText="Submit"
                onOk={() => {
                    if (passwordFormRef) {
                        passwordFormRef.submit();
                    }
                }}
                onCancel={() => setShowChangePassword(false)}
                destroyOnClose>
                <Form form={passwordFormRef} layout="vertical" onFinish={handlers.changePassword}>
                    <Form.Item name={"current_password"} rules={[{ required: true, message: "Please insert your current password" }]}>
                        <Input.Password placeholder="Current Password" />
                    </Form.Item>
                    <Form.Item name={"new_password"} rules={[{ required: true, message: "Please insert your current password" }]}>
                        <Input.Password placeholder="New Password" />
                    </Form.Item>
                    <Form.Item
                        name={"retype_password"}
                        rules={[
                            { required: true, message: "Please retype your new password" },
                            {
                                validator: async (rule, value) => {
                                    if (value !== passwordFormRef.getFieldValue("new_password")) {
                                        throw new Error("must be same with new password!");
                                    }
                                },
                            },
                        ]}>
                        <Input.Password placeholder="Retype new Password" />
                    </Form.Item>
                </Form>
            </Modal>
        </AppContainer>
    );
};
