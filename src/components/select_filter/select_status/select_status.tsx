import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn-ui/dropdown-menu";
import { Button } from "@/components/shadcn-ui/button";
import { Filter, ChevronDown } from "lucide-react";
import { select_status_txt } from "@/lib/constants";

interface StatusProps {
  status_options: string[];
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
}
export default function SelectStatus({
  status_options,
  selectedStatus,
  setSelectedStatus,
}: StatusProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-1 min-w-[100px] justify-between"
        >
          <span className="flex items-center gap-2 !font-normal">
            <Filter className="size-4" />
            {selectedStatus || select_status_txt}
          </span>
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-[200px]">
        {status_options.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => setSelectedStatus(option)}
            className={selectedStatus === option ? " bg-gray-100" : ""}
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
