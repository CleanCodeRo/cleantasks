import { Button } from "@/components/ui/button";
import { BugIcon } from "lucide-react";
import React from "react";
import BugFormPopover from "./BugFormPopover";

const BugButton = () => {
  return (
    <div>
      <BugFormPopover align="start" side="top" sideOffset={18}>
        <Button
          className="flex justify-center bg-blue-950 hover:bg-blue-400"
        >
          Report a bug <BugIcon className="ml-2 h-5 w-5" />
        </Button>
      </BugFormPopover>
    </div>
  );
};

export default BugButton;
