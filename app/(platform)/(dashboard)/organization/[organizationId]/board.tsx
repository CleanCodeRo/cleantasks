import { deleteBoard } from "@/actions/deleteBoard";
import { Button } from "@/components/ui/button";


interface BoardProps {
    title: string;
    id: string;
}

const Board = ({title, id}: BoardProps) => {

    const deleteBoardWithId = deleteBoard.bind(null, id);

  return (
    <form action={deleteBoardWithId} className="flex items-center gap-x-2">
            <p>Board title: {title}</p>
            <Button type="submit" variant='destructive' size='sm'>
                Delete Me
            </Button>
    </form>
  )
}

export default Board