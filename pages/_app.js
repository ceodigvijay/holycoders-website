import "tailwindcss/tailwind.css";
import "./styles.scss";
import React, { useState, useEffect } from "react";
import Router from "next/router";
import Head from "next/head";
import NProgress from "nprogress";
import axios from "axios";
import GlobalContext from "../contexts/globalContext";
import { useRouter } from "next/router";
import Toast from "../components/toast/toast";
// import "react-datepicker/dist/react-datepicker.css";

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  // console.log("Into the _app component.");
  const router = useRouter();
  const [theme, setTheme] = useState("light");
  const [user, setUserValue] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [globalState, setGlobalState] = useState({
    user: null,
    showLoginPopup: false,
  });

  const addNotification = ({ message, type }) => {
    var toastId = Date.now().toString(16);
    setNotifications([
      ...notifications,
      { message: message, type: type, id: toastId },
    ]);
  };

  useEffect(() => {
    if (
      !user &&
      typeof window !== "undefined" &&
      localStorage.getItem("hc_user")
    ) {
      //TODO: If not found check using verify and set again
      setUserValue(JSON.parse(localStorage.getItem("hc_user")));
    }
  }, []);
  axios.interceptors.request.use(
    (request) => {
      // Edit request config
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      switch (error.response.status ? error.response.status : 500) {
        case 401:
          //If Auth token is missing (removed by expiry) then remove user value from localstorage
          if (
            typeof window !== "undefined" &&
            error.response.data.exception &&
            error.response.data.exception === "authTokenMissing"
          ) {
            setUserValue(null);
            localStorage.removeItem("hc_user");
          }
          break;
        case 404:
          break;
        case 500:
          break;
        default:
          break;
      }
      return Promise.reject(error);
    }
  );
  return (
    <GlobalContext.Provider
      value={{
        user: user,
        setUser: setUserValue,
        notification: notifications,
        setNotificationValue: setNotifications,
        addNotification: addNotification,
        globalState: globalState,
        setGlobalState: setGlobalState,
      }}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {notifications.length != 0 ? <Toast /> : ""}
      <Component {...pageProps} />
    </GlobalContext.Provider>
  );
}

export default MyApp;
