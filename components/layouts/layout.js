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
    <>
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
      <main className="dark:bg-gray-800">{children}</main>
      {/* Footer */}
      <footer className="footer bg-gray-50 pt-10 pb-2 dark:bg-gray-800">
        <div className="footer__connect mx-2 p-2">
          <h2 className="title-font text-3xl text-gray-500 dark:text-gray-400 text-center">
            Find Us on Social Networks
          </h2>
          <div className="flex flex-wrap justify-center">
            <div>
              <a
                className="is-facebook mx-4 px-6 py-4 rounded-md font-semibold flex items-center"
                href="https://www.facebook.com/HolyCoders-103402337844119/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="mx-2">
                  <FontAwesomeIcon icon={faFacebookF} />
                </span>
                <span>Facebook</span>
              </a>
            </div>
            <div>
              <a
                className="is-github mx-4 px-6 py-4 rounded-md font-semibold flex items-center"
                href="https://github.com/ceodigvijay"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="mx-2">
                  <FontAwesomeIcon icon={faGithub} />
                </span>
                <span>Github</span>
              </a>
            </div>
            <div>
              <a
                className="is-twitter mx-4 px-6 py-4 rounded-md font-semibold flex items-center"
                href="https://twitter.com/holycoders"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="mx-2">
                  <FontAwesomeIcon icon={faTwitter} />
                </span>
                <span>Twitter</span>
              </a>
            </div>
            <div>
              <a
                className="is-instagram mx-4 px-6 py-4 rounded-md font-semibold flex items-center"
                href="https://www.instagram.com/holy_coders/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="mx-2">
                  <FontAwesomeIcon icon={faInstagram} />
                </span>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
        <div className="container px-5 py-4 mx-auto">
          <div className="flex flex-wrap md:text-left text-center order-first">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900 mb-3">
                <span className="title-font text-2xl font-semibold text-gray-800 dark:text-gray-100 ">
                  HolyCoders
                </span>
              </h2>
              <p className="mt-2 text-md text-gray-600 dark:text-gray-400 mb-4">
                Holycoders is a programming blog dedicated to simplify learning
                for coders. You can learn new things easily explained with
                examples and interactive tutorials.
              </p>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                Information
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link href="/privacy-policy/">
                    <a className="text-gray-600 hover:text-gray-800  dark:text-gray-400 dark:hover:text-gray-100">
                      Privacy Policy
                    </a>
                  </Link>
                </li>
                <li>
                  <a
                    href="/sitemap.xml"
                    className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    Sitemap
                  </a>
                </li>
                <li>
                  <Link href="/disclosure/">
                    <a className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100">
                      Disclosure
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/about/">
                    <a className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100">
                      About us
                    </a>
                  </Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                Navigate
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link href="/blog/">
                    <a className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100">
                      Blog
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/learn/">
                    <a className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100">
                      Courses
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/news/">
                    <a className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100">
                      News
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/case-study/">
                    <a className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100">
                      Case Studies
                    </a>
                  </Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                Quick Links
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link href="/contact/">
                    <a className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100">
                      Contact
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/enter/">
                    <a className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100">
                      Sign up
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/report/">
                    <a className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100">
                      Report an Issue
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/snippets/">
                    <a className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100">
                      Code Snippets
                    </a>
                  </Link>
                </li>
              </nav>
            </div>
          </div>
        </div>

        <div className="footer-copyright bg-primary-600 text-center py-4 mt-2 mx-2">
          Copyright {new Date().getFullYear()} &nbsp; &bull; &nbsp; Created by
          <a
            href="https://www.linkedin.com/in/ceodigvijay/"
            rel="norefferer noopener"
            className="font-bold"
          >
            {" "}Digvijay Singh{" "}
          </a>{" "}
          with ❤️
        </div>
      </footer>
      <style jsx>{`
        .footer__connect button {
          width: 120px;
        }
        .footer__connect a {
          margin: 30px 30px;
          display: inline-block;
          color: #fff !important;
        }
        .footer-copyright {
          font-weight: 500;
          color: #fff;
          border-radius: 5px;
        }
      `}</style>
    </>
  );
}
