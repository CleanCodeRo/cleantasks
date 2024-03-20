"use client";
import { updateCard } from "@/actions/updateCard";
import { FormInput } from "@/components/form/FormInput";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/useAction";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { Layout, X } from "lucide-react";
import { useParams } from "next/navigation";
import React, { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

interface HeaderProps {
  data: CardWithList;
}

const Header = ({ data }: HeaderProps) => {
  const [title, setTitle] = useState(data.title);
  const params = useParams();
  const inputRef = useRef<ElementRef<"input">>(null);
  const queyClient = useQueryClient();

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
        queyClient.invalidateQueries({
            queryKey: ["card", data.id]
        })
        
        queyClient.invalidateQueries({
            queryKey: ["card-logs", data.id]
        })

        toast.success(`Renamed card to ${data.title}`)
        setTitle(data.title)
    },
    onError: (error) => {
        toast.error(error)
    }
  });

    const onBlur = () => {
        inputRef.current?.form?.requestSubmit();
    }

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const boardId = params.boardId as string;

        if(title === data.title) return;

        execute({ title, boardId, id: data.id })
    }


  return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
      <Layout className="h-8 w-6 mt-1 text-neutral-700" />
      <div className="w-full">
        <form
            action={onSubmit}
        >
          <FormInput
            id="title"
            defaultValue={title}
            className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%]
                    focus-visible:bg-[#8AA899] focus-visible:border-input mb-0.5 truncate py-5 border-none"
            ref={inputRef}
            onBlur={onBlur}
            errors={fieldErrors}
          />
        </form>
        <p className="text-sm text-muted-foreground">
            in list <span className="underline">{data.list.title}</span>
        </p>
      </div>
    </div>
  );
};

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-x-3 mb-6">
      <Skeleton className="h-6 w-6 mt-1 bg-[#a8c5b7]" />
      <div>
        <Skeleton className="w-24 h-6 mb-1 bg-[#a8c5b7]" />
        <Skeleton className="w-12 h-4 bg-[#a8c5b7]" />
      </div>
    </div>
  );
};

export default Header;
