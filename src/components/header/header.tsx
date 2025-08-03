import React from "react";
import Logo from "@/components/header/logo";

export default function Header() {
  return (
    <div className="flex items-center justify-center border-b-2 border-gray-100 p-4 shadow-sm">
      <Logo />
    </div>
  );
}
