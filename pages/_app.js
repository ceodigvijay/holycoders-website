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
  console.log("Into the _app component.");
  const router = useRouter();
  const [theme, setTheme] = useState("light");
  const [user, setUserValue] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [globalState, setGlobalState] = useState({
    user: null,
    showLoginPopup: false,
  });

  const _removeNotification = (toastId) => {
    const newArr = notifications.filter((el) => {
      return el.id !== toastId;
    });
    console.log(newArr);
    console.log("Deleted " + toastId);
    setNotifications(newArr);
  };

  const addNotification = ({ message, type }) => {
    var toastId = Date.now().toString(16);
    setNotifications([
      ...notifications,
      { message: message, type: type, id: toastId },
    ]);
    //Remove Toast after x seconds
    // setTimeout(() => {
    //   _removeNotification(toastId);
    // }, 3000);
  };

  useEffect(() => {
    if (
      !user &&
      typeof window !== "undefined" &&
      localStorage.getItem("hc_user")
    ) {
      setUserValue(JSON.parse(localStorage.getItem("hc_user")));
    }
  }, []);
  axios.interceptors.request.use(
    (request) => {
      // Edit request config
      return request;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);
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
          console.log("Not found");
          break;
        case 500:
          console.log("Ah! snap. Server crashed.");
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
      {notifications.length != 0 ? <Toast /> : ""}
      <Component {...pageProps} />
    </GlobalContext.Provider>
  );
}

export default MyApp;
