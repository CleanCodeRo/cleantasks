"use client";
import { updateCard } from "@/actions/updateCard";
import FormSubmit from "@/components/form/FormSubmit";
import { FormTextArea } from "@/components/form/FormTextarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/useAction";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface DescriptionProps {
  data: CardWithList;
}

const Description = ({ data }: DescriptionProps) => {
  const queryClient = useQueryClient();
  const params = useParams();

  const [isEditing, setIsEditing] = useState(false);

  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const fomRef = useRef<ElementRef<"form">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(fomRef, disableEditing);

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      toast.success(`Updated card description`);
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
        disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const description = formData.get("description") as string;
    const boardId = params.boardId as string;

    execute({
      id: data.id,
      description,
      boardId,
    });
  };

  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Description</p>
        {isEditing ? (
          <form ref={fomRef} className="space-y-2" action={onSubmit}>
            <FormTextArea
              id="description"
              className="w-full mt-2 bg-white/40 border-none"
              placeholder="Add a more detailed description..."
              defaultValue={data.description || undefined}
              errors={fieldErrors}
              ref={textareaRef}
            />
            <div className="flex items-center gap-x-2">
              <FormSubmit className="bg-[#4D724D] hover:bg-white/10 ">Save</FormSubmit>
              <Button
                type="button"
                onClick={disableEditing}
                size="sm"
                className="hover:text-red-600 bg-transparent text-black hover:bg-transparent"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            role="button"
            className="min-h-[78px] bg-white/40  text-sm font-medium py-3 px-3.5 rounded-md"
          >
            {data.description || "Add a more detailed description..."}
          </div>
        )}
      </div>
    </div>
  );
};

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <div className="h-6 w-6 bg-neutral">
        <div className="w-full">
          <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
          <Skeleton className="w-full h-[78px] bg-neutral-200" />
        </div>
      </div>
    </div>
  );
};

export default Description;
