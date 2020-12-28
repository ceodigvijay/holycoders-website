import React, { useState, useContext } from "react";
import { useUser } from "../../hooks/useUser";
import Link from "next/link";
import { useRouter } from "next/router";
import DashboardLayout from "../../components/layouts/dashboardLayout";
function dashboard() {
  // useUser();
  const router = useRouter();
  return (
    <DashboardLayout>
      <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-12 lg:px-6 lg:py-10">
        <div className="flex flex-col max-w-screen-lg overflow-hidden bg-white dark:bg-gray-600 border dark:border-gray-600 rounded shadow-sm lg:flex-row sm:mx-auto">
          <div className="relative lg:w-1/2">
            <img
              src="/content/images/others/dashboard-featured.jpg"
              alt=""
              className="object-cover w-full lg:absolute h-80 lg:h-full"
            />
            <svg
              className="absolute top-0 right-0 hidden h-full text-white dark:text-gray-900 lg:inline-block"
              viewBox="0 0 20 104"
              fill="currentColor"
            >
              <polygon points="17.3036738 5.68434189e-14 20 5.68434189e-14 20 104 0.824555778 104" />
            </svg>
          </div>
          <div className="flex flex-col justify-center p-8 bg-white dark:bg-gray-900 lg:p-16 lg:pl-10 lg:w-1/2">
            <div>
              <p className="inline-block dark:text-gray-200 px-3 py-px mb-4 text-xs font-semibold tracking-wider uppercase rounded-full">
                Hearty Welcome
              </p>
            </div>
            <h5 className="mb-3 text-3xl font-extrabold leading-none sm:text-4xl dark:text-gray-100">
              Community of Devs
            </h5>
            <p className="mb-5 text-gray-800 dark:text-gray-200">
              The community is for programmers who want to learn and share new
              things with others while enjoying learning new things. Something
              great is on our roadmap to showcase your creativity while
              competing and contributing to community.
            </p>
            {/* <div className="flex items-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-primary-400 hover:bg-primary-700 focus:shadow-outline focus:outline-none"
              >
                Get started
              </button>
              <a
                href="/"
                aria-label=""
                className="inline-flex items-center font-semibold transition-colors duration-200 text-primary-400 hover:text-deep-purple-800"
              >
                Learn More
                <svg
                  className="inline-block w-3 ml-2"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                </svg>
              </a>
            </div> */}
          </div>
        </div>
      </div>

      {/* 
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                2.7K
              </h2>
              <p className="leading-relaxed">Users</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                1.8K
              </h2>
              <p className="leading-relaxed">Subscribes</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                35
              </h2>
              <p className="leading-relaxed">Downloads</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                4
              </h2>
              <p className="leading-relaxed">Products</p>
            </div>
          </div>
        </div>
      </section> */}
    </DashboardLayout>
  );
}

export default dashboard;
