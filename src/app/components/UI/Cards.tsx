import { useGetCardsQuery } from '@/redux/contactSlice'
import React from 'react'
import CardIndividual from '../CardIndividual';

const Cards = () => {

    const {data,isLoading,isError,error} = useGetCardsQuery();
    console.log("cardsdataget:",data)
  return (
    <div className='flex flex-wrap gap-2 mt-4'>
        {
            data?.map((item)=><CardIndividual key={item.id} {...item}/>)
        }

    </div>
  )
}

export default Cards