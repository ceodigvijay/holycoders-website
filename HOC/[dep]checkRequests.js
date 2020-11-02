import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const checkRequests = (Wrapped) => {
  function CheckRequests(props) {
    const router = useRouter();
    //To ensure interceptors added only once
    if (axios.interceptors.request.handlers.length === 0) {
      axios.interceptors.request.use(
        (request) => {
          console.log(request);
          // Edit request config
          return request;
        },
        (error) => {
          console.log(error);
          return Promise.reject(error);
        }
      );
    }
    //To ensure interceptors added only once
    if (axios.interceptors.response.handlers.length === 0) {
      axios.interceptors.response.use(
        (response) => {
          console.log(response);
          return response;
        },
        (error) => {
          switch (error.response.status) {
            case 401:
              console.log("You need to login to acceess");
              router.push("/login");
              break;
            case 500:
              console.log("Ah! snap. Server crashed again.");
              break;
            default:
              break;
          }
          return Promise.reject(error);
        }
      );
    }

    return <Wrapped {...props} />;
  }
  return CheckRequests;
};

export default checkRequests;
