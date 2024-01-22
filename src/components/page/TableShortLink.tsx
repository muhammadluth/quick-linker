"use client";
import React, { useState, useEffect } from "react";
import axios from "@/lib/axios";
import {
  PencilSquareIcon,
  TrashIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";
import {
  ITablePagination,
  IResponseGetShortLink,
  IShortLink,
} from "@/lib/interface";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-hot-toast";
import { TableLoading } from "@/components/partial/TableLoading";
import { TableDataNotFound } from "@/components/partial/TableDataNotFound";
import { TablePagination } from "@/components/partial/TablePagination";
import { ModalDeleteShortLink } from "@/components/partial/ModalDeleteShortLink";

export default function TableShortLink() {
  const [data, setData] = useState<IResponseGetShortLink>();
  const [loading, setLoading] = useState(true);
  const [sizePerPage, setSizePerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [dataSelected, setDataSelected] = useState<IShortLink>();

  useEffect(() => {
    const handleGetData = async () => {
      try {
        const response = await axios.get(
          `/api/short-link?limit=${sizePerPage}&page=${page}`
        );
        if (response.status === 200) {
          setData(response.data);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      } catch (error: any) {
        setLoading(false);
        console.error("Error get data:", error.message);
      }
    };
    handleGetData();
  }, [sizePerPage, page]);

  const handleCopyToClipboard = () => {
    toast.success("Copy to clipboard!");
  };

  const handleComingSoon = () => {
    toast.success("Coming soon!");
  };

  const handlePage = (mode: string) => {
    if (mode === "next") {
      setPage(page + 1);
      setLoading(true);
    } else if (mode === "previous") {
      setPage(page - 1);
      setLoading(true);
    }
  };

  const handleSelectedPage = (currentPage: number) => {
    setPage(currentPage);
    setLoading(true);
  };

  const paginationProps: ITablePagination = {
    totalData: data?.total_data,
    page: page,
    paginationSize: 5,
    sizePerPage: sizePerPage,
    totalPage: 0,
    handlePage: handlePage,
    handleSelectedPage: handleSelectedPage,
  };

  const handleOpenModalDelete = (data: IShortLink) => {
    setOpenModalDelete((prev) => !prev);
    setDataSelected(data);
  };

  const dataNotFound = !loading && data?.short_link_data.length === 0;
  const dataFound = !loading && data?.short_link_data.length !== 0;
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
          {loading && <TableLoading />}
          {!loading &&
            data?.short_link_data.map((item) => {
              const shortLink = new URL(
                item.destinationLink,
                data.base_url
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
                        onClick={handleComingSoon}
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

      {dataSelected && (
        <ModalDeleteShortLink
          open={openModalDelete}
          setOpen={setOpenModalDelete}
          dataSelected={dataSelected}
        />
      )}
    </div>
  );
}
