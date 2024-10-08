import { Card } from "@prisma/client";
import React, { Dispatch, SetStateAction, useCallback, useMemo, useRef, useState, useEffect } from "react";
import { IoIosCall } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDeletePostMutation } from "@/redux/contactSlice";

import classNames from "classnames";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { initialValueType } from "../UI/modal/Modal";
import { data } from "autoprefixer";

interface CardIndividualProps extends Card {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>
  setDetails: React.Dispatch<React.SetStateAction<initialValueType | undefined>>
}

const CardIndividual: React.FC<CardIndividualProps> = ({ id, name, phone, title, email, company, open, setOpen, setDetails }) => {

  const [isDropdownOpen, setIsDropDownOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement | null>(null);
  let [deleteid] = useDeletePostMutation();

  const toggleDropFunc = () => {
    setIsDropDownOpen(!isDropdownOpen);
  };

  console.log({isDropdownOpen})

  const particularCard: initialValueType = {
    id, name, phoneNumber: phone, designation: title, email, company
  }

  const handleEdit = () => {
    setDetails(particularCard);
    setOpen(true);
    setIsDropDownOpen(false);
  };

  const handleDelete = () => {
    console.log('delete clicked');
    deleteid(id!);
    setIsDropDownOpen(false);
  };

  // Click outside handler
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropDownOpen(false);
    }
  }, []);   

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const hexCode = useMemo(() => {
    function randomColor() {
      let charNum = "0123456789ABCDEF";
      let c = "#";
      for (let i = 0; i < 6; i++) {
        c = c + charNum[Math.floor(Math.random() * 16)];
      }
      return c;
    }
    return randomColor();
  }, []);

  function getInitals(word: string):string{
    const result =  word.split(" ").map((initial)=> initial.charAt(0));
    return result.join("");
  }

  const initialResultName = getInitals(particularCard?.name)

  return (
    <div className="h-70 w-60 shadow-lg rounded-lg py-6 px-5 flex flex-col justify-center relative">
      <div className="flex flex-col items-center">
        <div style={{ backgroundColor: `${hexCode}` }} className="h-24 w-24 bg-blue-400 flex items-center justify-center rounded-xl">
          <p className="text-[#F9F9F9] font-extrabold text-xl">{initialResultName}</p>
        </div>

        <div className="absolute right-3 top-5 cursor-pointer">
          <BsThreeDotsVertical onClick={toggleDropFunc} className="text-primary"/>
          {isDropdownOpen && (
            <ul ref={dropdownRef} className="absolute z-30 bg-white left-1 mt-1 w-32 rounded-xl border border-primary text-primary">
              <li
                className="px-4 py-2 cursor-pointer flex items-center gap-2"
                onClick={handleEdit}
              >
                <CiEdit />
                Edit
              </li>
              <li
                className="px-4 py-2  cursor-pointer flex items-center gap-2"
                onClick={handleDelete}
              >
                <MdDeleteOutline />
                Delete
              </li>
            </ul>
          )}
        </div>

        <div className="w-52 truncate flex flex-col text-center mt-2">
        <h2 className="font-bold text-lg mb-2 truncate"> {name}</h2>
        <p className="text-sm truncate">{title} at</p>
        <p className="text-sm text-iconsPos truncate">{company}</p>
        </div>
      </div>

      <div className="w-52 flex justify-start mt-3 gap-2">
        <IoIosCall height={"20px"} className="text-iconsPos truncate" />
        <span className="text-sm pl-3 font-semibold">+91 {phone}</span>
      </div>

      <div className="w-52 flex mt-2 items-center gap-2">
        <IoIosMail height={"20px"} className="text-[#6418C3]" />
        <span className="text-sm pl-3 font-semibol truncate w-[156px]">{email}</span>
      </div>
    </div>
  );
};

export default CardIndividual;
