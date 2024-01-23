"use client";
import React, { useState, useEffect, useMemo } from "react";
import axios from "@/lib/axios";
import {
  PencilSquareIcon,
  TrashIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";
import {
  TablePaginationType,
  ResponseGetShortLinkType,
  IShortLink,
  ShortLinkUIContextType,
} from "@/lib/model";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-hot-toast";
import { TableLoading } from "@/components/partial/TableLoading";
import { TableDataNotFound } from "@/components/partial/TableDataNotFound";
import { TablePagination } from "@/components/partial/TablePagination";
import { ModalUpdateShortLink } from "@/components/partial/ModalUpdateShortLink";
import { ModalDeleteShortLink } from "@/components/partial/ModalDeleteShortLink";
import { useShortLinkUIContext } from "@/context/ShortLinkUIContext";

export default function TableShortLink() {
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [dataSelectedUpdate, setDataSelectedUpdate] = useState<IShortLink>();
  const [dataSelectedDelete, setDataSelectedDelete] = useState<IShortLink>();

  const shortLinkUIContext = useShortLinkUIContext();

  const handleCopyToClipboard = () => {
    toast.success("Copy to clipboard!");
  };

  const handlePage = (mode: string) => {
    const page = shortLinkUIContext?.page ?? 0;
    if (mode === "next") {
      shortLinkUIContext?.setPage(page + 1);
      shortLinkUIContext?.setLoading(true);
    } else if (mode === "previous") {
      shortLinkUIContext?.setPage(page - 1);
      shortLinkUIContext?.setLoading(true);
    }
  };

  const handleSelectedPage = (currentPage: number) => {
    shortLinkUIContext?.setPage(currentPage);
    shortLinkUIContext?.setLoading(true);
  };

  const paginationProps: TablePaginationType = {
    totalData: shortLinkUIContext?.totalData ?? 0,
    page: shortLinkUIContext?.page ?? 0,
    paginationSize: 5,
    sizePerPage: shortLinkUIContext?.sizePerPage ?? 0,
    totalPage: 0,
    handlePage: handlePage,
    handleSelectedPage: handleSelectedPage,
  };

  const handleOpenModalUpdate = (data: IShortLink) => {
    setOpenModalUpdate((prev) => !prev);
    setDataSelectedUpdate(data);
  };

  const handleOpenModalDelete = (data: IShortLink) => {
    setOpenModalDelete((prev) => !prev);
    setDataSelectedDelete(data);
  };

  const dataNotFound =
    !shortLinkUIContext?.loading && !shortLinkUIContext?.data;
  const dataFound = !shortLinkUIContext?.loading && shortLinkUIContext?.data;
  return (
    <div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="w-1/4 py-3 text-center">
              URL Name
            </th>
            <th scope="col" className="w-1/2 py-3 text-center">
              Short Link
            </th>
            <th scope="col" className="w-1/8 py-3 text-center">
              Status
            </th>
            <th scope="col" className="w-1/8 py-3 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {shortLinkUIContext?.loading && <TableLoading />}
          {!shortLinkUIContext?.loading &&
            shortLinkUIContext?.data?.map((item) => {
              const shortLink = new URL(
                item.destinationLink,
                shortLinkUIContext.baseUrl
              ).toString();
              return (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="w-1/4 text-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.name}
                  </th>
                  <td className="w-1/2 text-center py-4">
                    <a
                      className="no-underline hover:underline hover:text-blue-600"
                      href={shortLink}
                      target="_blank"
                    >
                      {shortLink}
                    </a>
                  </td>
                  <td className="w-1/8 text-center py-4">
                    <div className="flex items-center justify-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                      Online
                    </div>
                  </td>
                  <td className="w-1/8 text-center py-3">
                    <div className="flex flex-row justify-center">
                      <CopyToClipboard
                        text={shortLink}
                        onCopy={handleCopyToClipboard}
                      >
                        <button className="flex-none float-right rounded-md bg-blue-600 p-1 mx-1 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">
                          <ClipboardIcon
                            className="h-7 w-7"
                            aria-hidden="true"
                          />
                        </button>
                      </CopyToClipboard>
                      <button
                        onClick={() => handleOpenModalUpdate(item)}
                        className="flex-none float-right rounded-md bg-yellow-600 p-1  mx-1 text-sm font-semibold text-white shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
                      >
                        <PencilSquareIcon
                          className="h-7 w-7"
                          aria-hidden="true"
                        />
                      </button>
                      <button
                        onClick={() => handleOpenModalDelete(item)}
                        className="flex-none float-right rounded-md bg-red-600 p-1  mx-1 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                      >
                        <TrashIcon className="h-7 w-7" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {dataNotFound && <TableDataNotFound />}
      {dataFound && (
        <TablePagination
          totalData={paginationProps.totalData}
          page={paginationProps.page}
          sizePerPage={paginationProps.sizePerPage}
          totalPage={paginationProps.totalPage}
          paginationSize={paginationProps.paginationSize}
          handlePage={paginationProps.handlePage}
          handleSelectedPage={paginationProps.handleSelectedPage}
        />
      )}

      {dataSelectedUpdate && (
        <ModalUpdateShortLink
          open={openModalUpdate}
          setOpen={setOpenModalUpdate}
          dataSelected={dataSelectedUpdate}
        />
      )}
      {dataSelectedDelete && (
        <ModalDeleteShortLink
          open={openModalDelete}
          setOpen={setOpenModalDelete}
          dataSelected={dataSelectedDelete}
        />
      )}
    </div>
  );
}
