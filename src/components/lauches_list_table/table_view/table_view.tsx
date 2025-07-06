import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn-ui/table";
import { Skeleton } from "@/components/shadcn-ui/skeleton";
import { Badge } from "@/components/shadcn-ui/badge";
import {
  no_launches_found,
  no_of_col,
  status_color,
  table_head_launch_status,
  table_head_launched,
  table_head_location,
  table_head_mission,
  table_head_no,
  table_head_orbit,
  table_head_rocket,
} from "@/lib/constants";
import { LaunchDataTableView } from "@/models/launch_data_view/launch_data_tableview";

interface TableViewProps {
  isLoading: boolean;
  launches_list: LaunchDataTableView[];
  paginated_launch_data: LaunchDataTableView[];
  viewLaunchDetail: (id: string) => void;
  current_page: number;
  launch_list_per_page: number;
}
export function TableView({
  isLoading,
  launches_list,
  paginated_launch_data,
  viewLaunchDetail,
  current_page,
  launch_list_per_page,
}: TableViewProps) {
  return (
    <div className="rounded-md border overflow-x-auto w-[90vw] max-h-150 min-h-150 md:w-[60vw] m-auto flex justify-center">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>{table_head_no}</TableHead>
            <TableHead>{table_head_launched}</TableHead>
            <TableHead>{table_head_location}</TableHead>
            <TableHead>{table_head_mission}</TableHead>
            <TableHead>{table_head_orbit}</TableHead>
            <TableHead>{table_head_launch_status}</TableHead>
            <TableHead>{table_head_rocket}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={no_of_col}>
                <div className="space-y-4">
                  {[...Array(launch_list_per_page)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ) : launches_list.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={no_of_col}>
                <div className="text-center text-muted-foreground mt-5">
                  {no_launches_found}
                </div>
              </TableCell>
            </TableRow>
          ) : (
            paginated_launch_data.map((launch, index) => (
              <TableRow
                key={launch.id}
                className="cursor-pointer hover:bg-muted border-b-0"
                onClick={() => viewLaunchDetail(launch.id)}
              >
                <TableCell className="py-4">
                  {index + 1 + (current_page - 1) * launch_list_per_page}
                </TableCell>
                <TableCell className="py-4">{launch.date_utc || "-"}</TableCell>
                <TableCell className="py-4">{launch.location || "-"}</TableCell>
                <TableCell className="py-4">{launch.mission || "-"}</TableCell>
                <TableCell className="py-4">{launch.orbit || "-"}</TableCell>
                <TableCell className="py-4">
                  {launch.status ? (
                  <Badge
                    className={`px-2 rounded-full text-xs font-medium ${
                    status_color[launch.status]
                    }`}
                  >
                    {launch.status}
                  </Badge>
                  ) : (
                  "-"
                  )}
                </TableCell>
                <TableCell className="py-4">{launch.rocket || "-"}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
