import React from "react";
import Layout from "../components/layouts/global/index";

function leaderboard() {
  var users = [...Array(97).keys()];
  return (
    <Layout>
      <div className="min-h-screen">
        <div>3 Users on top</div>
        <div className="">
          {users.map((u) => {
            return (
              <div className="max-w-4xl my-8 m-auto flex items-center justify-between px-4 py-4 shadow-md rounded-md">
                <div className="flex items-center">
                  {/* Day's Position Change */}
                  {/* <div className="flex flex-col">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 text-primary-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                    <span className="text-gray-400">34</span>
                  </div> */}
                  <div className="mx-4 font-bold text-gray-600 text-3xl">0{u+1}</div>
                  <div className="flex items-center">
                      <img src="/diggi.jpeg" className="w-12 h-12 rounded-full mx-1" />
                      <span className="text-gray-600 text-2xl mx-2">Digvijay Singh</span>
                      {/* <span className="bg-blue-400 px-3 text-white font-extrabold rounded-md">Pro</span> */}
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary-600">6655</div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default leaderboard;
