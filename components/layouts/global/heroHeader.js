import React from "react";
import Link from "next/link";
import Image from "next/image";
export default function heroHead() {
  return (
    <section className="text-gray-700 body-font dark:bg-gray-800">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900 dark:text-gray-100">
            Learning should be Interactive{" "}
            <br className="hidden lg:inline-block" />
            for Devs
          </h1>
          <p className="mb-8 leading-relaxed dark:text-gray-400">
            Start learning for free with interactive courses full of Examples
            and challenges. Videos are good for entertainment but not for
            learning. Stop wasting time and learn with interesting content for
            Free.
          </p>
          <div className="flex justify-center">
            <Link href="/enter/">
              <a className="inline-flex transition-all duration-200 text-white cursor-pointer bg-primary-600 border-0 py-2 px-10 focus:outline-none hover:bg-primary-700 rounded-full text-lg font-semibold">
                Enter Free
              </a>
            </Link>
            <Link href="/learn/">
              <a className="ml-4 hidden transition-all duration-200 md:flex items-center cursor-pointer text-gray-700 bg-gray-100 dark:bg-gray-600 dark:text-gray-300 border-0 py-2 px-10 font-semibold focus:outline-none hover:bg-gray-300 rounded-full text-lg">
                Courses
              </a>
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 w-5/6">
          <Image src="/home1.svg" width="938" height="625" />
        </div>
      </div>
    </section>
  );
}
