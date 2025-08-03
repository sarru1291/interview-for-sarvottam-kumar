import * as React from "react";
import { type DateRange } from "react-day-picker";

import { Calendar } from "@/components/shadcn-ui/calendar";
import { display_no_of_calendar } from "@/lib/constants";

interface RangeCalendarProps {
  date: DateRange | undefined;
  setDate: (date: DateRange) => void;
}

export default function RangeCalendar({ date, setDate }: RangeCalendarProps) {
  return (
    <Calendar
      mode="range"
      required={true}
      defaultMonth={date?.to}
      selected={date}
      onSelect={setDate}
      numberOfMonths={display_no_of_calendar}
    />
  );
}
