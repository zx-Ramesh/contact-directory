"use client";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Form, Formik } from "formik";
import Input from "./UI/Input";

interface ModalProps {
  triggerBtn: React.ReactNode;
}

interface initialValueType {
  name: string;
  email: string;
  phoneNumber: number;
  company: string;
  designation: string;
}

const initialValues: initialValueType = {
  company: "",
  designation: "",
  name: "",
  phoneNumber: 0,
  email: "",
};
const Modal = ({ triggerBtn }: ModalProps) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      {/* <button className="text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"> */}
      {triggerBtn}
      {/* </button> */}
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] h-[auto] w-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-9 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium flex ">
          Add New Contact
        </Dialog.Title>
        <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
          Fill out the below form to add new member
        </Dialog.Description>
        <Formik<initialValueType>
          initialValues={initialValues}
          onSubmit={() => {}}
        >
          {({ values, handleSubmit }) => {
            console.log("valuess", values);

            return (
              <Form>
                <div className="flex flex-col gap-5">
                  <div>
                    <label htmlFor="name">Name</label>
                    <Input name="name" id="name" placeholder="alasson bush" className="!rounded-3xl    "/>
                  </div>
                  <div className="flex gap-5">
                    <Input name="email" />
                    <Input name="phoneNumber" /> 
                  </div>
                  <div className="flex gap-5">
                    <Input name="company" />
                    <Input name="designation" />
                  </div>
                </div>
                <div>
                  <button type="button" onClick={() => handleSubmit()}>
                    Submit
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>

        {/* <div className="flex w-full justify-between gap-4">
          <fieldset className="mb-[15px] flex flex-col flex-1">
            <label
              className="text-violet11  text-left text-[15px]"
              htmlFor="name"
            >
              Email
            </label>
            <input
              className="text-violet11 shadow-violet7 focus:shadow-violet8 shadow-md h-[35px] w-full flex-1 items-center justify-center rounded-2xl py-[8px] px-[10px] text-[15px] leading-none outline-none focus:shadow-[0_0_0_2px] "
              id="name"
              // defaultValue="Pedro Duarte"
              placeholder="Email address"
            />
          </fieldset>
          <fieldset className="mb-[15px] flex flex-col flex-1">
            <label
              className="text-violet11  text-left text-[15px]"
              htmlFor="name"
            >
              Phone Number
            </label>
            <input
              className="text-violet11 shadow-violet7 focus:shadow-violet8  h-[35px] w-full flex-1 items-center justify-center rounded-2xl py-[8px] px-[10px] text-[15px] leading-none shadow-md outline-none focus:shadow-[0_0_0_2px]"
              id="name"
              // defaultValue="Pedro Duarte"
              placeholder="(123) 456 - 7890 "
            />
          </fieldset>
        </div> */}

        {/* <div className="flex w-full justify-between gap-4">
          <fieldset className="mb-[15px] flex flex-col flex-1">
            <label
              className="text-violet11  text-left text-[15px]"
              htmlFor="name"
            >
              Company
            </label>
            <input
              className="text-violet11 shadow-violet7 focus:shadow-violet8  h-[35px] w-full flex-1 items-center justify-center rounded-2xl py-[8px] px-[10px] text-[15px] leading-none shadow-md outline-none focus:shadow-[0_0_0_2px] "
              id="name"
              // defaultValue="Pedro Duarte"
              placeholder="Company name"
            />
          </fieldset>
          <fieldset className="mb-[15px] flex flex-col flex-1">
            <label
              className="text-violet11  text-left text-[15px]"
              htmlFor="name"
            >
              Designation
            </label>
            <input
              className="text-violet11 shadow-violet7 focus:shadow-violet8  h-[35px] w-full flex-1 items-center justify-center rounded-2xl py-[8px] px-[10px] text-[15px] leading-none shadow-md outline-none focus:shadow-[0_0_0_2px]"
              id="name"
              // defaultValue="Pedro Duarte"
              placeholder="Marketing Manager"
            />
          </fieldset>
        </div> */}

        <div className="mt-[25px] flex justify-end">
          <Dialog.Close asChild>
            <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
              Save changes
            </button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button
            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default Modal;
