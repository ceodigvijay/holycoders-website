import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layouts/layout";
import { verifyEmail } from "../../lib/index";
export default function email() {
  const router = useRouter();
  const [verifyState, setVerifyState] = useState("verifying");
  const [errorMessage, setErrorMessage] = useState(
    "Some error occured. Please Contact us."
  );
  const token = router.query.token;
  useEffect(() => {
    const getData = async () => {
      try {
        console.log("Getting Data");
        const response = await verifyEmail(token);
        if (response.data.ok) {
          setVerifyState("success");
        }
      } catch (error) {
        error.response.data.message
          ? setErrorMessage(error.response.data.message)
          : "";
        setVerifyState("error");
        console.log(error.response);
      }
    };
    if (token) {
      getData();
    }
  }, [token]);
  if (verifyState === "verifying") {
    return <Layout>Welcome verifying</Layout>;
  } else if (verifyState === "success") {
    return <Layout>Success Verified</Layout>;
  } else {
    return <Layout>{errorMessage}</Layout>;
  }
}
