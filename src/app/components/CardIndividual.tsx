import { Card } from "@prisma/client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { IoIosCall } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDeletePostMutation } from "@/redux/contactSlice";
import { initialValueType } from "./Modal";

interface CardIndividualProps extends Card  {
  open:boolean;
  setOpen:Dispatch<SetStateAction<boolean>>
  setDetails:React.Dispatch<React.SetStateAction<initialValueType | undefined>>
}

const CardIndividual: React.FC<CardIndividualProps> = ({ id, name, phone, title, email, company,open,setOpen,setDetails }) => {

  const [isDropdownOpen, setIsDropDownOpen] = useState(false);
  let [deleteid]=useDeletePostMutation()

  const toggleDropFunc = () => {
    setIsDropDownOpen(!isDropdownOpen);
  };
const particularCard:initialValueType = {
   id, name,phoneNumber:phone,designation:title, email, company
}
  const handleEdit = () => {
    setDetails(particularCard)
setOpen(true)
    
  };

  const handleDelete = () => {
    console.log('delete clicked');
    deleteid(id!)

  };

  return (
    <div className="h-70 w-60 shadow-lg rounded-lg p-4 bg-cardColor flex flex-col justify-center relative overflow-hidden">
      <div className="flex flex-col items-center">
        <div className="h-24 w-24 bg-blue-400 flex items-center justify-center rounded-xl">
          <p>HS</p>
        </div>

        <div className="absolute right-2 top-2 cursor-pointer">
          <BsThreeDotsVertical onClick={toggleDropFunc} />
          {isDropdownOpen && (
            <ul className="absolute right-1 mt-1 w-32 bg-white border border-gray-300 rounded shadow-lg">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleEdit}
              >
                Edit
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleDelete}
              >
                Delete
              </li>
            </ul>
          )}
        </div>

        <h2 className="font-bold text-lg mb-2">{id}:{name}</h2>
        <p className="text-sm">{title} at</p>
        <p className="text-sm text-iconsPos">{company}</p>
      </div>

      <div className="flex justify-start mt-3">
        <IoIosCall className="text-iconsPos" />
        <span className="text-sm pl-3 font-semibold">+91 {phone}</span>
      </div>

      <div className="flex mt-2 items-center">
        <IoIosMail className="text-[#6418C3]" />
        <span className="text-sm pl-3 font-semibold">{email}</span>
      </div>
    </div>
  );
};

export default CardIndividual;
