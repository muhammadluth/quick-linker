import React from "react";
import Image from "next/image";

export function TableDataNotFound() {
  return (
    <div className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 w-full">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
        // className="flex-row justify-center"
      >
        <Image
          src="/images/img-404.webp"
          width={200}
          height={200}
          alt="not found"
        />
      </div>
    </div>
  );
}
