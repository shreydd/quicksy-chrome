import React from "react";
import { ArrowRightFromLineIcon } from "lucide-react";
// import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

const ActiveTabs = () => {
  const [activeTabs, setActiveTabs] = React.useState<chrome.tabs.Tab[]>([]);

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.chrome?.tabs) {
      window.chrome.tabs.query({ currentWindow: true }, (tabs) => {
        setActiveTabs(tabs);
      });
    }
  }, []);

  return (
    <Card className="max-w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Open Tabs</CardTitle>
        <CardDescription>
          List of URLs for tabs currently open in your Chrome window.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {activeTabs.length > 0 ? (
          <ul className="space-y-2">
            {activeTabs.map((tab, index) => (
              //   <Button variant={"outline"} asChild>
              <li
                key={index}
                className="text-gray-700 border border-gray-200 relative flex items-start justify-start w-full group p-2 rounded hover:bg-white truncate text-start"
              >
                {tab.title}
                <span className="absolute top-0 right-0 bottom-0 group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-gray-100 group-hover:to-gray-200 rounded p-2 gap-2 hidden group-hover:flex">
                  {/* replace this with switch to tab */}
                  <button
                    className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                    type="button"
                    onClick={() => {
                      if (tab.id !== undefined) {
                        window.chrome.tabs.update(tab.id, { active: true });
                      }
                    }}
                  >
                    <ArrowRightFromLineIcon size={16} />
                  </button>
                </span>
              </li>
              //   </Button>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">
            No tabs found / Not in a chrome extension environment
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export { ActiveTabs };
