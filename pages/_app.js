import "../styles/tw/twdist/style.css";
import "./styles.scss";
// import "./content.sass";
import React, { useState, useEffect } from "react";
import Router from "next/router";
import Head from "next/head";
import NProgress from "nprogress";
import axios from "axios";
import GlobalContext from "../contexts/globalContext";
import CourseContext from "../contexts/courseContext";
import { useRouter } from "next/router";
import Toast from "../components/toast/toast";
import * as gtag from "../gtag";
// import "react-datepicker/dist/react-datepicker.css";

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [theme, setTheme] = useState("light");
  const [courseData, setCourseData] = useState(null);
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
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!user && localStorage.getItem("hc_user")) {
        //TODO: If not found check using verify and set again
        setUserValue(JSON.parse(localStorage.getItem("hc_user")));
      } else if (localStorage.getItem("hc_theme")) {
        const theme = localStorage.getItem("hc_theme");
        theme === "dark"
          ? document.querySelector("html").classList.add("dark")
          : document.querySelector("html").classList.remove("dark");
      }
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
      switch (
        error && error.response && error.response.status
          ? error.response.status
          : 500
      ) {
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
        courseData: courseData,
        setCourseData: setCourseData,
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
        <meta
          name="ahrefs-site-verification"
          content="97473de6617eef41d8688c662fd27bd47e79467ca44bea60a475cc957ab38eb3"
        ></meta>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      {notifications.length != 0 ? <Toast /> : ""}
      <Component {...pageProps} />
    </GlobalContext.Provider>
  );
}

export default MyApp;
