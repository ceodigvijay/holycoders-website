import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function heroHead() {
  return (
    <section className="text-gray-700 body-font dark:bg-gray-800">
      <div className="container mx-auto flex px-5 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-12 mt-2 md:mb-0 md:mt-0 items-center text-center">
          <Link href="/learn">
            <a className="bg-blue-100 rounded-full pr-4 pl-2 py-1 my-4">
              <span className="bg-blue-500 text-white px-2 mr-2 rounded-full">
                New
              </span>
              Python Course for Beginners
            </a>
          </Link>
          <h1 className="title-font sm:text-6xl text-4xl mb-4 font-bold text-gray-800 dark:text-gray-100">
            Learn{" "}
            <br className=" inline-block" />
            New Skills{" "}
            <br className=" inline-block" />
            Faster and Better
          </h1>
          {/* <p className="mb-8 leading-relaxed dark:text-gray-500 text-lg">
            Videos are good for entertainment but not for
            learning. Stop wasting time and learn with interesting content for
            Free.
          </p> */}
          <div className="flex  justify-center my-6">
            <Link href="/enter/">
              <a className="inline-flex items-center transition-all duration-200 text-white cursor-pointer bg-primary-500 border-0 py-3 px-12 focus:outline-none hover:bg-primary-400 rounded-full text-lg font-semibold">
                <span>Get Started</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 w-5/6">
          <Image src="/home3.svg" width="600" height="600" />
        </div>
      </div>
    </section>
  );
}
