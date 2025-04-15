import { useAppSelector, useAppDispatch } from "@/lib/storeHooks";
import {
  ArrowUpRightFromSquareIcon,
  Copy,
  EllipsisVerticalIcon,
  Trash2Icon,
} from "lucide-react";
import { deleteLinkFromDB, type LinkItemType } from "@/lib/linkSlice";
import { toast } from "sonner";
import { CreateSavedLinkDialog } from "./create-savedlink-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SavedLinks = () => {
  const savedLinks = useAppSelector((store) => store.links.items);

  const dispatch = useAppDispatch();

  const handleDelete = (item: LinkItemType) => {
    dispatch(deleteLinkFromDB(item));
  };

  const handleCopyLink = (link: string) => {
    toast.promise(navigator.clipboard.writeText(link), {
      loading: "Copying link...",
      success: "Link copied successfully",
      error: "Link could not be copied successfully",
    });
  };

  return (
    <div className="max-w-full h-full mt-4 space-y-4">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Saved Links</h1>
          <p>List of URLs saved in your Chrome extension.</p>
        </div>
        <div>
          <CreateSavedLinkDialog />
        </div>
      </div>
      <div>
        {Array.isArray(savedLinks) ? (
          // <ScrollArea className="">
          <ul className="h-48 overflow-y-auto scroll-smooth">
            {savedLinks.map((item) => (
              <>
                <li
                  key={item.tag}
                  className="border-b-green-800 border-b flex flex-col relative items-start justify-start group p-2 truncate text-start"
                >
                  <span className="text-black truncate max-w-[60%]">{item.tag}</span>
                  <span className="text-gray-400 truncate max-w-[60%]">
                    {item.link}
                  </span>
                  <span className="absolute top-0 right-0 bottom-0 p-2 gap-2 flex">
                    <button
                      onClick={() => window.open(item.link, "_blank")}
                      className="hover:cursor-pointer"
                      type="button"
                    >
                      <ArrowUpRightFromSquareIcon size={16} />
                    </button>
                    <button
                      onClick={() => handleCopyLink(item.link)}
                      className="hover:cursor-pointer"
                      type="button"
                    >
                      <Copy size={16} />
                    </button>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="hover:cursor-pointer">
                        <EllipsisVerticalIcon size={16} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => handleDelete(item)}
                          className="hover:cursor-pointer"
                        >
                          <Trash2Icon size={16} />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </span>
                </li>
              </>
            ))}
          </ul>
        ) : (
          // </ScrollArea>
          <p>Saved links not found</p>
        )}
      </div>
    </div>
  );
};

export { SavedLinks };
