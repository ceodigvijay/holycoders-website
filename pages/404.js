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
        <div className="text-3xl md:text-5xl lg:text-6xl dark:text-gray-100">
          Error 404
        </div>
        <Link href="/">
          <a className="border-2 border-primary-100 px-4 py-2 rounded-lg my-4 hover:bg-primary-600 hover:text-white">
            Back to home
          </a>
        </Link>
      </div>
    </>
  );
}
