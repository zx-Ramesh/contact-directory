import { useGetCardsQuery } from '@/redux/contactSlice'
import React, { Dispatch, SetStateAction } from 'react'

import { initialValueType } from '../UI/modal/Modal';
import CardIndividual from '../CardIndividual';
type cardsProps = {
  open:boolean;
  setOpen:Dispatch<SetStateAction<boolean>>
  setDetails:React.Dispatch<React.SetStateAction<initialValueType | undefined>>
}
const Cards = ({open,setOpen,setDetails}:cardsProps) => {

    const {data,isLoading,isError,error} = useGetCardsQuery();
    console.log("cardsdataget:",data)
  return (
    <div className='flex flex-wrap gap-2 mt-4'>
        {
            data?.map((item)=><CardIndividual setDetails={setDetails} open={open}
            setOpen={setOpen} key={item.id} {...item}/>)
        }

    </div>
  )
}

export default Cards