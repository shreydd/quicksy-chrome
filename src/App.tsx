import { ActiveTabs } from "./components/custom/active-tabs";
import { SavedLinks } from "./components/custom/saved-links";

const Quicksy = () => {

  return (
    <div className="size-full min-w-3xl grid grid-cols-2 gap-2 bg-gray-100 items-center justify-center p-4">
      <ActiveTabs />
      <SavedLinks />
    </div>
  );
};

export default Quicksy;
