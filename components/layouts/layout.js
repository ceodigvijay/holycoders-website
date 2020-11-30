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
import {
  faFacebook,
  faFacebookF,
  faGithub,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function Layout({ children, home }) {
  const { globalState, setGlobalState } = useContext(GlobalContext);
  const closeLoginPopup = (e) => {
    e.preventDefault();
    setGlobalState({ ...globalState, showLoginPopup: false });
  };
  return (
    <div>
      <header className="header">
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
      <div
        className={`modal fadeInScale ${
          globalState.showLoginPopup ? "is-active" : ""
        }`}
      >
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
      <footer className="footer mt-6">
        <div className="footer__social has-text-centered px-4 py-6 mb-6 panel">
          <h2 className="title is-3">Find Us on Social Networks</h2>
          <div className="columns">
            <div className="column">
              <a
                className="button is-facebook mx-4"
                href="https://www.facebook.com/HolyCoders-103402337844119/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faFacebookF} />
                </span>
                <span>Facebook</span>
              </a>
            </div>
            <div className="column">
              <a
                className="button is-github mx-4"
                href="https://github.com/ceodigvijay"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faGithub} />
                </span>
                <span>Github</span>
              </a>
            </div>
            <div className="column">
              <a
                className="button is-twitter mx-4"
                href="https://twitter.com/holycoders"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faTwitter} />
                </span>
                <span>Twitter</span>
              </a>
            </div>
            <div className="column">
              <a
                className="button is-instagram mx-4"
                href="https://www.instagram.com/holy_coders/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faInstagram} />
                </span>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
        <div className="columns my-6">
          <div className="column">
            <h3 className="title is-4 ">About Us</h3>
            <p className="has-text-center">
              Holycoders is a programming blog dedicated to simplify learning
              for coders. You can learn new things easily explained with
              examples and interactive tutorials.
            </p>
          </div>
          <div className="column">
            <h3 className="title is-4 ">Information</h3>
            <ul>
              <li>
                <Link href="/privacy-policy/">
                  <a>Privacy Policy</a>
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml">Sitemap</a>
              </li>

              <li>
                <Link href="/disclosure/">
                  <a>Disclosure</a>
                </Link>
              </li>
              <li>
                <Link href="/about/">
                  <a>About Us</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="column">
            <h3 className="title is-4 ">Navigate</h3>
            <ul>
              <li>
                <Link href="/blog/">
                  <a>Blog</a>
                </Link>
              </li>
              <li>
                <Link href="/learn/">
                  <a>Courses</a>
                </Link>
              </li>
              <li>
                <Link href="/login/">
                  <a>Login</a>
                </Link>
              </li>
              <li>
                <Link href="/join/">
                  <a>Signup</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="column">
            <h3 className="title is-4 ">Quick Links</h3>
            <ul>
              <li>
                <Link href="/contact/">
                  <a>Contact</a>
                </Link>
              </li>
              <li>
                <Link href="/join/">
                  <a>Signup</a>
                </Link>
              </li>
              <li>
                <Link href="/report/">
                  <a>Report an Issue</a>
                </Link>
              </li>
              <li>
                <Link href="/learn/website-hacking-and-security/">
                  <a>Website Hacking and Prevention Course</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-copyright has-text-centered py-4 panel mt-6">
          Copyright {new Date().getFullYear()} &nbsp; &bull; &nbsp; Created by
          Digvijay Singh with ❤️ in 🇮🇳
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
        .modal {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          visibility: hidden;
        }
        .modal .modal-background {
          -webkit-transition: all 0.3s;
          -o-transition: all 0.3s;
          transition: all 0.3s;
          opacity: 0;
        }
        .modal.is-active {
          visibility: visible;
        }
        .modal.is-active .modal-background {
          opacity: 1;
        }
        .modal.modal-full-screen .modal-background {
          background-color: #fff;
        }
        .modal.modal-full-screen .modal-content {
          width: 100%;
          height: 100%;
          max-height: 100vh;
          margin: 0;
          background-color: #fff;
        }
        .modal.fadeInScale .modal-content {
          -webkit-transform: scale(0.7);
          -o-transform: scale(0.7);
          transform: scale(0.7);
          opacity: 0;
          -webkit-transition: all 0.3s;
          -o-transition: all 0.3s;
          transition: all 0.3s;
        }
        .modal.fadeInScale.is-active .modal-content {
          -webkit-transform: scale(1);
          -o-transform: scale(1);
          transform: scale(1);
          opacity: 1;
        }
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
        .footer__social {
          border-radius: 5px;
          border: 1px dotted #36a666;
          background-color: #fff;
        }
        .footer__social button {
          width: 120px;
        }
        .footer__social a {
          color: #fff !important;
        }
        .button {
          border-radius: 5px;
        }
        .footer-copyright {
          font-weight: 500;
          background-color: #36a666;
          color: #fff;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
}
