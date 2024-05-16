import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";
import { UseCardModal } from "@/hooks/useCardModal";
import { ClockIcon } from "lucide-react";

interface CardItemProps {
  index: number;
  data: Card;
}

const CardItem = ({ data, index }: CardItemProps) => {
  const cardModal = UseCardModal();

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <>
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            role="button"
            onClick={() => cardModal.onOpen(data.id)}
            className="flex truncate border-2 border-transparent hover:border-black/40 py-2 px-3 text-sm bg-white/55 rounded-md shadow-sm"
          >
            {data.title}
            <div className="flex items-center ml-2">
              <ClockIcon size={15} className="mr-1" />
              {data.hoursWorked}
            </div>
          </div>
        </>
      )}
    </Draggable>
  );
};

export default CardItem;
