import { Card } from "@prisma/client";
import React, { Dispatch, SetStateAction, useCallback, useMemo, useRef, useState, useEffect } from "react";
import { IoIosCall } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDeletePostMutation } from "@/redux/contactSlice";
import { initialValueType } from "./Modal";
import classNames from "classnames";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

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
    setIsDropDownOpen(prev => !prev);
  };

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
  }, [id]);

  return (
    <div className="h-70 w-60 shadow-lg rounded-lg py-6 px-5 flex flex-col justify-center relative">
      <div className="flex flex-col items-center">
        <div style={{ backgroundColor: `${hexCode}` }} className="h-24 w-24 bg-blue-400 flex items-center justify-center rounded-xl">
          <p>HS</p>
        </div>

        <div className="absolute right-3 top-5 cursor-pointer">
          <BsThreeDotsVertical onClick={toggleDropFunc} />
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

        <h2 className="font-bold text-lg mb-2"> {name}</h2>
        <p className="text-sm">{title} at</p>
        <p className="text-sm text-iconsPos">{company}</p>
      </div>

      <div className="flex justify-start mt-3 gap-2">
        <IoIosCall className="text-iconsPos" />
        <span className="text-sm pl-3 font-semibold">+91 {phone}</span>
      </div>

      <div className="flex mt-2 items-center gap-2">
        <IoIosMail className="text-[#6418C3]" />
        <span className="text-sm pl-3 font-semibold">{email}</span>
      </div>
    </div>
  );
};

export default CardIndividual;
