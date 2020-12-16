import React from "react";
import { useContext } from "react";
import axios from "axios";
import GlobalContext from "../contexts/globalContext";
import { useRouter } from "next/router";

export async function useUser({ redirectAfterLogin, flashMessage } = {}) {
  const { globalState, setGlobalState } = useContext(GlobalContext);
  // const router = useRouter();
  if (globalState.user) {
    return globalState.user;
  } else {
    try {
      const res = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/verify`,
        withCredentials: true,
      });
      await setGlobalState({ ...globalState, user: res.data });
      await localStorage.setItem("hc_user", JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  }
  return null;
}
