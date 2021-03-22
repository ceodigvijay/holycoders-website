import React, { useState, useContext, useEffect } from "react";
import Layout from "../components/layouts/global/index";
import { useUser } from "../hooks/useUser";
import GlobalContext from "../contexts/globalContext";
import { useRouter } from "next/router";
import { GoogleLogin } from "react-google-login";
import { GitHubLoginButton, GoogleLoginButton } from "../components/index";
import TwitterLoginButton from "../components/buttons/twitterLogin";
import { loginWithGoogle, loginWithUsername } from "../lib/index";

function login({ redirectTo } = {}) {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== undefined && localStorage.getItem("hc_user")) {
      router.push("/");
    }
  });

  const { setUser, addNotification } = useContext(GlobalContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      var res = await loginWithUsername(username, password);

      if (res && res.status === 200 && res.data) {
        await setUser(res.data);
        await localStorage.setItem("hc_user", JSON.stringify(res.data));
        await addNotification({
          message: "Successfully logged in",
          type: "Success",
        });
        if (redirectTo) {
          router.push(redirectTo);
        }
      } else {
        await addNotification({
          message: "Some error occured. Please contact us.",
          type: "error",
        });
      }
    } catch (error) {
      console.log(error.response.status);
      addNotification({
        message: "Some error occured. Please contact us.",
        type: "error",
      });
    }
  }

  async function handleGoogleLogin(res) {
    let serverRes;
    try {
      serverRes = await loginWithGoogle(res.tokenId);
      if (serverRes && serverRes.status === 200 && serverRes.data) {
        await setUser(serverRes.data);
        await localStorage.setItem("hc_user", JSON.stringify(serverRes.data));
        addNotification({
          message: "Successfully logged in",
          type: "Success",
        });
        if (redirectTo) {
          router.push(redirectTo);
        }
      } else {
        addNotification({
          message: "Some internal error occured. Please contact us.",
          type: "error",
        });
      }
    } catch (error) {
      let message = "Some error occured. Please Contact us.";
      error && error.response && error.response.data.error
        ? (message = error.response.data.error)
        : "";
      addNotification({
        message: message,
        type: "error",
      });
    }
  }

  return (
    <Layout>
      <div className="text-center max-w-md min-h-screen m-auto pt-12">
        <div className=""></div>
        <svg
          className="w-32 h-32 inline-block"
          version={1.0}
          xmlns="http://www.w3.org/2000/svg"
          width="500px"
          height="500px"
          viewBox="0 0 5000 5000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            id="layer101"
            className="fill-current text-primary-600"
            stroke="none"
          >
            <path d="M0 2500 l0 -2500 2500 0 2500 0 0 2500 0 2500 -2500 0 -2500 0 0 -2500z" />
          </g>
          <g id="layer102" fill="#fefefe" stroke="none">
            <path
              className="fill-current text-white dark:text-gray-800"
              d="M0 2500 l0 -2500 2500 0 2500 0 0 2500 0 2500 -2500 0 -2500 0 0 -2500z m3730 2245 c434 -76 787 -415 874 -839 9 -40 59 -655 111 -1367 89 -1193 96 -1302 85 -1395 -20 -183 -78 -332 -183 -469 -130 -170 -351 -300 -567 -335 -89 -14 -3011 -14 -3100 0 -226 36 -441 164 -576 343 -98 131 -169 316 -180 471 -6 85 176 2614 197 2729 36 206 131 386 287 549 158 164 358 274 571 312 118 22 2360 22 2481 1z"
            />
            <path d="M1234 3989 c-101 -13 -189 -80 -220 -166 -29 -82 -23 -106 160 -640 96 -279 177 -515 181 -524 5 -14 -6 -17 -69 -22 -95 -7 -149 -35 -192 -99 -91 -135 -24 -293 143 -340 21 -6 94 -13 162 -17 l124 -6 196 -561 c202 -577 208 -591 288 -666 89 -85 245 -98 342 -27 83 60 121 187 92 306 -9 35 -288 860 -318 941 -4 10 58 12 306 10 l311 -3 179 -535 c98 -294 190 -558 204 -586 14 -28 50 -73 80 -100 89 -82 197 -102 304 -58 112 47 182 192 153 319 -6 28 -163 498 -349 1045 -186 547 -343 1019 -350 1048 -15 73 -14 110 8 158 26 56 73 78 155 72 207 -17 427 -273 581 -677 49 -130 60 -147 110 -176 86 -51 221 -48 297 7 33 23 68 89 68 128 0 38 -71 241 -126 360 -201 437 -454 694 -769 782 -103 29 -288 35 -396 14 -199 -41 -363 -153 -442 -304 -56 -107 -71 -171 -71 -297 1 -135 14 -185 128 -505 l84 -235 -87 -3 c-47 -1 -189 1 -315 5 l-228 8 -14 35 c-7 19 -97 280 -199 580 -102 300 -193 560 -203 578 -23 46 -94 110 -145 132 -54 23 -99 28 -163 19z" />
          </g>
        </svg>

        <h1 className="title text-4xl uppercase font-semibold my-8 text-gray-800 dark:text-gray-200">
          Sign in to continue
        </h1>
        <div className="social-login-container">
          <GoogleLogin
            clientId="885921349889-e662rdgo7ccc2gd2i97dgl4glkue0isk.apps.googleusercontent.com"
            buttonText="Login"
            render={(renderProps) => (
              <GoogleLoginButton
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              />
            )}
            onSuccess={handleGoogleLogin}
            onFailure={(res) => {
              // addNotification({
              //   message: "Some error occured in logging in. Please Contact us.",
              //   type: "error",
              // });
            }}
            cookiePolicy={"single_host_origin"}
          />
          <GitHubLoginButton
            onClick={() =>
              router.push(
                `https://github.com/login/oauth/authorize?client_id=${
                  process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
                    ? process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
                    : "32f59064e1acbe54d309"
                }&scope=user:email`
              )
            }
          />
          <TwitterLoginButton />
        </div>
        {/* <div class="has-text-grey my-6">
          We don't have email password login. OAuth logins are convenient for
          both developers and users.
        </div> */}
      </div>
      <style jsx>{`
        .auth {
          max-width: 450px;
        }
      `}</style>
    </Layout>
  );
}

export default login;
