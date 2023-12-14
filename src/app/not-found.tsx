/* eslint-disable @next/next/no-img-element */
"use client";
import Head from "next/head";
import NextLink from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Space, Typography } from "antd";
const NotFoundPage: React.FC = () => (
  <>
    <Head>
      <title>404 - Page not found</title>
    </Head>
    <Space
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography.Title
        style={{
          alignItems: "center",
        }}
        type="danger"
        level={2}
      >
        404: PAGE NOT FOUND
      </Typography.Title>
      <Typography.Title type="success" level={2}>
        Oops! The page you are looking for isn’t here.
      </Typography.Title>

      <NextLink href="/" passHref>
        <Button
          type="primary"
          icon={<ArrowLeftOutlined size={20} />}
          // sx={{ mt: 3 }}
          // variant="contained"
        >
          Go back to home
        </Button>
      </NextLink>
    </Space>
  </>
);

export default NotFoundPage;
