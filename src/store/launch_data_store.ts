import { create } from "zustand";
import {
  all_launches_ep,
  all_launchpads_ep,
  all_payloads_ep,
  all_rockets_ep,
} from "@/lib/api_constants";
import { LaunchData } from "@/models/launch_data/launch_data";
import { Launchpad } from "@/models/launch_data/launchpad";
import { Rocket } from "@/models/launch_data/rocket";
import { Payload } from "@/models/launch_data/payload";
import { DateRange } from "react-day-picker";
import {
  all_launches,
  default_date_days_ago,
  failed_launches,
  successful_launches,
  upcoming_launches,
} from "@/lib/constants";
import { subDays } from "date-fns";

type LaunchState = {
  launches: LaunchData[];
  filtered_launches: LaunchData[];
  launchpads: Launchpad[];
  rockets: Rocket[];
  payloads: Payload[];
  isLoading: boolean;
  filter: {
    date_range: DateRange;
    status: string;
  };
  setDateRange: (date_range: DateRange) => void;
  setStatus: (status: string) => void;
  fetchAllData: () => Promise<void>;
  filterLaunches: () => void;
};

export const useLaunchDataStore = create<LaunchState>((set, get) => ({
  launches: [],
  launchpads: [],
  rockets: [],
  payloads: [],
  filtered_launches: [],
  isLoading: false,
  filter: {
    date_range: {
      from: subDays(new Date(), default_date_days_ago),
      to: new Date(),
    },
    status: all_launches,
  },
  setDateRange: (range) =>
    set((state) => ({
      filter: {
        ...state.filter,
        date_range: range,
      },
    })),

  setStatus: (status) =>
    set((state) => ({
      filter: {
        ...state.filter,
        status,
      },
    })),

  fetchAllData: async () => {
    set({ isLoading: true });

    try {
      const [launches, launchpads, rockets, payloads] = await Promise.all([
        fetch(all_launches_ep).then((res) => res.json()),
        fetch(all_launchpads_ep).then((res) => res.json()),
        fetch(all_rockets_ep).then((res) => res.json()),
        fetch(all_payloads_ep).then((res) => res.json()),
      ]);

      set({
        launches: launches,
        launchpads: launchpads,
        rockets: rockets,
        payloads: payloads,
      });
    } catch (e) {
      console.error(e);
    } finally {
      set({ isLoading: false });
    }
  },
  filterLaunches: () => {
    const { launches, filter } = get();
    const from = filter.date_range?.from?.toISOString();
    const to = filter.date_range?.to?.toISOString();

    let filtered_launches: LaunchData[] = [];

    if (filter.status === all_launches) {
      if (!from || !to) return [];

      filtered_launches = launches.filter(
        (l) => l.date_utc >= from && l.date_utc <= to
      );
    }
    if (filter.status === upcoming_launches) {
      if (!from || !to) return [];
      filtered_launches = launches.filter(
        (l) => l.upcoming && l.date_utc >= from && l.date_utc <= to
      );
    }
    if (filter.status === successful_launches) {
      if (!from || !to) return [];
      filtered_launches = launches.filter(
        (l) => l.success && l.date_utc >= from && l.date_utc <= to
      );
    }
    if (filter.status === failed_launches) {
      if (!from || !to) return [];
      filtered_launches = launches.filter(
        (l) =>
          !l.success && !l.upcoming && l.date_utc >= from && l.date_utc <= to
      );
    }

    set({
      filtered_launches: filtered_launches,
    });
  },
}));
