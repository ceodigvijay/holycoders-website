import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function TopNavigation() {
  const router = useRouter();
  return (
    <div className="flex align-middle items-center justify-between sticky top-0 mx-auto bg-gray-50 text-gray-600 px-2 py-3">
      {/* Go Back Button */}
      <Link href="/dashboard/course">
        <a className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="mx-2 text-base">Back</span>
        </a>
      </Link>
      <button
        className="flex items-center"
        onClick={() => {
          router.push(`${router.asPath.split("?lesson")[0]}`, undefined, {
            shallow: true,
          });
        }}
      >
        <span className="mx-2 text-base">Course Info</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </button>
    </div>
  );
}
