import React from "react";
import { IoIosCall } from "react-icons/io";
import { IoIosMail } from "react-icons/io";

const Card = () => {
  return (
    <div className="h-80 w-64 shadow-lg rounded-lg p-4 bg-cardColor flex flex-col justify-center">
      <div className="flex flex-col items-center">
        <div className="h-24 w-24 bg-blue-400 flex items-center justify-center rounded-xl">
          <p>HS</p>
        </div>
        <h2 className="font-bold text-lg mb-2">Angela Moss</h2>
        <p className="text-sm">Marketing Manager at </p>
        <p className="text-sm text-iconsPos">Highspeed Studios</p>
      </div>

      <div className="flex justify-start border mt-3">
        <IoIosCall className="text-iconsPos"/>
        <span className="text-sm pl-3 font-semibold">+91 1234567890</span>
      </div>

      <div className="flex mt-2 items-center">
        <IoIosMail className="text-[#6418C3]"/>
        <span className="text-sm pl-3 font-semibold">onePiece@gmail.com</span>
      </div>
    </div>
  );
};

export default Card;
