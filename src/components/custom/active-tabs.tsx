import React from "react";
import { ArrowRightFromLineIcon, Copy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ActiveTabs = () => {
  const [activeTabs, setActiveTabs] = React.useState<chrome.tabs.Tab[]>([]);

  const handleCopyLink = (link: string) => {
    toast.promise(navigator.clipboard.writeText(link), {
      loading: "Copying link...",
      success: "Link copied successfully",
      error: "Link could not be copied successfully",
    });
  };

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.chrome?.tabs) {
      window.chrome.tabs.query({ currentWindow: true }, (tabs) => {
        setActiveTabs(tabs);
      });
    }
  }, []);

  return (
    <div className="max-w-full h-screen mt-4 space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Open Tabs</h1>
        <p>List of URLs for tabs currently open in your Chrome window.</p>
      </div>
      <div>
        {activeTabs.length > 0 ? (
          <ul className="">
            {activeTabs.map((tab, index) => (
                <li
                key={tab.id}
                className={cn(
                  "flex flex-col relative items-start justify-start group p-2 truncate text-start",
                  index !== activeTabs.length - 1 && "border-b border-b-green-800"
                )}
                >
                <span className="text-black truncate max-w-[60%]">{tab.title}</span>
                <span className="text-gray-400 truncate max-w-[60%]">
                  {tab.url}
                </span>
                <span className="absolute top-0 right-0 bottom-0 p-2 gap-2 flex">
                  <button
                    className="hover:cursor-pointer"
                    type="button"
                    onClick={() => {
                      if (tab.id !== undefined) {
                        window.chrome.tabs.update(tab.id, { active: true });
                      }
                    }}
                  >
                    <ArrowRightFromLineIcon size={16} />
                  </button>
                  {tab.url && tab.url?.length > 0 && (
                    <button
                      onClick={() => tab.url && handleCopyLink(tab.url)}
                      className="hover:cursor-pointer"
                      type="button"
                    >
                      <Copy size={16} />
                    </button>
                  )}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">
            No tabs found / Not in a chrome extension environment
          </p>
        )}
      </div>
    </div>
  );
};

export { ActiveTabs };
