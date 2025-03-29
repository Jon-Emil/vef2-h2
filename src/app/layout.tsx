import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/Layout/Layout";

export const metadata: Metadata = {
  title: "Movie Archive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="wrapper">
          <Layout>{children}</Layout>
        </div>
      </body>
    </html>
  );
}
