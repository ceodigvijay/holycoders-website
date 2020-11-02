import React, { useState, useContext, useEffect } from "react";
import Layout from "../components/layouts/layout";
import { useRouter } from "next/router";
import GlobalContext from "../contexts/globalContext";
import { GoogleLogin } from "react-google-login";
import { GitHubLoginButton, GoogleLoginButton } from "../components/index";
import {
  loginWithGoogle,
  preRegisterWithEmail,
  registerWithEmail,
  checkUsername,
  verifyToken,
} from "../lib/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faEnvelope,
  faUser,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
export default function signup() {
  const router = useRouter();
  const { setUser, addNotification } = useContext(GlobalContext);
  const token = router.query.token;
  const [authData, setAuthData] = useState({
    token: token,
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [dataValidation, setDataValidation] = useState({
    startedTypingName: false,
    startedTypingUsername: false,
    usernameValid: false,
    startedTypingPassword: false,
    passwordValid: false,
  });
  useEffect(() => {
    const verifyTokenFromAPI = async (token) => {
      try {
        const res = await verifyToken(token);
        if (res.data && res.data.email) {
          setAuthData({ ...authData, email: res.data.email });
        }
      } catch (error) {
        addNotification({
          message: "Token Invalid or expired.",
          type: "error",
        });
      }
    };
    if (token) {
      verifyTokenFromAPI(token);
    }
  }, [token]);
  async function handleSubmit(e) {
    e.preventDefault();
    let res;
    try {
      res = await preRegisterWithEmail(authData.email);
    } catch (error) {
      addNotification({
        message: "Some error occured. Please try Social login or contact us.",
        type: "error",
      });
    }
    console.log(res);
  }

  async function checkUsernameAvailability(username) {
    try {
      var resData = await checkUsername(username);
      const available = resData.data.available;
      setDataValidation({
        ...dataValidation,
        startedTypingUsername: true,
        usernameValid: available,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function handleRegister(e) {
    e.preventDefault();
    try {
      const registerData = await registerWithEmail(
        token,
        authData.name,
        authData.username,
        authData.password
      );
      if (registerData.data.result.ok) {
        addNotification({
          message: "Registration Successful.",
          type: "success",
        });
      }
    } catch (error) {
      console.log(error.response);
      addNotification({
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : "Some error occured. Please try social login or Contact us.",
        type: "error",
      });
    }
  }

  async function handleGoogleLogin(res) {
    let serverRes;
    try {
      serverRes = await loginWithGoogle(res.tokenId);
    } catch (error) {
      addNotification({
        message: "Some error occured. Please try again or contact us.",
        type: "error",
      });
    }
    if (serverRes && serverRes.status === 200 && serverRes.data) {
      await setUser(serverRes.data);
      await localStorage.setItem("hc_user", JSON.stringify(serverRes.data));
      setNotificationValue({
        message: "Successfully Joined.",
        type: "Success",
      });
      if (redirectTo) {
        router.push(redirectTo);
      }
    } else {
      setNotificationValue({
        message: "Some error occured. Please try again or contact us.",
        type: "error",
      });
    }
  }
  return (
    <Layout>
      <div className="auth container">
        {!token ? (
          <>
            <h1 className="title">Join the Community</h1>
            <div className="social-login-container">
              <GitHubLoginButton
                onClick={() =>
                  router.push(
                    `https://github.com/login/oauth/authorize?client_id=${"32f59064e1acbe54d309"}&scope=user:email`
                  )
                }
              />
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
                  console.log(res);
                }}
                cookiePolicy={"single_host_origin"}
              />
            </div>
            {/* <span class="login-email-message has-text-grey">
              Enter your email to get unique Signup link.
            </span>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                onChange={(e) =>
                  setAuthData({ ...authData, email: e.target.value })
                }
                value={authData.email}
                name="email"
                className="has-background-grey-lighter"
                placeholder="Email"
              />
              <button
                onClick={handleSubmit}
                type="submit"
                value="Login"
                class="button is-primary is-outlined login-button"
              >
                Get Signup Link
              </button>
            </form>
            <div
              class="utility-btn has-text-grey mt-5"
              onClick={() => router.push("/login")}
            >
              Already have an account
            </div> */}
            <div
              class="utility-btn has-text-grey mt-5"
              onClick={() => router.push("/login")}
            >
              Why we don't have Email/Password Login?
            </div> 
          </>
        ) : (
          <>
            <h1 className="title">Enter your details</h1>
            <form onSubmit={handleRegister}>
              <div className="control has-icons-left has-icons-right ">
                <input
                  className="input is-success"
                  type="text"
                  onChange={(e) => {
                    if (e.target.value.length > 0) {
                      setDataValidation({
                        ...dataValidation,
                        startedTypingName: true,
                      });
                    } else {
                      setDataValidation({
                        ...dataValidation,
                        startedTypingName: false,
                      });
                    }
                    setAuthData({ ...authData, name: e.target.value });
                  }}
                  value={authData.name}
                  name="name"
                  placeholder="Name"
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                {dataValidation.startedTypingName ? (
                  <span className="icon is-small is-right">
                    <FontAwesomeIcon icon={faCheckCircle} color="#36a666" />
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="control has-icons-left has-icons-right ">
                <input
                  className="input is-success"
                  type="text"
                  onChange={(e) => {
                    checkUsernameAvailability(e.target.value);
                    setAuthData({ ...authData, username: e.target.value });
                  }}
                  value={authData.username}
                  name="username"
                  placeholder="Username"
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                {dataValidation.startedTypingUsername &&
                dataValidation.usernameValid ? (
                  <span className="icon is-small is-right">
                    <FontAwesomeIcon icon={faCheckCircle} color="#36a666" />
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="control has-icons-left has-icons-right ">
                <input
                  className="input is-success"
                  type="password"
                  onChange={(e) => {
                    if (e.target.value.length > 4) {
                      setDataValidation({
                        ...dataValidation,
                        startedTypingPassword: true,
                      });
                    }

                    setAuthData({ ...authData, password: e.target.value });
                  }}
                  value={authData.password}
                  name="password"
                  placeholder="Password"
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faKey} />
                </span>
                {dataValidation.startedTypingPassword && authData.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)? (
                  <span className="icon is-small is-right">
                    <FontAwesomeIcon icon={faCheckCircle} color="#36a666" />
                  </span>
                ) : (
                  ""
                )}
              </div>

              <div className="control has-icons-left has-icons-right ">
                <input
                  className="input is-success"
                  type="email"
                  onChange={(e) =>
                    setAuthData({ ...authData, email: e.target.value })
                  }
                  value={authData.email}
                  name="email"
                  placeholder="Email"
                  disabled
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <span className="icon is-small is-right">
                  <FontAwesomeIcon icon={faCheckCircle} color="#36a666" />
                </span>
              </div>

              <button
                type="submit"
                value="Login"
                class="button is-primary is-outlined login-button"
              >
                Join
              </button>
            </form>
          </>
        )}
      </div>
    </Layout>
  );
}
