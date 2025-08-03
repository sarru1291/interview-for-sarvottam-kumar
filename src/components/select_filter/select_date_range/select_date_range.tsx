import React from "react";
import { Button } from "@/components/shadcn-ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
} from "@/components/shadcn-ui/dialog";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import {
  breakpoints,
  date_range_dialog_description,
  date_range_dialog_title,
} from "@/lib/constants";
import RangeCalendar from "@/components/select_filter/select_date_range/range_calendar";

interface DateRangeProps {
  date_range_options: {
    label: string;
    range: Date[];
  }[];
  date: DateRange;
  setDate: (date: DateRange) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function SelectDateRange({
  date,
  setDate,
  open,
  setOpen,
  date_range_options,
}: DateRangeProps) {
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < breakpoints.sm;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full max-w-[250px] min-w-[150px] justify-center text-center font-normal"
        >
          <CalendarIcon className="size-4" />
          {(() => {
            if (!date || (!date.from && !date.to)) {
              return <span>{date_range_dialog_title}</span>;
            }
            const matched_past_date = date_range_options.find(
              (past_date) =>
                date.from &&
                date.to &&
                past_date.range[0].toDateString() ===
                  date.from.toDateString() &&
                past_date.range[1].toDateString() === date.to.toDateString()
            );
            if (matched_past_date) {
              return matched_past_date.label;
            }
            if (date.from) {
              if (date.to) {
                return (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                );
              }
              return format(date.from, "LLL dd, y");
            }
            return <span>{date_range_dialog_title}</span>;
          })()}
          <ChevronDownIcon />
        </Button>
      </DialogTrigger>

      <DialogContent
        className="p-2 max-w-[80vw] max-h-[80vh] md:max-w-2xl overflow-y-auto"
        showCloseButton={false}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{date_range_dialog_title}</DialogTitle>
          <DialogDescription>{date_range_dialog_description}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row ">
          {/* Past Date Option */}
          {isMobile ? (
            <div className="w-full">
              <select
                className="w-full border rounded p-2"
                value={
                  date && date.from && date.to
                    ? date_range_options.find(
                        (past_date) =>
                          past_date.range[0].toDateString() ===
                            date.from?.toDateString() &&
                          past_date.range[1].toDateString() ===
                            date.to?.toDateString()
                      )?.label || ""
                    : ""
                }
                onChange={(e) => {
                  const selected = date_range_options.find(
                    (past_date) => past_date.label === e.target.value
                  );
                  if (selected) {
                    setDate({ from: selected.range[0], to: selected.range[1] });
                    setOpen(false);
                  }
                }}
              >
                <option value="">Select a range</option>
                {date_range_options.map((past_date) => (
                  <option key={past_date.label} value={past_date.label}>
                    {past_date.label}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="flex sm:flex-col gap-1 sm:border-r pr-2">
              {date_range_options.map((past_date) => (
                <Button
                  key={past_date.label}
                  variant="ghost"
                  className="whitespace-nowrap justify-start"
                  onClick={() => {
                    setDate({
                      from: past_date.range[0],
                      to: past_date.range[1],
                    });
                    setOpen(false);
                  }}
                >
                  {past_date.label}
                </Button>
              ))}
            </div>
          )}

          {/* Calendar Range */}
          <div className="flex-1 flex items-center justify-center p-2">
            <RangeCalendar date={date} setDate={setDate} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
