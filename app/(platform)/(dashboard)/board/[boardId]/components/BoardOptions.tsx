'use client'
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { Cog, Trash, X } from "lucide-react";
import { deleteBoard } from "@/actions/deleteBoard";
import { useAction } from "@/hooks/useAction";
import { toast } from "sonner";

interface BoardOptionsProps {
  id: string;
}

const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { execute, isLoading } = useAction(deleteBoard ,
    {
      onError: (error) => {
        toast.error(error);
      },
    }
  );


  const onDelete = () => {
    execute({ id });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="transparent">
          <Cog className="h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Board Actions
        </div>
        <PopoverClose asChild>
          <Button
            variant="ghost"
            className="h-auto w-auto p-2 absolute top-2 right-2"
          >
            <X className="h-4 w-4 text-neutral-700 hover:text-red-500" />
          </Button>
        </PopoverClose>
        <Button
          variant="ghost"
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm hover:text-red-600 hover:bg-white/55"
          disabled={isLoading}
          onClick={onDelete}
        >
          Delete Board
          <Trash className="h-4 w-4 ml-auto" />
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default BoardOptions;
