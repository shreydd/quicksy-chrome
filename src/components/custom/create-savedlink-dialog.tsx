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
import { toast } from "sonner";
import { useAppDispatch } from "@/lib/storeHooks";
import { addLinkToDB } from "@/lib/linkSlice";
import { useState } from "react";

const CreateSavedLinkDialog = () => {
  const [userInput, setUserInput] = useState<{ tag: string; link: string }>({
    tag: "",
    link: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setUserInput((prevInput) => ({ ...prevInput, [id]: value }));
  };

  const dispatch = useAppDispatch();

  const addLinkToStore = () => {
    toast.promise(dispatch(addLinkToDB(userInput)), {
      success: "Link added successfully!",
      error: "Error! link was not saved.",
    });
  };
  return (
    <Dialog>
      <DialogTrigger className="hover:cursor-pointer rounded-full p-1 bg-primary">
        <PlusIcon size={16} color="white" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a link</DialogTitle>
          <DialogDescription>Store a link with a tag name.</DialogDescription>
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
  );
};

export { CreateSavedLinkDialog };
