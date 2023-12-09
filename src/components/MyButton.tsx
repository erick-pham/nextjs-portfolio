import type { ButtonProps } from "antd";
import { Button, ConfigProvider } from "antd";
import type { ReactElement } from "react";

type Color =
  | "danger"
  | "info"
  | "primary"
  | "secondary"
  | "success"
  | "warning";

type MyButtonProp = ButtonProps & {
  color?: Color;
};

const getButtonBackgroundColor = (color?: Color): string => {
  switch (color) {
    case "primary":
      return "#17A2B8";
    case "secondary":
      return "#6C757D";
    case "info":
      return "#52C41A";
    case "success":
      return "#28A745";
    case "warning":
      return "#FFC107";
    case "danger":
      return "#DC3545";
    default:
      return "none";
  }
};
export const MyButton = ({
  children,
  color,
  ...rest
}: MyButtonProp): ReactElement => {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: getButtonBackgroundColor(color),

          // Alias Token
          colorBgContainer: getButtonBackgroundColor(color),
        },
      }}
    >
      <Button {...rest}>{children}</Button>
    </ConfigProvider>
  );
};
