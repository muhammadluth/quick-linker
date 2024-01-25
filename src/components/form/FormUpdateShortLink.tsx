"use client";
import React from "react";
import shortUUID, { uuid } from "short-uuid";
import { Formik, FormikHelpers, Form, Field } from "formik";
import {
  IFormShortLink,
  IShortLink,
  IUpdateShortLink,
  UpdateType,
} from "@/lib/model";
import axios from "@/lib/axios";
import { toast } from "react-hot-toast";
import { useShortLinkUIContext } from "@/context/ShortLinkUIContext";
import { Dialog } from "@headlessui/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export function FormUpdateShortLink({
  dataSelected,
  setOpen,
  cancelButtonRef,
}: Readonly<UpdateType>) {
  const shortLinkUIContext = useShortLinkUIContext();
  const initialValues: IFormShortLink = {
    urlName: dataSelected.name,
    url: dataSelected.sourceLink,
  };

  const handleSubmit = async (
    id: string,
    data: IUpdateShortLink,
    actions: FormikHelpers<IFormShortLink>
  ) => {
    try {
      const response = await axios.put(`/api/short-link/${id}`, data);
      actions.resetForm();
      actions.setSubmitting(false);
      setTimeout(() => {
        toast.success(response.data.message);
        shortLinkUIContext?.handleResetData();
        setOpen(false);
      }, 500);
    } catch (error: any) {
      console.error("Error creating data:", error.message);
      toast.error("error creating short link");
    }
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
        const shortLinkData: IUpdateShortLink = {
          name: values.urlName,
          sourceLink: values.url,
          updatedAt: new Date(),
        };
        handleSubmit(dataSelected.id, shortLinkData, actions);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="mt-6 flex-col max-w-md">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <PencilSquareIcon
                  className="h-6 w-6 text-yellow-600"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <Dialog.Title
                  as="h3"
                  className="text-base font-semibold leading-6 text-gray-900"
                >
                  Update short link
                </Dialog.Title>
                <div className="mt-2">
                  <a
                    href={shortLink}
                    className="text-sm text-gray-500 hover:underline hover:text-blue-600"
                  >
                    {shortLink}
                  </a>
                </div>
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
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full justify-center rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 sm:ml-3 sm:w-auto"
            >
              Update
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={() => setOpen(false)}
              ref={cancelButtonRef}
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
