import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { addCollectionToDB, type Collection } from "@/lib/collectionSlice";
import { useAppDispatch } from "@/lib/storeHooks";
import { toast } from "sonner";

const CreateCollectionDialog = () => {
  const dispatch = useAppDispatch();

  const [newLink, setNewLink] = useState<string>("");
  const [newCollection, setNewCollection] = useState<
    Omit<Collection, "links" | "id">
  >({
    title: "",
    description: "",
  });
  const [currentLinks, setCurrentLinks] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    if (id === "newCollectionTitle") {
      setNewCollection((prev) => ({ ...prev, title: value }));
    } else if (id === "newCollectionDesc") {
      setNewCollection((prev) => ({ ...prev, description: value }));
    } else if (id === "newLink") {
      setNewLink(value);
    }
  };

  const handleAddLink = () => {
    if (newLink.trim() !== "") {
      setCurrentLinks((prevLinks) => [...prevLinks, newLink.trim()]);
      setNewLink("");
    }
  };

  const handleCreateCollection = () => {
    if (newCollection.title.trim() !== "" && currentLinks.length > 0) {
      const newCollectionObject: Omit<Collection, "id"> = {
        ...newCollection,
        links: currentLinks,
      };
      dispatch(addCollectionToDB(newCollectionObject)).then(() => {
        toast.success(
          `Collection "${newCollection.title}" created successfully!`
        );
        setNewCollection({ title: "", description: "" });
        setCurrentLinks([]);
        setIsDialogOpen(false); // Close the dialog after successful creation
      });
    } else {
      toast.error(
        "Please provide a title and at least one link for the collection."
      );
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="hover:cursor-pointer rounded-full p-1 bg-primary">
        <PlusIcon size={16} color="white" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a collection of links</DialogTitle>
          <DialogDescription>
            Group a collection of links and be able to open them together in a
            separate window, helps with context switching
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="newCollectionTitle" className="">
              Collection title
            </Label>
            <Input
              id="newCollectionTitle"
              value={newCollection.title}
              className=""
              type="text"
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newCollectionDesc" className="">
              Collection description
            </Label>
            <Input
              id="newCollectionDesc"
              value={newCollection.description}
              className=""
              type="textarea"
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newLink" className="">
              Link
            </Label>
            <div className="flex gap-2">
              <Input
                id="newLink"
                value={newLink}
                className=""
                type="url"
                onChange={handleInputChange}
              />
              <Button onClick={handleAddLink}>Add</Button>
            </div>
          </div>
          {currentLinks.length > 0 && (
            <div className="space-y-2 container flex h-24 overflow-y-auto scroll-smooth flex-row flex-wrap gap-x-2 gap-y-0.5">
              <Label>Current Links:</Label>
              {currentLinks.map((link) => (
                <span
                  key={link}
                  className="line-clamp-1 bg-green-500 rounded-full text-white px-2 size-fit py-0.5"
                >
                  {link}
                </span>
              ))}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleCreateCollection}>
            Create Collection
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { CreateCollectionDialog };
