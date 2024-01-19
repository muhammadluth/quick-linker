"use client";
import React, { useEffect, useState, lazy } from "react";
import { ISlugParams } from "@/lib/interface";
import axios from "@/lib/axios";

const Loading = lazy(() => import("@/components/page/Loading"));
const NotFound = lazy(() => import("@/components/page/NotFound"));

export default function Preview({ params: { slug } }: Readonly<ISlugParams>) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const handleGet = async () => {
      try {
        const response = await axios.get(`/api/short-link/${slug}`);
        if (response.status === 200 && response.data.sourceLink !== "") {
          window.location.replace(response.data.sourceLink);
        }
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        console.error("Error get data:", error.message);
      }
    };
    handleGet();
  }, [slug]);

  if (loading) {
    return <Loading />;
  } else {
    return <NotFound />;
  }
}
