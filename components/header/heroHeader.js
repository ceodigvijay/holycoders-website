import React from "react";
import HomePageIcon from "../icons/homepage";
import Image from "next/image";
import Link from "next/link";
export default function heroHead() {
  return (
    <section className="text-gray-700 body-font dark:bg-gray-800">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 dark:text-gray-100">
            Be the part of Community that
            <br className="hidden lg:inline-block" />
            codes for a change.
          </h1>
          <p className="mb-8 leading-relaxed dark:text-gray-400">
            The community is for programmers who want to learn and share new
            things with others while enjoying learning new things. Something
            great is on our roadmap to showcase your creativity while competing
            and contributing to community.
          </p>
          <div className="flex justify-center">
            <Link href="/enter/">
              <a className="inline-flex text-white cursor-pointer bg-primary-600 border-0 py-2 px-6 focus:outline-none hover:bg-primary-700 rounded text-lg">
                Join Community
              </a>
            </Link>
            <Link href="/blog/">
              <a className="ml-4 inline-flex cursor-pointer text-gray-700 bg-gray-200 dark:bg-gray-600 dark:text-gray-300 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg">
                Visit Blog
              </a>
            </Link>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <Image src="/home1.svg" width="720" height="600" />
        </div>
      </div>
    </section>
  );
}
