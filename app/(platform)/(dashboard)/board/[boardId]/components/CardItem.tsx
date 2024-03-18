import { Card } from '@prisma/client';
import { Draggable } from '@hello-pangea/dnd';
import { UseCardModal } from '@/hooks/useCardModal';


interface CardItemProps {
    index: number;
    data: Card;
}

const CardItem = ({
    data,
    index
}: CardItemProps) => {

  const cardModal = UseCardModal();

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        role='button'
        onClick={() => cardModal.onOpen(data.id)}
        className='truncate border-2 border-transparent hover:border-black/40 py-2 px-3 text-sm bg-white/55 rounded-md shadow-sm'
      >
          {data.title}
      </div>
      )}
    </Draggable>
  )
}

export default CardItem