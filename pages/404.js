import React, { useEffect } from "react";
import Link from "next/link";
import * as gtag from "../gtag";
import { useRouter } from "next/router";

export default function notfound() {
  const router = useRouter();
  useEffect(() => {

    gtag.event({
      action: "Error 404 Triggered",
      category: "Error",
      label: "404 on " + router.asPath,
    });
  }, [router.asPath]);

  return (
    <>
      <div className="text-center h-screen  flex flex-col justify-center items-center">
        <div className="text-3xl md:text-5xl text-gray-700 font-semibold lg:text-6xl dark:text-gray-100">
          Page Not Found
        </div>
        
        <Link href="/">
          <a className="px-6 py-3 rounded-full my-8 font-bold text-lg bg-primary-400 hover:bg-primary-500 uppercase text-white">
            GO TO HOME
          </a>
        </Link>
      </div>
    </>
  );
}
