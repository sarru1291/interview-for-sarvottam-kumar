"use client";
import React, { useEffect, useState } from "react";
import SelectDateRange from "@/components/select_filter/select_date_range/select_date_range";
import SelectStatus from "@/components/select_filter/select_status/select_status";
import {
  past_five_years,
  past_month,
  past_six_months,
  past_three_months,
  past_two_years,
  past_week,
  past_year,
} from "@/lib/constants";
import {
  all_launches,
  upcoming_launches,
  successful_launches,
  failed_launches,
} from "@/lib/constants";

import { subDays } from "date-fns";
import { useLaunchDataStore } from "@/store/launch_data_store";

const date_range_options = [
  { label: past_week, range: [subDays(new Date(), 7), new Date()] },
  { label: past_month, range: [subDays(new Date(), 30), new Date()] },
  { label: past_three_months, range: [subDays(new Date(), 90), new Date()] },
  { label: past_six_months, range: [subDays(new Date(), 180), new Date()] },
  { label: past_year, range: [subDays(new Date(), 365), new Date()] },
  { label: past_two_years, range: [subDays(new Date(), 730), new Date()] },
  { label: past_five_years, range: [subDays(new Date(), 1825), new Date()] },
];
const status_options = [
  all_launches,
  upcoming_launches,
  successful_launches,
  failed_launches,
];
export default function SelectFilter() {
  const [date_dialog_open, setDateDialogOpen] = useState(false);

  const { filter, setDateRange, setStatus, filterLaunches } =
    useLaunchDataStore();

  useEffect(() => {
    filterLaunches();
  }, [filter.date_range, filter.status, filterLaunches]);

  return (
    <div className="flex flex-col md:flex-row w-full md:h-[13vh]">
      <div className="flex-1 flex items-center justify-center p-1">
        <SelectDateRange
          date_range_options={date_range_options}
          date={filter.date_range}
          setDate={(date) => setDateRange(date)}
          open={date_dialog_open}
          setOpen={setDateDialogOpen}
        />
      </div>
      <div className="flex-1 flex items-center justify-center p-1">
        <SelectStatus
          status_options={status_options}
          selectedStatus={filter.status}
          setSelectedStatus={(status) => setStatus(status)}
        />
      </div>
    </div>
  );
}
