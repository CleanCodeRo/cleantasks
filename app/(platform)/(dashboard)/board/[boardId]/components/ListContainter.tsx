"use client";
import { ListWithCards } from "@/types";
import React, { useEffect, useState } from "react";
import ListForm from "./ListForm";
import ListItem from "./ListItem";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useAction } from "@/hooks/useAction";
import { updateListOrder } from "@/actions/updateListOrder";
import { toast } from "sonner";
import { updateCardOrder } from "@/actions/updateCardOrder";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);


  // update list order
  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: (data) => {
      toast.success("List order updated");
    },
    onError: (error) => {
      toast.error(error);
    }
  })

  // update card order
  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: (data) => {
      toast.success("Card order updated");
    },
    onError: (error) => {
      toast.error(error);
    }
  })



  useEffect(() => {

    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) return;

    // if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;



    // user moves list
    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({
          ...item,
          order: index,
        })
      );

      

      setOrderedData(items);


      executeUpdateListOrder({ items, boardId });
    }

    // user moves card
    if (type === "card") {
      let newOrderData = [...orderedData];

      // source and destination list
      const sourceList = newOrderData.find(list => list.id === source.droppableId);
      const destinationList = newOrderData.find(list => list.id === destination.droppableId);

      if(!sourceList || !destinationList) return;

      // check if cards exist ont the source list
      if(!sourceList.cards) {
        sourceList.cards = [];
      }

      if(!destinationList.cards) {
        destinationList.cards = [];
      }


      // move card in same list
      if(source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(sourceList.cards, source.index, destination.index);

        reorderedCards.forEach((card, index) => {
          card.order = index;
        })

        sourceList.cards = reorderedCards;

        setOrderedData(newOrderData);

        executeUpdateCardOrder({ items: reorderedCards, boardId });



        // move card to another list

      } else {

        // remove card from source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        //assign listId to moved card
        movedCard.listId = destinationList.id;

        // add card to destination list
        destinationList.cards.splice(destination.index, 0, movedCard);

        sourceList.cards.forEach((card, index) => {
          card.order = index;
        })

        // update order of cards in destination list
        destinationList.cards.forEach((card, index) => {
          card.order = index;
        })

        setOrderedData(newOrderData);
        
        executeUpdateCardOrder({ items: [...sourceList.cards, ...destinationList.cards], boardId });

      }

    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => {
              return <ListItem key={list.id} index={index} data={list} />;
            })}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;
