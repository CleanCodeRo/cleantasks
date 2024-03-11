import { db } from "@/prisma/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import React from "react";


interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = async({
  params
}: BoardIdPageProps) => {

  const { orgId } = auth()

  if(!orgId) redirect('/select-org');

  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId
      }
    },
    include: {
      cards: {
        orderBy: {
          order: 'asc'
        }
      }
    },
    orderBy: {
      order: 'asc'
    }
  })


  return (
    <div>
      <h1>Board {params.boardId}</h1>
    </div>
  );
};

export default BoardIdPage;
