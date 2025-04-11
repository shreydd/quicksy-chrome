// import React from "react";
import { useAppSelector, useAppDispatch } from "@/lib/storeHooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ArrowUpRightFromSquareIcon,
  Copy,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { addLinkToDB, deleteLinkFromDB, LinkItemType } from "@/lib/linkSlice";

const SavedLinks = () => {
  const [userInput, setUserInput] = useState<{ tag: string; link: string }>({
    tag: "",
    link: "",
  });
  const savedLinks = useAppSelector((store) => store.links.items);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setUserInput((prevInput) => ({ ...prevInput, [id]: value }));
  };

  const dispatch = useAppDispatch();

  const addLinkToStore = () => {
    dispatch(addLinkToDB(userInput));
  };

  const handleDelete = (item: LinkItemType) => {
    dispatch(deleteLinkFromDB(item));
  };

  return (
    <Card className="max-w-full">
      <CardHeader>
        <CardTitle>
          <h1 className="text-2xl font-semibold">Saved Links</h1>
        </CardTitle>
        <CardDescription>
          <p>List of URLs saved in your Chrome extension.</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {Array.isArray(savedLinks) ? (
          <ul className="space-y-2 max-h-44 overflow-y-auto scroll-smooth">
            {savedLinks.map((item) => (
              <li
                key={item.tag}
                className="text-gray-700 border border-gray-200 relative flex items-start justify-start w-full group p-2 rounded hover:bg-white truncate text-start"
              >
                {item.tag}
                <span className="absolute top-0 right-0 bottom-0 group-hover:bg-gradient-to-r group-hover:from-transparent group-hover:via-blue-100 group-hover:to-blue-200 rounded p-2 gap-2 hidden group-hover:flex">
                  <button
                    onClick={() => window.open(item.link, "_blank")}
                    className="hover:cursor-pointer"
                  >
                    <ArrowUpRightFromSquareIcon size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="hover:cursor-pointer"
                  >
                    <Trash2Icon size={16} />
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(item.link)}
                    className="hover:cursor-pointer"
                  >
                    <Copy size={16} />
                  </button>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Saved links not found</p>
        )}
        <div className="flex justify-end mt-6">
          <Dialog>
            <DialogTrigger className="hover:cursor-pointer rounded-full p-1 bg-primary">
              <PlusIcon size={16} color="white" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a link</DialogTitle>
                <DialogDescription>
                  Store a link with a tag name.
                </DialogDescription>
                <div className="grid gap-4 py-4">
                  <div className="flex items-center gap-4">
                    <Label htmlFor="tag" className="text-right">
                      Tag
                    </Label>
                    <Input
                      id="tag"
                      value={userInput?.tag}
                      className=""
                      type="text"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <Label htmlFor="link" className="text-right">
                      Link
                    </Label>
                    <Input
                      id="link"
                      value={userInput.link}
                      className=""
                      type="url"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={addLinkToStore} type="submit">
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export { SavedLinks };
