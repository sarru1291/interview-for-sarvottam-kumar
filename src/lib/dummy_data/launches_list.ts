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
  id: String(i + 1),
  date_utc: "2017-02-19T14:39:00.000Z",
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
