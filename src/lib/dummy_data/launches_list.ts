import { LaunchDataTableView } from "@/models/launch_data_view/launch_data_tableview";
import {
  status_failed,
  status_success,
  status_upcoming,
} from "@/lib/constants";

const no_of_data = 90;
export const launches_list: LaunchDataTableView[] = Array.from({
  length: no_of_data,
}).map((_, i) => ({
  id: i + 1,
  date_utc: "24 March 2006 at 22:30",
  location: "Kwajalein Atoll",
  mission: `Mission ${i + 1}`,
  orbit: "LEO",
  status:
    i % 3 === 0
      ? status_failed
      : i % 3 === 1
      ? status_success
      : status_upcoming,
  rocket: "Falcon 9",
}));
