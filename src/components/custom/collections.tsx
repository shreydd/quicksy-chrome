// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { PlusIcon } from "lucide-react";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { useState } from "react";
// import { Button } from "../ui/button";
// import { toast } from "sonner";
// import { addCollectionToDB, type Collection } from "@/lib/collectionSlice";
// import { useAppDispatch } from "@/lib/storeHooks";


// const Collections = () => {
//   const [collections, setCollections] = useState<Collection[]>([]);
//   const [newLink, setNewLink] = useState<string>("");
//   const [newCollection, setNewCollection] = useState<Omit<Collection, "links">>({
//     title: "",
//     description: "",
//   });
//   const [currentLinks, setCurrentLinks] = useState<string[]>([]);

//   const dispatch = useAppDispatch();

//   const openLinkGroup = (links: string[]) => {
//     if (links && links.length > 0) {
//       chrome.windows.create({ url: links });
//     } else {
//       // Optionally handle the case where there are no links
//       console.warn("No links to open.");
//     }
//   };

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { id, value } = event.target;
//     if (id === "newCollectionTitle") {
//       setNewCollection((prev) => ({ ...prev, title: value }));
//     } else if (id === "newCollectionDesc") {
//       setNewCollection((prev) => ({ ...prev, description: value }));
//     } else if (id === "newLink") {
//       setNewLink(value);
//     }
//   };

//   const handleAddLink = () => {
//     if (newLink.trim() !== "") {
//       setCurrentLinks((prevLinks) => [...prevLinks, newLink.trim()]);
//       setNewLink("");
//     }
//   };

//   const handleCreateCollection = () => {
//     if (newCollection.title.trim() !== "" && currentLinks.length > 0) {
//       const newCollectionObject: Collection = {
//         ...newCollection,
//         links: currentLinks,
//       };
//       setCollections((prevCollections) => [...prevCollections, newCollectionObject]);
//       dispatch(addCollectionToDB(newCollectionObject))
//       setNewCollection({ title: "", description: "" });
//       setCurrentLinks([]);
//     } else {
//       // Optionally handle cases where title is missing or no links are added
//       toast("Please add a title and at least one link to create a collection.");
//     }
//   };

//   return (
//     <section className="col-span-full">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-2xl font-semibold">Collections</CardTitle>
//           <CardDescription>
//             Grouped links for easier context switching
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="grid grid-cols-3 gap-4">
//           {collections.map((collection) => (
//             <Card
//               key={collection.title}
//               onClick={() => openLinkGroup(collection.links)}
//               className="cursor-pointer"
//             >
//               <CardHeader>
//                 <CardTitle>{collection.title}</CardTitle>
//                 <CardDescription>{collection.description}</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 {collection.links.map((link) => (
//                   <p key={link} className="truncate">
//                     {link}
//                   </p>
//                 ))}
//               </CardContent>
//               <CardFooter>
//                 <p>Click to open {collection.links.length} links</p>
//               </CardFooter>
//             </Card>
//           ))}
//         </CardContent>
//         <CardFooter>
//           <Dialog>
//             <DialogTrigger className="hover:cursor-pointer rounded-full p-1 bg-primary">
//               <PlusIcon size={16} color="white" />
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Add a collection of links</DialogTitle>
//                 <DialogDescription>
//                   Group a collection of links and be able to open them together
//                   in a separate window, helps with context switching
//                 </DialogDescription>
//               </DialogHeader>
//               <div className="grid gap-6 py-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="newCollectionTitle" className="">
//                     Collection title
//                   </Label>
//                   <Input
//                     id="newCollectionTitle"
//                     value={newCollection.title}
//                     className=""
//                     type="text"
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="newCollectionDesc" className="">
//                     Collection description
//                   </Label>
//                   <Input
//                     id="newCollectionDesc"
//                     value={newCollection.description}
//                     className=""
//                     type="textarea"
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="newLink" className="">
//                     Link
//                   </Label>
//                   <div className="flex gap-2">
//                     <Input
//                       id="newLink"
//                       value={newLink}
//                       className=""
//                       type="url"
//                       onChange={handleInputChange}
//                     />
//                     <Button onClick={handleAddLink}>Add</Button>
//                   </div>
//                 </div>
//                 {currentLinks.length > 0 && (
//                   <div className="space-y-2">
//                     <Label>Current Links:</Label>
//                     {currentLinks.map((link) => (
//                       <p key={link} className="truncate">
//                         {link}
//                       </p>
//                     ))}
//                   </div>
//                 )}
//               </div>
//               <DialogFooter>
//                 <Button type="button" onClick={handleCreateCollection}>
//                   Create Collection
//                 </Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </CardFooter>
//       </Card>
//     </section>
//   );
// };

// export { Collections };

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import {
  addCollectionToDB,
  deleteCollectionFromDB,
  type CollectionItemType as Collection, // Alias for clarity
  initializeCollectionsFromDB,
} from "@/lib/collectionSlice";
import { useAppDispatch, useAppSelector } from "@/lib/storeHooks";

const Collections = () => {
  const collections = useAppSelector((state) => state.collections.items);
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

  useEffect(() => {
    // Dispatch the initialization thunk on component mount
    dispatch(initializeCollectionsFromDB());
  }, [dispatch]);

  const openLinkGroup = (links: string[]) => {
    if (links && links.length > 0) {
      chrome.windows.create({ url: links });
    } else {
      toast.warning("This collection has no links to open.");
    }
  };

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
        toast.success(`Collection "${newCollection.title}" created successfully!`);
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

  const handleDeleteCollection = (collection: Collection) => {
    dispatch(deleteCollectionFromDB(collection)).then(() => {
      toast.success(`Collection "${collection.title}" deleted successfully!`);
    });
  };

  return (
    <section className="col-span-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Collections</CardTitle>
          <CardDescription>
            Grouped links for easier context switching
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          {collections.map((collection) => (
            <div key={collection.id} className="relative">
              <Card
                onClick={() => openLinkGroup(collection.links)}
                className="cursor-pointer"
              >
                <CardHeader>
                  <CardTitle>{collection.title}</CardTitle>
                  <CardDescription>{collection.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {collection.links.map((link) => (
                    <p key={link} className="truncate">
                      {link}
                    </p>
                  ))}
                </CardContent>
                <CardFooter>
                  <p>Click to open {collection.links.length} links</p>
                </CardFooter>
              </Card>
              {/* Basic delete button - consider a more visually appealing UI */}
              <button
                onClick={() => handleDeleteCollection(collection)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                type="button"
              >
                <Trash2Icon size={16} />
              </button>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger className="hover:cursor-pointer rounded-full p-1 bg-primary">
              <PlusIcon size={16} color="white" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a collection of links</DialogTitle>
                <DialogDescription>
                  Group a collection of links and be able to open them together
                  in a separate window, helps with context switching
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
                  <div className="space-y-2">
                    <Label>Current Links:</Label>
                    {currentLinks.map((link) => (
                      <p key={link} className="truncate">
                        {link}
                      </p>
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
        </CardFooter>
      </Card>
    </section>
  );
};

export { Collections };