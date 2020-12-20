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

      {/* Footer */}
      <footer className="footer mt-6">
        <div className="footer__connect">
          <h2 className="title-font text-3xl font-semibold text-center">
            Find Us on Social Networks
          </h2>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <a
                className="button is-facebook mx-2 inline-flex items-center"
                href="https://www.facebook.com/HolyCoders-103402337844119/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebookF} className="h-6 w-6 mx-2" />
                <span>Facebook</span>
              </a>
            </div>
            <div>
              <a
                className="button is-github mx-2 inline-flex items-center"
                href="https://github.com/ceodigvijay"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} className="h-6 w-6 mx-2" />
                <span>Github</span>
              </a>
            </div>
            <div>
              <a
                className="button is-twitter mx-4 inline-flex items-center"
                href="https://twitter.com/holycoders"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faTwitter} className="h-6 w-6 mx-2" />
                <span>Twitter</span>
              </a>
            </div>
            <div>
              <a
                className="button is-instagram mx-2 inline-flex items-center"
                href="https://www.instagram.com/holy_coders/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} className="h-6 w-6 mx-2" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
        <div className="container px-5 py-4 mx-auto">
          <div className="flex flex-wrap md:text-left text-center order-first">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                <span className="title-font text-2xl font-semibold text-gray-800 mb-3">
                  HolyCoders
                </span>
              </a>
              <p className="mt-2 text-md text-gray-500">
                Holycoders is a programming blog dedicated to simplify learning
                for coders. You can learn new things easily explained with
                examples and interactive tutorials.
              </p>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font text-2xl font-semibold text-gray-800 mb-3">
                Information
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link href="/privacy-policy/">
                    <a className="text-gray-600 hover:text-gray-800">
                      Privacy Policy
                    </a>
                  </Link>
                </li>
                <li>
                  <a
                    href="/sitemap.xml"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Sitemap
                  </a>
                </li>
                <li>
                  <Link href="/disclosure/">
                    <a className="text-gray-600 hover:text-gray-800">
                      Disclosure
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/about/">
                    <a className="text-gray-600 hover:text-gray-800">
                      About us
                    </a>
                  </Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font text-2xl font-semibold text-gray-800 mb-3">
                Navigate
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link href="/blog/">
                    <a className="text-gray-600 hover:text-gray-800">Blog</a>
                  </Link>
                </li>
                <li>
                  <Link href="/learn/">
                    <a className="text-gray-600 hover:text-gray-800">Courses</a>
                  </Link>
                </li>
                <li>
                  <Link href="/enter/">
                    <a className="text-gray-600 hover:text-gray-800">
                      Go to Dashboard
                    </a>
                  </Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font text-2xl font-semibold text-gray-800 mb-3">
                Quick Links
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link href="/contact/">
                    <a className="text-gray-600 hover:text-gray-800">Contact</a>
                  </Link>
                </li>
                <li>
                  <Link href="/enter/">
                    <a className="text-gray-600 hover:text-gray-800">Sign up</a>
                  </Link>
                </li>
                <li>
                  <Link href="/report/">
                    <a className="text-gray-600 hover:text-gray-800">
                      Report an Issue
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/learn/website-hacking-and-security/">
                    <a className="text-gray-600 hover:text-gray-800">
                      Website Hacking and Prevention Course
                    </a>
                  </Link>
                </li>
              </nav>
            </div>
          </div>
        </div>

        <div className="footer-copyright text-center py-4 my-2 mx-2">
          Copyright {new Date().getFullYear()} &nbsp; &bull; &nbsp; Created by
          Digvijay Singh with ❤️ in 🇮🇳
        </div>
      </footer>
      <style jsx>{`
        .footer__connect {
          padding: 20px;
          margin: 30px 20px;
          border-radius: 5px;
          border: 1px dotted #36a666;
          background-color: #fff;
        }
        .footer__connect button {
          width: 120px;
        }
        .footer__connect a {
          margin: 30px 30px;
          color: #fff !important;
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