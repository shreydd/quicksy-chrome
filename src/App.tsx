import { AppWindow, BoxIcon, LinkIcon } from "lucide-react";
import { ActiveTabs } from "./components/custom/active-tabs";
import { Collections } from "./components/custom/collections";
import { SavedLinks } from "./components/custom/saved-links";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Quicksy = () => {
  return (
    <div className="size-full min-w-3xl bg-gray-100 p-4 space-y-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold flex">
          <span className="">quick</span>
          <span className="inline bg-gradient-to-r from-green-500 via-green-400 to-lime-500 bg-clip-text text-transparent">
            sy
          </span>
        </h1>
        <p className="">Save links, manage tabs and move quick</p>
      </div>
      <Tabs defaultValue="collections" className="size-full">
        <TabsList className="gap-4 border-b-black rounded-none">
          <TabsTrigger value="collections">
            <BoxIcon size={16} />
            Collections
          </TabsTrigger>
          <TabsTrigger value="savedLinks">
            <LinkIcon size={16} />
            Saved links
          </TabsTrigger>
          <TabsTrigger value="activeTabs">
            <AppWindow size={16} />
            Active tabs
          </TabsTrigger>
        </TabsList>
        <TabsContent value="collections">
          <Collections />
        </TabsContent>
        <TabsContent value="savedLinks">
          <SavedLinks />
        </TabsContent>
        <TabsContent value="activeTabs">
          <ActiveTabs />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Quicksy;
