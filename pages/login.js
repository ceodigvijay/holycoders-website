import React, { useState, useContext, useEffect } from "react";
import Layout from "../components/layouts/layout";
import { useUser } from "../hooks/useUser";
import GlobalContext from "../contexts/globalContext";
import { useRouter } from "next/router";
import { GoogleLogin } from "react-google-login";
import { GitHubLoginButton, GoogleLoginButton } from "../components/index";
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
    let res;
    e.preventDefault();
    try {
      res = await loginWithUsername(username, password);
    } catch (error) {
      addNotification({
        message: "Some error occured. Please contact us.",
        type: "error",
      });
    }
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
    console.log(serverRes);
  }

  return (
    <Layout>
      <div className="auth container">
        <h1 className="title">Welcome back Coder</h1>
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
        <span class="login-email-message has-text-grey">Login with Email</span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            name="email"
            placeholder="Email"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            placeholder="Password"
          />
          <button
            type="submit"
            value="Login"
            class="button is-primary is-outlined login-button"
          >
            Sign In
          </button>
        </form>
        <div class="forgot-password has-text-grey mt-5">Forgot Password</div>
        <div
          class="utility-btn has-text-grey mt-5"
          onClick={() => router.push("/login")}
        >
          Why we don't have Email/Password Login?
        </div>
      </div>
    </Layout>
  );
}

export default login;
