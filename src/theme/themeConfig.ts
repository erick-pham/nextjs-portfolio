// theme/themeConfig.ts
import type { ThemeConfig } from "antd";
import { theme } from "antd";

const customTheme: ThemeConfig = {
  ...theme,
  token: {
    ...theme.useToken(),
    fontSize: 16,
    colorPrimary: "#52c41a",
  },
};

export default customTheme;
