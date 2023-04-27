import React, { useMemo } from "react";
import { UserInfo } from "./user-info";
import { Col, Row, theme } from "antd";
import { Link } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { MenuNav } from "@/src/app/components/layouts/app/menu-nav";

const isTopNavMode = false;

export const Header: React.FC<{ siderWidth?: number; menuCollapsed?: boolean; onToggleMenu?: () => void }> = (props) => {
    const { siderWidth = 96, menuCollapsed, onToggleMenu } = props;
    const { token } = theme.useToken();

    return (
        <div style={{ margin: 0, padding: "0 24px", backgroundColor: token.colorPrimary }}>
            <Row justify="space-between" align="middle">
                <Col flex={`${siderWidth}px`}>
                    <Link to="#" replace>
                        <img alt="logo" src="/assets/images/logo-135x135.png" style={{ width: 80, padding: 8 }} />
                    </Link>
                </Col>
                <Col flex="auto">
                    {useMemo(() => {
                        if (isTopNavMode) {
                            return <MenuNav mode="horizontal" />;
                        } else {
                            const style = { fontSize: 20, color: "#f8f8f8", cursor: "pointer" };
                            return menuCollapsed ? (
                                <MenuFoldOutlined style={style} onClick={onToggleMenu} />
                            ) : (
                                <MenuUnfoldOutlined style={style} onClick={onToggleMenu} />
                            );
                        }
                    }, [menuCollapsed])}
                </Col>
                <Col flex="240px" style={{ textAlign: "right" }}>
                    <UserInfo />
                </Col>
            </Row>
        </div>
    );
};
