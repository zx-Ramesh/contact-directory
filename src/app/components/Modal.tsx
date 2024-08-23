"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ErrorMessage, Form, Formik, FormikHelpers } from "formik";
import Input from "./UI/Input";
import { useAddCardsMutation, useEditCardsMutation, useGetCardsQuery } from "@/redux/contactSlice";
import * as Yup from "yup";


interface ModalProps {
  triggerBtn: React.ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>
  details: initialValueType
  setDetails: React.Dispatch<React.SetStateAction<initialValueType | undefined>>
}

export interface initialValueType {
  id?: number,
  name: string;
  email: string;
  phoneNumber: string;
  company: string;
  designation: string;

}

const initialValues: initialValueType = {
  company: "",
  designation: "",
  name: "",
  phoneNumber: "",
  email: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  company: Yup.string().required("Company is required"),
  designation: Yup.string().required("Designation is required"),
});


const Modal = ({ triggerBtn, open, setOpen, details, setDetails }: ModalProps) => {

  const [addDataCard] = useAddCardsMutation()
  const { data, isLoading, isError, error } = useGetCardsQuery();
  const [editDateCard] = useEditCardsMutation();
  console.log("Details", details);

  const handelAddNewCartSubmit = async (values: initialValueType, { resetForm }: FormikHelpers<initialValueType>) => {
    try {
      if (!details) {
        console.log("New Contact Form");
        const response = await addDataCard({
          name: values?.name,
          company: values?.company,
          email: values?.email,
          phone: String(values?.phoneNumber),
          title: values?.designation
        })
        console.log("response", response);
        setOpen(false)

      } else {
        const response = await editDateCard({
          id: details.id,
          name: values?.name,
          company: values?.company,
          email: values?.email,
          phone: String(values?.phoneNumber),
          title: values?.designation
        })
        console.log("response", response);
        setOpen(false)

      }
      setDetails(initialValues)
      resetForm()

    } catch (error) {
      console.error("Request failed:", error);
    }
    console.log("values", values)
  }

  return (
    <Dialog.Root open={open} onOpenChange={() => { setOpen(!open) }}>
      <Dialog.Trigger asChild >
        {triggerBtn}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content onPointerDownOutside={(e) => e.preventDefault()} className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] h-[auto] w-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-16 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
         {
          details?.name.length? <>
           <Dialog.Title className="text-mauve12 m-0 text-[30px] flex justify-center font-bold">
           Edit Contact
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal flex justify-center">
            Fill out the below form
          </Dialog.Description>
          
          </>:
          <>
             <Dialog.Title className="text-mauve12 m-0 text-[30px] flex justify-center font-bold">
            Add New Contact
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal flex justify-center">
            Fill out the below form to add new member
          </Dialog.Description>
          </>
         }
          <Formik<initialValueType>
            initialValues={details || initialValues}
            validationSchema={validationSchema} 
            onSubmit={handelAddNewCartSubmit}
          >
            {/* {({ values }) => {
              return ( */}
                <Form>
                  <div className="flex flex-col gap-5 mb-7">
                    <div>
                      <label htmlFor="name" className="font-bold">Name</label>
                      <Input name="name" id="name" placeholder="Angela Moss" />
                      
                    </div>
                    <div className="flex gap-5">
                      <div className="flex flex-col flex-1">
                        <label htmlFor="email" className="font-bold">Email</label>
                        <Input type="text" name="email" id="email" placeholder="Email address" />
                        
                      </div>
                      <div className="flex flex-col flex-1">
                        <label htmlFor="number" className="font-bold">Phone Number</label>
                        <Input type="number" name="phoneNumber" id="number" placeholder="(123) 456 - 7890" />
                        
                      </div>
                    </div>
                    <div className="flex gap-5">
                      <div className="flex flex-col flex-1">
                        <label htmlFor="company" className="font-bold">Company</label>
                        <Input name="company" id="company" placeholder="Company name" />
                        
                      </div>
                      <div className="flex flex-col flex-1">
                        <label htmlFor="designation" className="font-bold">Designation</label>
                        <Input name="designation" id="designation" placeholder="Marketing Manager" />
                        
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-4">

                    <button type="submit" className="bg-iconsPos text-white px-8 py-3 rounded-lg  ">
                      Save
                    </button>


                    <Dialog.Close asChild>
                      <button onClick={() => { setDetails(initialValues) }} className="border border-iconsPos px-8 py-3 rounded-lg">
                        Cancel
                      </button>
                    </Dialog.Close>


                  </div>
                </Form>
              {/* );
            }} */}
          </Formik>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
};

export default Modal;
