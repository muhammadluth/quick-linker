import React, { Fragment, useRef } from "react";
import axios from "@/lib/axios";
import { toast } from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { IFormShortLink, IShortLink, ModalUpdateType } from "@/lib/model";
import { useShortLinkUIContext } from "@/context/ShortLinkUIContext";
import { FormUpdateShortLink } from "../form/FormUpdateShortLink";

export function ModalUpdateShortLink({
  open,
  setOpen,
  dataSelected,
}: Readonly<ModalUpdateType>) {
  const cancelButtonRef = useRef(null);
  const shortLinkUIContext = useShortLinkUIContext();

  // const handleUpdateData = async (
  //   id: string,
  //   data: IShortLink,
  //   actions: FormikHelpers<IFormShortLink>
  // ) => {
  //   try {
  //     const response = await axios.put(`/api/short-link/${id}`, data);
  //     if (response.status === 200) {
  //       setTimeout(() => {
  //         toast.success(response.data.message);
  //         setOpen(false);
  //         shortLinkUIContext?.handleResetData();
  //       }, 1000);
  //     }
  //   } catch (error: any) {
  //     console.error("Error delete data:", error.message);
  //     toast.error("error delete short link");
  //   }
  // };

  const shortLink = new URL(
    dataSelected.destinationLink,
    shortLinkUIContext?.baseUrl
  ).toString();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <FormUpdateShortLink
                  dataSelected={dataSelected}
                  setOpen={setOpen}
                  cancelButtonRef={cancelButtonRef}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
