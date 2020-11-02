import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../header/navbar";
import HeroHeader from "../header/heroHeader";
import GlobalContext from "../../contexts/globalContext";
import { GitHubLoginButton, GoogleLoginButton } from "../index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginIcon from "../icons/login.js";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";

export default function Layout({ children, home }) {
  const { globalState, setGlobalState } = useContext(GlobalContext);
  const closeLoginPopup = (e) => {
    e.preventDefault();
    setGlobalState({ ...globalState, showLoginPopup: false });
  };
  return (
    <div>
      <header>
        {home ? (
          <>
            <Navbar />
            <HeroHeader />
          </>
        ) : (
          <Navbar />
        )}
      </header>
      <main>{children}</main>
      {/* Modal */}
      <div className={`modal ${globalState.showLoginPopup ? "is-active" : ""}`}>
        <div
          className="modal-background"
          onClick={(e) => closeLoginPopup(e)}
        ></div>
        <div className="modal-content">
          <div className="login-modal has-background-white px-5 py-5 has-text-centered	">
            <h2 className="title is-2">Login to continue</h2>
            <LoginIcon />

            <div className="button-container">
              <GoogleLoginButton
                onClick={() => alert("Google Login Clicked")}
              />
              <GitHubLoginButton
                onClick={() => alert("Github Login Clicked")}
              />

              <button className="button email-login mt-5 px-6 py-4">
                <span className="icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <span>More Ways to Login</span>
              </button>
            </div>
            <h3 className="subtitle is-6">
              We respect your data and privacy by following tranparent culture.
            </h3>
          </div>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={(e) => closeLoginPopup(e)}
        ></button>
      </div>
      {/* Footer */}
      <footer className="footer has-background-primary mt-6">
        <div className="has-text-centered has-text-white">
          <h2 className="title is-2 has-text-white">HolyCoders</h2>
          <div className="columns">
            <div className="column">
              <h3 className="title is-4 has-text-white">About Us</h3>
              <p className="has-text-center">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className="column">
              <h3 className="title is-4 has-text-white">Important</h3>
              <ul>
                <li>
                  <a href="#">Link</a>
                </li>
                <li>
                  <a href="#">Link</a>
                </li>
                <li>
                  <a href="#">Link</a>
                </li>
                <li>
                  <a href="#">Link</a>
                </li>
              </ul>
            </div>
            <div className="column">
              <h3 className="title is-4 has-text-white">Important</h3>
              <ul>
                <li>
                  <a href="#">Link</a>
                </li>
                <li>
                  <a href="#">Link</a>
                </li>
                <li>
                  <a href="#">Link</a>
                </li>
                <li>
                  <a href="#">Link</a>
                </li>
              </ul>
            </div>
            <div className="column">
              <h3 className="title is-4 has-text-white">Subscribe</h3>

              <div className="control has-icons-left has-icons-left">
                <input
                  className="input is-medium"
                  type="email"
                  placeholder="Email"
                />
                <span className="icon is-small is-left">
                  <FontAwesomeIcon icon={faEnvelopeOpen} />
                </span>
              </div>
              <a className="button is-success is-rounded mt-2">Subscribe</a>
            </div>
          </div>
        </div>
      </footer>
      {/* {!home && (
        <div>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )} */}
      <style jsx>{`
        .login-modal {
          border-radius: 5px;
        }
        .button-container {
          max-width: 300px;
          margin: 0 auto;
        }
        .email-login {
          margin-top: 40px;
          border: none;
          width: 100%;
        }
        .subtitle {
          margin-top: 30px;
          color: #a0a0a0;
        }
        .footer a {
          color: inherit;
        }
      `}</style>
    </div>
  );
}
