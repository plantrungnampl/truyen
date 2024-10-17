"use client";
import React from "react";
// import { Button } from "./ui/button";
// import { useRouter } from "next/navigation";
import { PaginationProps } from "./MangaList";
import Link from "next/link";

const Paganation: React.FC<PaginationProps> = ({ category }) => {
  // const router = useRouter();

  // const handleClick = () => {
  //   router.push(`/collection/${category}`);
  // };
  return (
    <div className="flex justify-center items-center space-x-2 mt-4 ">
      <div className="">
        <Link
          href={`/collection/${category}`}
          className="bg-slate-200 w-96 p-2 text-center rounded "
          prefetch={true}

          // onClick={handleClick}
        >
          Xem Thêm
        </Link>
      </div>
    </div>
  );
};
export default Paganation;
