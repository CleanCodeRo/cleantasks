import { Card } from '@prisma/client';
import React from 'react'


interface CardItemProps {
    index: number;
    data: Card;
}

const CardItem = ({
    data,
    index
}: CardItemProps) => {
  return (
    <div 
        role='button'
        className='truncate border-2 border-transparent hover:border-black/40 py-2 px-3 text-sm bg-white/55 rounded-md shadow-sm'
    >
        {data.title}
    </div>
  )
}

export default CardItem