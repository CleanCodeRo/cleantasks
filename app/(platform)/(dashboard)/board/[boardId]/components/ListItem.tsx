import { ListWithCards } from '@/types'
import React from 'react'
import ListHeader from './ListHeader';


interface ListItemProps {
    data: ListWithCards;
    index: number;
}

const ListItem = ({
    data,
    index
}: ListItemProps) => {
  return (
    <li className='shrink-0 h0full w-[272px] select-none'>
        <div className='w-full rounded-md bg-[#a9c7aa] shadow-md pb-2'>
            <ListHeader data={data}/>
        </div>
    </li>
  )
}

export default ListItem