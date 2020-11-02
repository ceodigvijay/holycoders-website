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
        console.log(res.data);
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
      <div className="logout-container is-centered has-text-centered my-6">
        {user ? (
          <>
            <h1 className="title is-3 has-text-grey">
              Do you really want to Logout?
            </h1>
            <button
              onClick={handleLogout}
              className="button is-large is-danger my-6"
            >
              Confirm Logout
            </button>
          </>
        ) : (
          <h1 className="title is-3 has-text-grey">
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
