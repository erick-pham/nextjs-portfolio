"use client";
import React, { useState } from "react";

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  InboxOutlined,
} from "@ant-design/icons";

import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Footer } from "antd/es/layout/layout";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
  };
};

const items: MenuItem[] = [
  getItem(<Link href="/">Home</Link>, "1", <PieChartOutlined />),
  getItem(
    <Link href="/questionnaires">Questionnaires</Link>,
    "2",
    <InboxOutlined />
  ),
  getItem(<Link href="/tasks">Tasks</Link>, "3", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "sub1-1"),
    getItem("Bill", "sub1-2"),
    getItem("Alex", "sub1-3"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "sub2-1"),
    getItem("Team 2", "sub2-2"),
  ]),
  getItem("Files", "4", <FileOutlined />),
];

const getBreadcrumb = (path: string): string => {
  if (!path) return "";

  if (/\/questionnaires/.test(path)) {
    return "2";
  }

  if (/\/tasks/.test(path)) {
    return "3";
  }

  return "1";
};

const MainLayout: React.FC<React.PropsWithChildren> = ({
  children,
}: React.PropsWithChildren) => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value: boolean) => {
          setCollapsed(value);
        }}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={[getBreadcrumb(pathname)]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: "0 16px" }}>
          {/* <Breadcrumb
            style={{ margin: "16px 0" }}
            items={[
              {
                title: MenuItemBreadcrumb[pathname] || "/",
              },
            ]}
          ></Breadcrumb> */}
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
