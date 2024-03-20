
import React, { Suspense } from "react";
import Info from "../components/Info";
import { Separator } from "@/components/ui/separator";
import ActivityList from "./components/ActivityList";

const ActivityPage = () => {
  return (
    <div className="w-full">
      <Info />
      <Separator className="my-2" />
      <Suspense fallback={<ActivityList.Skeleton />}>
          <ActivityList />
      </Suspense>
    </div>
  );
};

export default ActivityPage;
