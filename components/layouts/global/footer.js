import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGithub,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

let darkThemeEnabled = false;
if (typeof window !== "undefined") {
  const theme = localStorage.getItem("hc_theme");
  theme === "dark" ? (darkThemeEnabled = true) : "";

  theme === "dark"
    ? document.querySelector("html").classList.add("dark")
    : document.querySelector("html").classList.remove("dark");
}

const handleThemeChange = (toDarkTheme) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("hc_theme", toDarkTheme ? "dark" : "light");
    toDarkTheme
      ? document.querySelector("html").classList.add("dark")
      : document.querySelector("html").classList.remove("dark");
  }
};
export default function FooterComponent() {
  return (
    <>
      {/* Footer */}
      <footer className="footer bg-gray-50 pt-10 pb-2 dark:bg-gray-800">
        <div className="footer__connect mx-2 p-2">
          <h2 className="title-font text-3xl text-gray-500 dark:text-gray-400 text-center">
            Find Us on Social Networks
          </h2>
          <div className="flex flex-wrap justify-center">
            <div>
              <a
                className="is-facebook px-6 py-4 rounded-md text-lg font-semibold flex items-center"
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
                className="is-github px-6 py-4 rounded-md text-lg font-semibold flex items-center"
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
                className="is-twitter px-6 py-4 rounded-md text-lg font-semibold flex items-center"
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
                className="is-instagram px-6 py-4 rounded-md text-lg font-semibold flex items-center"
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
                <span className="title-font text-2xl font-semibold text-gray-800 dark:text-gray-100 mr-2">
                  HolyCoders
                </span>
                {/* Toogle Button */}

                <label
                  htmlFor="toogleA"
                  className="flex items-center cursor-pointer"
                >
                  <div className="relative">
                    <input
                      defaultChecked={darkThemeEnabled}
                      id="toogleA"
                      type="checkbox"
                      className="hidden"
                      onClick={(e) => handleThemeChange(e.target.checked)}
                    />
                    <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                    <div className="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 text-yellow-700 dark:hidden"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 dark:text-gray-100 hidden dark:block"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3 text-gray-700 font-medium"></div>
                </label>
                {/* Toggle ends here */}
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
          <span>
            {" "}
            Copyright {new Date().getFullYear()} &nbsp; &bull; &nbsp; Created by
            <a
              href="https://www.linkedin.com/in/ceodigvijay/"
              rel="norefferer noopener"
              className="font-bold"
            >
              {" "}
              Digvijay Singh{" "}
            </a>{" "}
            with ❤️
          </span>
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
