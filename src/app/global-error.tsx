"use client";
import { RedoOutlined } from "@ant-design/icons";
import { Typography, Space, Button } from "antd";
import Head from "next/head";
import type { ReactNode } from "react";

export default function Error({
  // error,
  reset,
}: {
  // error: Error & { digest?: string };
  reset: () => void;
}): ReactNode {
  return (
    <div>
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
          500: SERVER ERROR
        </Typography.Title>
        <Typography.Title type="danger" level={2}>
          Sorry.. there was an error
        </Typography.Title>

        <Button
          type="primary"
          icon={<RedoOutlined size={20} />}
          onClick={() => {
            reset();
          }}
        >
          Go back to home
        </Button>
      </Space>
    </div>
  );
}
