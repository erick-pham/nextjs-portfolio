import React from "react";
import MainLayout from "@/components/MainLayout";

const RootLayout: React.FC<React.PropsWithChildren> = ({
  children,
}: React.PropsWithChildren) => <MainLayout>{children}</MainLayout>;

export default RootLayout;
