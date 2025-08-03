"use client";
import React, { useEffect, useState } from "react";
import { TableView } from "@/components/lauches_list_table/table_view/table_view";
import { launch_list_per_page } from "@/lib/constants";
import PaginationView from "@/components/lauches_list_table/table_view/pagination_view";
import getVisiblePages from "@/lib/pagination/get_visible_pages";
import { DialogView } from "@/components/lauches_list_table/dialog_view/dialog_view";
import { useLaunchDataStore } from "@/store/launch_data_store";
import { LaunchData } from "@/models/launch_data/launch_data";
import { Launchpad } from "@/models/launch_data/launchpad";
import { Payload } from "@/models/launch_data/payload";
import { Rocket } from "@/models/launch_data/rocket";
import { LaunchDataTableView } from "@/models/launch_data_view/launch_data_tableview";
import { LaunchDataDialogView } from "@/models/launch_data_view/launch_data_dialogview";

export default function LaunchesListTable() {
  const [current_page, setCurrentPage] = useState<number>(1);
  const [is_open_dialog, setIsOpenDialog] = useState(false);
  const [launch_list_tableview, setLaunchListTableView] = useState<
    LaunchDataTableView[]
  >([]);
  const [launch_data_dialogview, setLaunchDataDialogView] =
    useState<LaunchDataDialogView>({
      id: null,
      date_utc: null,
      mission: null,
      details: null,
      icon_patch_small: null,
      flight_number: null,
      rocket_type: null,
      rocket_name: null,
      manufacturer: null,
      nationality: null,
      location: null,
      orbit: null,
      payload_type: null,
      status: null,
      links: null,
    });
  const {
    launches,
    filtered_launches,
    rockets,
    launchpads,
    payloads,
    isLoading,
    fetchAllData,
    filterLaunches,
  } = useLaunchDataStore();
  // Retrieving the launch data from the store (API)
  useEffect(() => {
    fetchAllData();
    filterLaunches();
  }, [fetchAllData, filterLaunches]);

  // Restructuring the launch data to match the LaunchDataTableView model
  useEffect(() => {
    const tableview_data: LaunchDataTableView[] = filtered_launches.map(
      (launch: LaunchData) => {
        const rocket = rockets.find((r: Rocket) => r.id === launch.rocket);
        const launchpad = launchpads.find(
          (lp: Launchpad) => lp.id === launch.launchpad
        );
        const payload = payloads.find(
          (p: Payload) => p.id === launch.payloads?.[0]
        );
        // Fill in all required fields for LaunchDataTableView
        return {
          id: launch.id,
          mission_name: launch.name,
          launch_date: launch.date_utc,
          rocket_name: rocket ? rocket.name : "",
          launchpad_name: launchpad ? launchpad.name : "",
          payload_name: payload ? payload.name : "",
          status: launch.upcoming
            ? "Upcoming"
            : launch.success
            ? "Success"
            : "Failed",
          // Add missing required fields with fallback values if necessary
          date_utc: launch.date_utc,
          location: launchpad?.name || "",
          mission: launch.name,
          orbit: payload?.orbit || "",
          rocket: rocket?.name || "",
        };
      }
    );
    setLaunchListTableView(tableview_data);
  }, [rockets, launchpads, payloads, filtered_launches]);

  const paginated_launch_data = launch_list_tableview.slice(
    (current_page - 1) * launch_list_per_page,
    current_page * launch_list_per_page
  );

  const total_pages = Math.ceil(
    launch_list_tableview.length / launch_list_per_page
  );
  const visible_pages = getVisiblePages(current_page, total_pages);

  const viewLaunchDetail = (launch_id: string) => {
    setIsOpenDialog(true);
    const launch = launches.find((l: LaunchData) => l.id === launch_id);
    if (!launch) return;
    const rocket = rockets.find((r: Rocket) => r.id === launch.rocket);
    const launchpad = launchpads.find(
      (lp: Launchpad) => lp.id === launch.launchpad
    );
    const payload = payloads.find(
      (p: Payload) => p.id === launch.payloads?.[0]
    );
    const dialogview_data: LaunchDataDialogView = {
      id: launch.id,
      mission: launch.name,
      date_utc: launch.date_utc,
      rocket_name: rocket ? rocket.name : "",
      rocket_type: rocket ? rocket.type : "",
      manufacturer: rocket ? rocket.company : "",
      nationality: rocket ? rocket.country : "",
      links: launch.links,
      icon_patch_small: launch.links.patch?.small || "",
      flight_number: launch.flight_number || null,
      status: launch.upcoming
        ? "Upcoming"
        : launch.success
        ? "Success"
        : "Failed",
      details: launch.details || "",
      location: launchpad?.name || "-",
      orbit: payload?.orbit || "-",
      payload_type: payload?.type || "-",
    };
    setLaunchDataDialogView(dialogview_data);
  };

  return (
    <div>
      <TableView
        isLoading={isLoading}
        launches_list={launch_list_tableview}
        paginated_launch_data={paginated_launch_data}
        viewLaunchDetail={viewLaunchDetail}
        current_page={current_page}
        launch_list_per_page={launch_list_per_page}
      />
      <PaginationView
        current_page={current_page}
        setCurrentPage={setCurrentPage}
        total_pages={total_pages}
        visible_pages={visible_pages}
      />
      {/* Dialog View only visibile when table row is clicked */}
      <DialogView
        is_open_dialog={is_open_dialog}
        setIsOpenDialog={setIsOpenDialog}
        launch_detail={launch_data_dialogview}
      />
    </div>
  );
}
