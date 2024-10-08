"use client"
import React, { useState } from 'react'
import Modal, { initialValueType } from '../UI/modal/Modal'
import { TiUserAdd } from 'react-icons/ti'
import Cards from '../Cards'
import { useGetCardsQuery } from '@/redux/contactSlice'

const MainContainer = () => {
    const {data} = useGetCardsQuery()
    const [open,setopen] = useState(false)
    const [details,setDetails] =useState<initialValueType>()
    console.log("DATA", details)
  
  
    return (
      <div className="max-w-7xl mx-auto p-6 ">
        <div className="flex justify-between">
          <div>
            <h1 className="font-bold">Contacts</h1>
            <p className="text-lg">Lorem ipsum dolor sit amet</p>
          </div>
          <Modal
          open={open}
          details={details!}
          setDetails={setDetails}
          setOpen={setopen}
            triggerBtn={
              <div className="bg-primary px-3 py-1 rounded-xl text-#F9F9F9 flex items-center gap-1 text-secondary cursor-pointer">
                <TiUserAdd size={"18px"} />
                <p className="text-lg">New Contact</p>
              </div>
            }
          />
        </div>
        <Cards  open={open}
          setOpen={setopen} setDetails={setDetails}/>
      </div>
    );
}

export default MainContainer