"use client";

import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import axios from "@/lib/axios";
import {
  ShortLinkUIContextType,
  ResponseGetShortLinkType,
  IShortLink,
} from "@/lib/model";

const ShortLinkUIContext = createContext<ShortLinkUIContextType | null>(null);

export const useShortLinkUIContext = () => {
  const context = useContext(ShortLinkUIContext);
  if (context === undefined)
    throw new Error("Expected context value to be set");
  return context;
};

export const ShortLinkUIConsumer = ShortLinkUIContext.Consumer;

export function ShortLinkUIProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [data, setData] = useState<ResponseGetShortLinkType>();
  const [loading, setLoading] = useState(true);
  const [sizePerPage, setSizePerPage] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    handleGetData(sizePerPage, page);
  }, [sizePerPage, page]);

  const handleGetData = async (sizePerPage: number, page: number) => {
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

  const handleResetData = useCallback(() => {
    setSizePerPage(5);
    setPage(1);
    handleGetData(sizePerPage, page);
  }, [sizePerPage, page]);

  const value = useMemo(() => {
    return {
      baseUrl: data?.base_url,
      sizePerPage: sizePerPage,
      page: page,
      totalData: data?.total_data,
      data: data?.short_link_data,
      loading: loading,
      handleResetData: handleResetData,
      setLoading: setLoading,
      setSizePerPage: setSizePerPage,
      setPage: setPage,
    };
  }, [data, loading, sizePerPage, page, handleResetData]);

  return (
    <ShortLinkUIContext.Provider value={value}>
      {children}
    </ShortLinkUIContext.Provider>
  );
}
