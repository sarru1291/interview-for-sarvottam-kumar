import LaunchesListTable from "@/components/lauches_list_table/launces_list_table";
import SelectFilter from "@/components/select_filter/select_filter";

export default function Home() {
  return (
    <div className="pb-2">
      <SelectFilter />
      <LaunchesListTable />
    </div>
  );
}
