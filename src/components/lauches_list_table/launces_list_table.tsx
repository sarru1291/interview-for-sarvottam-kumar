"use client";
import React, { useEffect, useState } from "react";
import { TableView } from "@/components/lauches_list_table/table_view";
import { launch_list_per_page } from "@/lib/constants";
import PaginationView from "@/components/lauches_list_table/pagination_view";
import getVisiblePages from "@/lib/pagination/get_visible_pages";
import { launches_list } from "@/lib/dummy_data/launches_list";

export default function LaunchesListTable() {
  const [current_page, setCurrentPage] = useState<number>(1);
  const [selected_launch_id, setSelectedLaunchID] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const paginated_launch_data = launches_list.slice(
    (current_page - 1) * launch_list_per_page,
    current_page * launch_list_per_page
  );

  const total_pages = Math.ceil(launches_list.length / launch_list_per_page);
  const visible_pages = getVisiblePages(current_page, total_pages);
  return (
    <div>
      <TableView
        isLoading={isLoading}
        launches_list={launches_list}
        paginated_launch_data={paginated_launch_data}
        setSelectedLaunchID={setSelectedLaunchID}
        current_page={current_page}
        launch_list_per_page={launch_list_per_page}
      />
      <PaginationView
        current_page={current_page}
        setCurrentPage={setCurrentPage}
        total_pages={total_pages}
        visible_pages={visible_pages}
      />
    </div>
  );
}
