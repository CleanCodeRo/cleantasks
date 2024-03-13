import { db } from "@/lib/db";
import Info from "./components/Info";
import { Separator } from "@/components/ui/separator";
import BoardList from "./BoardList";
import { Suspense } from "react";

const OrganizationIdPage = async () => {
  const boards = await db.board.findMany();

  return (
    <div className="w-full mb-20">
      <Info />
      <Separator className="my-5" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  );
};

export default OrganizationIdPage;
