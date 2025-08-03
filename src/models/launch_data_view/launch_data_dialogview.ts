import { Links } from "@/models/launch_data/links";

export interface LaunchDataDialogView {
  id: string | null;
  date_utc: string | null;
  mission: string | null;
  details?: string | null;
  icon_patch_small?: string | null;
  flight_number: number | null;
  manufacturer?: string | null;
  nationality?: string | null;
  rocket_type?: string | null;
  rocket_name?: string | null;
  location?: string | null;
  orbit: string | null;
  payload_type: string | null;
  status: string | null;
  links: Links | null;
}
