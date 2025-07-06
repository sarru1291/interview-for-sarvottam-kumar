import { Badge } from "@/components/shadcn-ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn-ui/dialog";
import {
  flight_number_txt,
  launch_date_txt,
  launch_site_txt,
  manufacturer_txt,
  mission_name_txt,
  nationality_txt,
  orbit_txt,
  payload_type_txt,
  rocket_name_txt,
  rocket_type_txt,
  status_color,
} from "@/lib/constants";
import { LaunchDataDialogView } from "@/models/launch_data_view/launch_data_dialogview";
import { format } from "date-fns";
import Image from "next/image";
interface DialogViewProps {
  launch_detail: LaunchDataDialogView;
  is_open_dialog?: boolean;
  setIsOpenDialog?: (isOpen: boolean) => void;
}
export function DialogView({
  launch_detail,
  is_open_dialog,
  setIsOpenDialog,
}: DialogViewProps) {
  return (
    <Dialog open={is_open_dialog} onOpenChange={setIsOpenDialog}>
      <DialogContent className="max-w-[80vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            <div className="flex">
              <div>
                <Image
                  src={
                    launch_detail?.icon_patch_small &&
                    launch_detail?.icon_patch_small != ""
                      ? launch_detail.icon_patch_small
                      : "/placeholder.png"
                  }
                  alt="Mission Patch"
                  width={64}
                  height={64}
                  className="w-16 h-16 mr-4"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <div className="pr-4">{launch_detail.mission}</div>
                  <div>
                    {launch_detail.status ? (
                      <Badge
                        className={`px-2 rounded-full text-xs font-medium ${
                          status_color[launch_detail.status]
                        }`}
                      >
                        {launch_detail.status}
                      </Badge>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="text-sm font-normal">
                  {launch_detail.rocket_name}
                </div>
                <div className="text-sm font-normal flex mt-2">
                  <a
                    href={launch_detail.links?.article ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={"/nasa-icon.png"}
                      alt="Article Link"
                      width={18}
                      height={18}
                      className="mr-2"
                    />
                  </a>
                  <a
                    href={launch_detail.links?.wikipedia ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={"/wiki-icon.png"}
                      alt="Wikipedia Link"
                      width={18}
                      height={18}
                      className="mr-2"
                    />
                  </a>
                  <a
                    href={launch_detail.links?.webcast ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={"/webcast-icon.png"}
                      alt="Youtube Link"
                      width={18}
                      height={18}
                    />
                  </a>
                </div>
              </div>
            </div>
          </DialogTitle>
          <DialogDescription className="text-black">
            {launch_detail.details}{" "}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col text-sm">
          <div className="py-4 border-b-1 flex w-full">
            <div className="w-[40%] text-gray-500">{flight_number_txt}</div>
            <div className="w-[60%]">{launch_detail.flight_number ?? "-"}</div>
          </div>
          <div className="py-4 border-b-1 flex">
            <div className="w-[40%] text-gray-500">{mission_name_txt}</div>
            <div className="w-[60%]">{launch_detail.mission ?? "-"}</div>
          </div>
          <div className="py-4 border-b-1 flex">
            <div className="w-[40%] text-gray-500">{rocket_type_txt}</div>
            <div className="w-[60%]">{launch_detail.rocket_type ?? "-"}</div>
          </div>
          <div className="py-4 border-b-1 flex">
            <div className="w-[40%] text-gray-500">{rocket_name_txt}</div>
            <div className="w-[60%]">{launch_detail.rocket_name ?? "-"}</div>
          </div>
          <div className="py-4 border-b-1 flex">
            <div className="w-[40%] text-gray-500">{manufacturer_txt}</div>
            <div className="w-[60%]">{launch_detail.manufacturer ?? "-"}</div>
          </div>
          <div className="py-4 border-b-1 flex">
            <div className="w-[40%] text-gray-500">{nationality_txt}</div>
            <div className="w-[60%]">{launch_detail.nationality ?? "-"}</div>
          </div>
          <div className="py-4 border-b-1 flex">
            <div className="w-[40%] text-gray-500">{launch_date_txt}</div>
            <div className="w-[60%]">
              {launch_detail.date_utc
                ? format(launch_detail.date_utc, "dd MMMM yyyy 'at' HH:mm")
                : "-"}
            </div>
          </div>
          <div className="py-4 border-b-1 flex">
            <div className="w-[40%] text-gray-500">{payload_type_txt}</div>
            <div className="w-[60%]">{launch_detail.payload_type ?? "-"}</div>
          </div>
          <div className="py-4 border-b-1 flex">
            <div className="w-[40%] text-gray-500">{orbit_txt}</div>
            <div className="w-[60%]">{launch_detail.orbit ?? "-"}</div>
          </div>
          <div className="py-4 flex">
            <div className="w-[40%] text-gray-500">{launch_site_txt}</div>
            <div className="w-[60%]">{launch_detail.location ?? "-"}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
