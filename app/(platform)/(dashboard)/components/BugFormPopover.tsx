"use client";

import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormInput } from "@/components/form/FormInput";
import FormSubmit from "@/components/form/FormSubmit";
import { useAction } from "@/hooks/useAction";
import { createBoard } from "@/actions/createBoard";
import { toast } from "sonner";
import { ElementRef, useRef, useState } from "react";
import { FormTextArea } from "@/components/form/FormTextarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEdgeStore } from "@/lib/edgestore";

interface BugFormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const BugFormPopover = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}: BugFormPopoverProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log({ data });
      toast.success("Report sent successfully");
      closeRef.current?.click();
    },
    onError: (error) => {
      console.log({ error });
      toast.error(error);
    },
  });

  const onSubmit = async (formData: FormData) => {
    if (file) {
      const edgeUpload = await edgestore.publicFiles.upload({
        file: file,
        options: {
          temporary: true,
        },
      });
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const description = formData.get("description") as string;

      try {
        const res = await fetch("/api/bug", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            description: description,
            screenshotURL: edgeUpload.url,
          }),
        });

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        toast.success("Report sent successfully");
        closeRef.current?.click();
      } catch (error) {
        console.error({ error });
      }
    }
  };

  const handleChange = (e: any) => {
    setFile(e.target.files?.[0]);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="lg:w-80 lg:left-0 lg:top-0 pt-3 ml-2 4xs:w-60 4xs:mr-4 md:mr-0 relative 4xs:top-[-40px] md:left-10  select-none"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-600">
          Bug report form
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
            <FormInput
              id="name"
              label="Name"
              type="text"
              required
              errors={fieldErrors}
            />
            <FormInput
              id="email"
              label="Email address"
              type="email"
              required
              errors={fieldErrors}
            />
            <FormTextArea
              id="description"
              label="Bug's description"
              errors={fieldErrors}
              required
            />
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Relevant screenshot</Label>
              <Input
                id="picture"
                type="file"
                accept=".png,.jpeg"
                onChange={handleChange}
              />
            </div>
          </div>
          <FormSubmit className="w-full">Send report</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default BugFormPopover;
