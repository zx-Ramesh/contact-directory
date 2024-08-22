// import Image from "next/image";
import { TiUserAdd } from "react-icons/ti";
import Card from "./components/Card";
import Modal from "./components/Modal";

export default function Home() {
  return (
    <div className="max-w-7xl border border-red-500 mx-auto p-6 ">
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold">Contacts</h1>
          <p className="text-lg">Lorem ipsum dolor sit amet</p>
        </div>
        {/* <button className="bg-primary px-3 py-1 rounded-xl text-#F9F9F9 flex items-center gap-1 text-secondary">
          <TiUserAdd size={"18px"}/>
          <p className="text-lg">New Contact</p>
        </button> */}

        <Modal
          triggerBtn={
            <div className="bg-primary px-3 py-1 rounded-xl text-#F9F9F9 flex items-center gap-1 text-secondary">
              <TiUserAdd size={"18px"} />
              <p className="text-lg">New Contact</p>
            </div>
          }
        />
      </div>

      <Card />
    </div>
  );
}
