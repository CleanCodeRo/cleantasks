"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import React from "react";
import { UseCardModal } from "@/hooks/useCardModal";
import { useQuery } from "@tanstack/react-query";
import { CardWithList } from "@/types";
import { fetcher } from "@/lib/fetcher";
import Header from "./Header";
import Description from "./Description";
import Actions from "./Actions";



const CardModal = () => {
  const id = UseCardModal((state) => state.id);
  const isOpen = UseCardModal((state) => state.isOpen);
  const onClose = UseCardModal((state) => state.onClose);

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  })

  return (
    <Dialog
        open={isOpen}
        onOpenChange={onClose}
    >
      <DialogContent className="bg-[#8AA899] border-none">
        {!cardData
          ? <Header.Skeleton />
          : <Header data={cardData} />
        }
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!cardData ? <Description.Skeleton /> : <Description data={cardData} />}
            </div>
          </div>
          {!cardData 
            ? <Actions.Skeleton />
            : <Actions data={cardData}/>
          }
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
