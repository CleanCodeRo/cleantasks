import { AuditLog } from '@prisma/client'
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { generateLogMsg } from '@/lib/generateLogMsg';
import { format } from 'date-fns';



interface ActivityItemProps {
    data: AuditLog;
}

const ActivityItem = ({ data }: ActivityItemProps) => {

    return (
        <li className="flex items-center gap-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={data.userImage} />
          </Avatar>
          <div className="flex flex-col space-y-0.5">
            <p className="text-sm text-neutral-600">
              <span className="font-semibold lowercase text-neutral-700">
                {data.userName}
              </span> {generateLogMsg(data)}
            </p>
            <p className="text-xs text-muted-foreground">
              {format(new Date(data.createdAt), "MMM d, yyyy 'at' h:mm a")}
            </p>
          </div>
        </li>
      );
}

export default ActivityItem