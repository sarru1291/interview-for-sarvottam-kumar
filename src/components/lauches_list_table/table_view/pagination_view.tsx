import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/shadcn-ui/pagination";
interface PaginationViewProps {
  current_page: number;
  setCurrentPage: (page: number) => void;
  total_pages: number;
  visible_pages: (string | number)[];
}

export default function PaginationView({
  current_page,
  setCurrentPage,
  total_pages,
  visible_pages,
}: PaginationViewProps) {
  return (
    <div className="mt-4 sm:my-4 w-[100vw] sm:w-[90vw] md:w-[60vw] sm:m-auto">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage(Math.max(current_page - 1, 1))}
              className={
                current_page === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {visible_pages.map((page, index) => (
            <PaginationItem key={index}>
              {typeof page === "number" ? (
                <PaginationLink
                  isActive={current_page === page}
                  onClick={() => setCurrentPage(page)}
                  className={`cursor-pointer hover:bg-muted${
                    index === visible_pages.length - 1
                      ? " !border-l border-gray-200"
                      : ""
                  }`}
                >
                  {page}
                </PaginationLink>
              ) : (
                <span className="text-muted-foreground border border-l-0 border-r-0 px-2 py-2">
                  &hellip;
                </span>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage(Math.min(current_page + 1, total_pages))
              }
              className={
                current_page === total_pages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
