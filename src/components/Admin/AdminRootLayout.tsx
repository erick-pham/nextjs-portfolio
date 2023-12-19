import type { ReactNode } from "react";
import DashboardLayout from "./DashboardLayout";

const AdminRootLayout = ({ children }: { children: ReactNode }): ReactNode => (
  <DashboardLayout>
    <div
      style={{
        padding: 24,
        // minHeight: 360,
        // background: colorBgContainer,
      }}
    >
      {children}
    </div>
  </DashboardLayout>
);

export default AdminRootLayout;
