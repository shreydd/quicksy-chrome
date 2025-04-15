import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLinkIcon, Trash2Icon } from "lucide-react";
import { useEffect } from "react";
// import { Button } from "../ui/button";
import { toast } from "sonner";
import {
  deleteCollectionFromDB,
  type CollectionItemType as Collection,
  initializeCollectionsFromDB,
} from "@/lib/collectionSlice";
import { useAppDispatch, useAppSelector } from "@/lib/storeHooks";
import { CreateCollectionDialog } from "./create-collection-dialog";

const Collections = () => {
  const collections = useAppSelector((state) => state.collections.items);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeCollectionsFromDB());
  }, [dispatch]);

  const openLinkGroup = (links: string[]) => {
    if (links && links.length > 0) {
      chrome.windows.create({ url: links });
    } else {
      toast.warning("This collection has no links to open.");
    }
  };

  const handleDeleteCollection = (collection: Collection) => {
    dispatch(deleteCollectionFromDB(collection)).then(() => {
      toast.success(`Collection "${collection.title}" deleted successfully!`);
    });
  };

  return (
    <section className="mt-4 h-screen">
      <div className="space-y-4">
        <div className="flex justify-between">
          <div className="">
            <div className="text-2xl font-semibold">Collections</div>
            <div>Grouped links for easier context switching</div>
          </div>
          <div className="">
            <CreateCollectionDialog />
          </div>
        </div>
        <div className="space-y-4 grid grid-cols-2 gap-3">
          {collections.map((collection) => (
            <div key={collection.id} className="relative size-full">
              <Card className="size-full border-0 pb-0">
                <CardHeader>
                  <CardTitle>{collection.title}</CardTitle>
                  <CardDescription>{collection.description}</CardDescription>
                </CardHeader>
                <CardFooter className="bg-green-300 mt-auto rounded-b-lg p-2 flex flex-col items-center justify-center border-b-green-300">
                  <button
                    type="button"
                    onClick={() => openLinkGroup(collection.links)}
                    className="flex gap-1"
                  >
                    Open {collection.links.length} link
                    {collection.links.length !== 1 ? "s" : ""}
                    <ExternalLinkIcon size={16} />
                  </button>
                </CardFooter>
              </Card>
              {/* Basic delete button - consider a more visually appealing UI */}
              <button
                onClick={() => handleDeleteCollection(collection)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 hover:cursor-pointer"
                type="button"
              >
                <Trash2Icon size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Collections };
