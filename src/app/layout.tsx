import React from "react";
// import { Inter } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Erick Pham",
  description: "Erick Pham Website",
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => (
  <html lang="en">
    <body>
      <ThemeRegistry>
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 3000,
          }}
        />
        <SessionProvider>{children}</SessionProvider>
      </ThemeRegistry>
    </body>
  </html>
);
export default RootLayout;
