import type { Metadata } from "next";
import "./globals.css";
import { company_name, description } from "@/lib/constants";

export const metadata: Metadata = {
  title: company_name,
  description: description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
