// Meta Information
export const company_name = "SpaceX";
export const description = "Interview for Sarvottam Kumar";

// Filter Selection - Date Range
export const date_range_dialog_title = "Select Date Range";
export const date_range_dialog_description = "Select Date Range for Launches";
export const display_no_of_calendar = 2;
export const past_week = "Past week";
export const past_month = "Past month";
export const past_three_months = "Past 3 months";
export const past_six_months = "Past 6 months";
export const past_year = "Past year";
export const past_two_years = "Past 2 years";
export const default_date_days_ago = 180; // Default to 6 months ago

// Filter Selection - Status
export const select_status_txt = "Select Status";
export const all_launches = "All Launches";
export const upcoming_launches = "Upcoming Launches";
export const successful_launches = "Successful Launches";
export const failed_launches = "Failed Launches";

// Launch Data - Status
export const status_success = "Success";
export const status_failed = "Failed";
export const status_upcoming = "Upcoming";
export const status_color: Record<string, string> = {
  Success: "bg-green-100 text-green-800",
  Failed: "bg-red-100 text-red-800",
  Upcoming: "bg-yellow-100 text-yellow-800",
};

// Launch Data - Table View
export const table_head_no = "No:";
export const table_head_launched = "Launched (UTC)";
export const table_head_location = "Location";
export const table_head_mission = "Mission";
export const table_head_orbit = "Orbit";
export const table_head_launch_status = "Launch Status";
export const table_head_rocket = "Rocket";
export const no_launches_found = "No result found for the specified filter.";
export const no_of_col = 7;
export const launch_list_per_page = 10;

// Launch Data - Dialog View
export const flight_number_txt = "Flight Number";
export const mission_name_txt = "Mission Name";
export const rocket_type_txt = "Rocket Type";
export const rocket_name_txt = "Rocket Name";
export const manufacturer_txt = "Rocket Manufacturer";
export const nationality_txt = "Nationality";
export const launch_date_txt = "Launch Date";
export const payload_type_txt = "Payload Type";
export const orbit_txt = "Orbit";
export const launch_site_txt = "Launch Site";

// Breakpoints - width in pixels
export const breakpoints = {
  sm: 640, // for small screens
  md: 768, // for medium screens
  lg: 1024, // for large screens
  xl: 1280, // for extra large screens
};
