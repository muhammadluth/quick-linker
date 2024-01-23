"use client";
import React from "react";
import shortUUID, { uuid } from "short-uuid";
import { Formik, FormikHelpers, Form, Field } from "formik";
import { IFormShortLink, IShortLink, UpdateType } from "@/lib/model";
import axios from "@/lib/axios";
import { toast } from "react-hot-toast";
import { useShortLinkUIContext } from "@/context/ShortLinkUIContext";
import { Dialog } from "@headlessui/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export function FormUpdateShortLink({ dataSelected }: Readonly<UpdateType>) {
  const shortLinkUIContext = useShortLinkUIContext();
  const initialValues: IFormShortLink = {
    urlName: dataSelected.name,
    url: dataSelected.sourceLink,
  };

  const handleSubmit = async (
    data: IShortLink,
    actions: FormikHelpers<IFormShortLink>
  ) => {
    console.log(data);
    // try {
    //   const response = await axios.post("/api/short-link", data);
    //   actions.resetForm();
    //   actions.setSubmitting(false);
    //   setTimeout(() => {
    //     toast.success(response.data.message);
    //     shortLinkUIContext?.handleResetData();
    //   }, 500);
    // } catch (error: any) {
    //   console.error("Error creating data:", error.message);
    //   toast.error("error creating short link");
    // }
  };

  const shortLink = new URL(
    dataSelected.destinationLink,
    shortLinkUIContext?.baseUrl
  ).toString();

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        const destinationLink = shortUUID.generate();
        const shortLinkData: IShortLink = {
          id: uuid.toString(),
          name: values.urlName,
          sourceLink: values.url,
          destinationLink: destinationLink,
        };
        handleSubmit(shortLinkData, actions);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="mt-6 flex-col max-w-md">
          <label htmlFor="urlName" className="sr-only">
            URL Name
          </label>
          <Field
            id="urlName"
            name="urlName"
            required
            type="text"
            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-2"
            placeholder="Enter your url name"
          />
          <label htmlFor="url" className="sr-only">
            URL
          </label>
          <Field
            id="url"
            name="url"
            required
            type="text"
            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-2"
            placeholder="Enter your url"
          />
          <button className="hidden">submit</button>
        </Form>
      )}
    </Formik>
  );
}
