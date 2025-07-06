"use client";
import React, { useEffect, useState } from "react";
import { TableView } from "@/components/lauches_list_table/table_view/table_view";
import { launch_list_per_page } from "@/lib/constants";
import PaginationView from "@/components/lauches_list_table/table_view/pagination_view";
import getVisiblePages from "@/lib/pagination/get_visible_pages";
import { launches_list } from "@/lib/dummy_data/launches_list";
import { DialogView } from "@/components/lauches_list_table/dialog_view/dialog_view";
import { launch_detail } from "@/lib/dummy_data/launch_data";

export default function LaunchesListTable() {
  const [current_page, setCurrentPage] = useState<number>(1);
  const [isTableViewLoading, setIsTableViewLoading] = useState(true);
  const [is_open_dialog, setIsOpenDialog] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsTableViewLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const paginated_launch_data = launches_list.slice(
    (current_page - 1) * launch_list_per_page,
    current_page * launch_list_per_page
  );

  const total_pages = Math.ceil(launches_list.length / launch_list_per_page);
  const visible_pages = getVisiblePages(current_page, total_pages);

  const viewLaunchDetail = (launch_id: number) => {
    console.log(launch_id);
    setIsOpenDialog(true);
  };
  return (
    <div>
      <TableView
        isLoading={isTableViewLoading}
        launches_list={launches_list}
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
        launch_detail={launch_detail}
      />
    </div>
  );
}
