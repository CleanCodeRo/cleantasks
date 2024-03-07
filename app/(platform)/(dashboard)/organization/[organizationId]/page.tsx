import { create } from "@/actions/createBoard";
import { Button } from "@/components/ui/button";
import { db } from "@/prisma/db";
import { OrganizationSwitcher } from "@clerk/nextjs";
import Board from "./board";
import Form from "./Form";



const OrganizationIdPage = async () => {
  const boards = await db.board.findMany();

  return (
    <div className="flex flex-col space-y-4">
      <Form />
      <div className="space-y-2">
        {boards.map((b) => (
          <Board key={b.id} title={b.title} id={b.id}/>
        ))}
      </div>
    </div>
  );
};

export default OrganizationIdPage;
