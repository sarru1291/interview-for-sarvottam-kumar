"use client";
import React, { useState } from "react";
import SelectDateRange from "@/components/select_filter/select_date_range/select_date_range";
import SelectStatus from "@/components/select_filter/select_status/select_status";
import {
  default_date_days_ago,
  past_month,
  past_six_months,
  past_three_months,
  past_two_years,
  past_week,
  past_year,
} from "@/lib/constants";
import { subDays } from "date-fns";
import { DateRange } from "react-day-picker";

const past_date_options = [
  { label: past_week, range: [subDays(new Date(), 7), new Date()] },
  { label: past_month, range: [subDays(new Date(), 30), new Date()] },
  { label: past_three_months, range: [subDays(new Date(), 90), new Date()] },
  { label: past_six_months, range: [subDays(new Date(), 180), new Date()] },
  { label: past_year, range: [subDays(new Date(), 365), new Date()] },
  { label: past_two_years, range: [subDays(new Date(), 730), new Date()] },
];
export default function SelectFilter() {
  const default_date: DateRange = {
    from: subDays(new Date(), default_date_days_ago),
    to: new Date(),
  };
  const [date, setDate] = useState<DateRange>(default_date);

  const [date_dialog_open, setDateDialogOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row w-full md:h-[13vh]">
      <div className="flex-1 flex items-center justify-center p-2">
        <SelectDateRange
          past_date_options={past_date_options}
          date={date}
          setDate={setDate}
          open={date_dialog_open}
          setOpen={setDateDialogOpen}
        />
      </div>
      <div className="flex-1 flex items-center justify-center p-2">
        <SelectStatus />
      </div>
    </div>
  );
}
