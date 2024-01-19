"use client";
import React from "react";
import shortUUID from "short-uuid";
import { Formik, FormikHelpers, Form, Field } from "formik";
import { IFormShortLink, IShortLink } from "@/lib/interface";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";

export function FormShortLink() {
  const router = useRouter();
  const initialValues: IFormShortLink = { urlName: "", url: "" };

  const handleSubmit = async (
    data: IShortLink,
    actions: FormikHelpers<IFormShortLink>
  ) => {
    try {
      await axios.post("/api/short-link", data);
      router.refresh();
      actions.resetForm();
      actions.setSubmitting(false);
    } catch (error: any) {
      console.error("Error creating data:", error.message);
    }
  };
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        const destinationLink = shortUUID.generate();
        const shortLinkData: IShortLink = {
          name: values.urlName,
          sourceLink: values.url,
          destinationLink: destinationLink,
        };
        handleSubmit(shortLinkData, actions);
      }}
    >
      <Form className="mt-6 flex-col max-w-md gap-x-4">
        <label htmlFor="urlName" className="sr-only">
          URL Name
        </label>
        <Field
          id="urlName"
          name="urlName"
          required
          type="text"
          className="block w-full my-2 min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
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
          className="block w-full my-2 min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          placeholder="Enter your url"
        />
        <button
          type="submit"
          className="flex-none float-right rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Subscribe
        </button>
      </Form>
    </Formik>
  );
}