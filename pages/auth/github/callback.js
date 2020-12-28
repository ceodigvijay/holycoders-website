import React, { useState, useContext, useEffect } from "react";
import Layout from "../../../components/layouts/layout";
import axios from "axios";
import { useRouter } from "next/router";
import UserContext from "../../../contexts/globalContext";

function authGit() {
  const router = useRouter();
  const { setUser, addNotification } = useContext(UserContext);
  useEffect(() => {
    const loginUser = async () => {
      axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/github-login`,
        withCredentials: true,
        data: {
          code: router.query.code,
        },
      })
        .then(async (res) => {
          await setUser(res.data);
          await localStorage.setItem("hc_user", JSON.stringify(res.data));
          await addNotification({
            message: "Successfully logged in",
            type: "Success",
          });
          router.push("/dashboard");
        })
        .catch((error) => {
          addNotification({
            message: "Some error occured. Please Contact us.",
            type: "error",
          });
          router.push("/");
        });
    };
    if (router.query.code) {
      loginUser();
    }
  }, [router.query.code]);

  return (
    <Layout>
      <div className="text-center text-2xl text-gray-800 dark:text-gray-100 min-h-screen font-medium mt-20">
        Please wait for Log in...
      </div>
    </Layout>
  );
}

export default authGit;
