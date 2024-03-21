"use client";

import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { FormInput } from "./FormInput";
import FormSubmit from "./FormSubmit";
import { useAction } from "@/hooks/useAction";
import { createBoard } from "@/actions/createBoard";
import { toast } from 'sonner'
import FormPicker from "./FormPicker";
import { ElementRef, useRef } from "react";
import { useRouter } from "next/navigation";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const FormPopover = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}: FormPopoverProps) => {

  const closeRef = useRef<ElementRef<"button">>(null)
  const router = useRouter();

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log({ data });
      toast.success("Board created successfully");
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      console.log({ error });
      toast.error(error);
    }
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;

    execute({ title, image });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="lg:w-80 lg:left-0 lg:top-0 pt-3 ml-2 4xs:w-56 4xs:mr-4 md:mr-0 relative 4xs:top-[-40px] md:left-10  select-none"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-600">
          Create Board
        </div>
        <PopoverClose asChild ref={closeRef}>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 hover:bg-transparent hover:text-red-600"
            variant="ghost"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-5">
            <FormPicker 
              id='image'
              errors={fieldErrors}
            />
            <FormInput
              id="title"
              label="Board Title"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <FormSubmit
            className="w-full"
          >
            Create Board
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormPopover;
