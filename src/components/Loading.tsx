import React from "react";
import { Flex, Spin } from "antd";

const AppLoading: React.FC = () => (
  <Flex gap="small" vertical>
    <Spin size="large">
      {/* <Alert
        message="Alert message title"
        description="Further details about the context of this alert."
        type="info"
      /> */}
    </Spin>
  </Flex>
);

export default AppLoading;
