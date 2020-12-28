import React, { useState, useContext } from "react";
import Layout from "../components/layouts/layout";
import { useUser } from "../hooks/useUser";
import axios from "axios";
import GlobalContext from "../contexts/globalContext";
import { useRouter } from "next/router";
function logout() {
  const { user, setUser } = useContext(GlobalContext);
  const router = useRouter();
  const handleLogout = async () => {
    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/logout`,
      withCredentials: true,
    })
      .then((res) => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
    if (typeof window !== "undefined" && localStorage.getItem("hc_user")) {
      localStorage.removeItem("hc_user");
    }
  };

  return (
    <Layout>
      <div className="text-center h-screen">
        {user ? (
          <div className="mt-20">
            <h1 className="title text-2xl align-middle font-medium text-gray-600 dark:text-gray-200">
              Do you really want to Logout?
            </h1>
              <button
                onClick={handleLogout}
                className="flex items-center mx-auto px-6 py-4 text-lg bg-red-600 hover:bg-red-700 text-white rounded-lg my-6 font-medium"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 mx-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </span>
                <span>Confirm Logout</span>
              </button>
          </div>
        ) : (
          <h1 className="title text-2xl align-middle font-medium text-gray-600 dark:text-gray-200 mt-20">
            Logged out :(.
          </h1>
        )}
      </div>

      <style jsx>{`
        .logout-container {
          min-height: 80vh;
        }
      `}</style>
    </Layout>
  );
}

export default logout;
