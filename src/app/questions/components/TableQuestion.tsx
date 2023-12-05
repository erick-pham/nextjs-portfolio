"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  TablePaginationConfig,
  Typography,
} from "antd";
import { Question } from "@/types/question";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

type TableProductProps = {
  products: Question[];
  totalCount: number;
};

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Question;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const TableProduct: React.FC<TableProductProps> = ({
  products,
  totalCount,
}: TableProductProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<string | undefined>("");

  useEffect(() => {
    if (products) setIsFetching(false);
  }, [products]);
  const isEditing = (record: Question) => record.id === editingKey;

  const edit = (record: Partial<Question>) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key?: React.Key) => {
    // try {
    //   const row = (await form.validateFields()) as Item;
    //   const newData = [...products];
    //   const index = newData.findIndex((item) => key === item.key);
    //   if (index > -1) {
    //     const item = newData[index];
    //     newData.splice(index, 1, {
    //       ...item,
    //       ...row,
    //     });
    //     setEditingKey("");
    //   } else {
    //     newData.push(row);
    //     setEditingKey("");
    //   }
    // } catch (errInfo) {
    //   console.log("Validate Failed:", errInfo);
    // }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      width: "15%",
      editable: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "35%",
      editable: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "25%",
      editable: true,
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      width: "15%",
      editable: true,
      render: (_: any, record: Question) => {
        return record.createdAt
          ? new Date(record.createdAt).toLocaleString()
          : "";
      },
    },
    {
      title: "Action",
      dataIndex: "operation",
      render: (_: any, record: Question) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Question) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        rowKey={"id"}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        loading={isFetching}
        bordered
        dataSource={products}
        columns={mergedColumns}
        rowClassName="editable-row"
        onChange={(pagination: TablePaginationConfig) => {
          if (pagination && pagination.current) {
            const currentParams = new URLSearchParams(searchParams);
            currentParams.set("page", String(pagination.current));
            replace(`${pathname}?${currentParams.toString()}`);
            setIsFetching(true);
          }
        }}
        pagination={{
          position: ["topRight"],
          total: totalCount,
          current: Number(searchParams.get("page")),
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default TableProduct;
