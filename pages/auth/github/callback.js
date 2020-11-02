import React, { useState, useContext, useEffect } from "react";
import Layout from "../../../components/layouts/layout";
import axios from "axios";
import { useRouter } from "next/router";
import UserContext from "../../../contexts/globalContext";

function authGit() {
  const router = useRouter();
  const { setUser, setNotificationValue } = useContext(UserContext);

  console.log(router.query.code);
  if (router.query.code) {
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
      await setNotificationValue({
        message: "Successfully logged in",
        type: "Success",
      });
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Layout>
      <div>Please Wait Github auth</div>
    </Layout>
  );
}

export default authGit;
