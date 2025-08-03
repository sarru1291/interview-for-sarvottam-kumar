import type { Metadata } from "next";
import "./globals.css";
import { company_name, description } from "@/lib/constants";
import { Suspense } from "react";
import LoadingSkeleton from "@/components/loading_skeleton";
import Header from "@/components/header/header";

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
      <body>
        <Header />
        <Suspense fallback={<LoadingSkeleton />}>{children}</Suspense>
      </body>
    </html>
  );
}
