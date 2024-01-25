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
        <Form>
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
              className="inline-flex w-full justify-center rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 sm:ml-3 sm:w-auto items-center"
            >
              {isSubmitting && (
                <svg
                  aria-hidden="true"
                  className="inline w-5 h-5 me-2 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
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
