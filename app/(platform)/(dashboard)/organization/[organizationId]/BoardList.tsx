import { HelpCircle, User2 } from "lucide-react";
import React from "react";
import Hint from "./components/Hint";
import FormPopover from "@/components/form/FormPopover";

const BoardList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your Boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <FormPopover sideOffset={10} side="bottom">
            <div
              role="button"
              className="
              bg-neutral-200 aspect-video relative h-full w-full 
              bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center 
              hover:opacity-75 transition"
            >
              <p className="text-sm">Create New Board</p>
              <span className="text-xs">10 remaining</span>
              <Hint
                sideOffset={40}
                description={`
                    Free Workspaces have a limit of 10 boards.
                    Upgrade to a paid plan to create more boards.
                `}
              >
                <HelpCircle className="absolute bottom-2 right-2 h-4 w-4" />
              </Hint>
            </div>
        </FormPopover>
      </div>
    </div>
  );
};

export default BoardList;
