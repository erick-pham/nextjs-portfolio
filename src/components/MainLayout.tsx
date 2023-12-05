"use client";
import React, { useState } from "react";

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  FormOutlined,
} from "@ant-design/icons";

import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Footer } from "antd/es/layout/layout";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

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
  getItem(<Link href="/tasks">Tasks</Link>, "2", <DesktopOutlined />),
  getItem(<Link href="/questions">Questions</Link>, "3", <FormOutlined />),
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

const MenuItemPathKeys: Record<string, string> = {
  "/": "1",
  "/tasks": "2",
  "/questions": "3",
};

const MenuItemBreadcrumb: Record<string, string> = {
  "/": "Home",
  "/tasks": "Tasks",
  "/questions": "Questions",
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
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={[MenuItemPathKeys[pathname] || "1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            style={{ margin: "16px 0" }}
            items={[
              {
                title: MenuItemBreadcrumb[pathname] || "/",
              },
            ]}
          ></Breadcrumb>
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
