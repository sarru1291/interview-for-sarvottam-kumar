import { Core } from "@/models/launch_data/core";
import { CrewMember } from "@/models/launch_data/crew_member";
import { Failure } from "@/models/launch_data/failure";
import { Fairings } from "@/models/launch_data/fairings";
import { Links } from "@/models/launch_data/links";

export interface LaunchData {
  id: string;
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: "half" | "quarter" | "year" | "month" | "day" | "hour";
  static_fire_date_utc?: string | null;
  static_fire_date_unix?: number | null;
  tbd?: boolean;
  net?: boolean;
  window?: number | null;
  rocket?: string | null;
  success?: boolean | null;
  failures?: Failure[];
  upcoming: boolean;
  details?: string | null;
  fairings?: Fairings | null;
  crew?: CrewMember[];
  ships?: string[];
  capsules?: string[];
  payloads?: string[];
  launchpad?: string | null;
  cores?: Core[];
  links: Links;
  auto_update?: boolean;
  launch_library_id?: string | null;
}
