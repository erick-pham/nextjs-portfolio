"use client";
import { format as datefnsFormat } from "date-fns";
import { Flex, Card, Col, Row, Typography } from "antd";
import { useState } from "react";

import { Collection } from "@/types/questionnaire";
import Meta from "antd/es/card/Meta";
import Link from "next/link";
import { ClockCircleOutlined } from "@ant-design/icons";
import Image from "next/image";

const TableCollection = ({
  listCollection,
}: {
  listCollection: Collection[];
}) => {
  const [open, setOpen] = useState(false);

  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    setOpen(false);
  };

  return (
    <Row gutter={[16, 24]} style={{ margin: 8 }}>
      {listCollection.map(
        ({
          name,
          status,
          id,
          description,
          thumbnail,
          createdAt,
        }: Collection) => {
          return (
            <Col span={6} key={id} className="gutter-row">
              <Link href={`/questionnaires/${id}`}>
                <Card
                  hoverable
                  title={name}
                  bordered={false}
                  style={{ width: 300 }}
                  key={"id"}
                  cover={
                    <Image
                      alt="example"
                      width="300"
                      height="200"
                      src={`${
                        thumbnail
                          ? thumbnail
                          : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      }`}
                    />
                  }
                  // actions={[
                  //   <SettingOutlined key="setting" />,
                  //   <EditOutlined key="edit" />,
                  //   <EllipsisOutlined key="ellipsis" />,
                  // ]}
                >
                  <Meta
                    key={"id"}
                    title={description}
                    description={
                      <Flex align="center" gap={4}>
                        <ClockCircleOutlined />
                        <Typography>
                          {datefnsFormat(new Date(createdAt), "Pp")}
                        </Typography>
                      </Flex>
                    }
                  />
                </Card>
              </Link>
            </Col>
          );
        }
      )}
    </Row>
  );
};

export default TableCollection;
