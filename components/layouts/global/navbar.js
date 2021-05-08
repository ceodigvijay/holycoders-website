import React, { useContext, useState } from "react";
import Link from "next/link";
import UserContext from "../../../contexts/globalContext";
import { useRouter } from "next/router";

export default function navbar() {
  const [navState, setNavState] = useState({
    navopen: false,
    userNavOpen: false,
    megaMenuOpen: false,
  });
  const router = useRouter();

  const currentPath = router.asPath.split("/")[1];
  const { user } = useContext(UserContext);
  const navLinks = [
    {
      slug: "/",
      name: "",
      icon: (
        <svg
          className="w-12 h-12 inline-block"
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
              className="fill-current text-white dark:text-gray-700"
              d="M0 2500 l0 -2500 2500 0 2500 0 0 2500 0 2500 -2500 0 -2500 0 0 -2500z m3730 2245 c434 -76 787 -415 874 -839 9 -40 59 -655 111 -1367 89 -1193 96 -1302 85 -1395 -20 -183 -78 -332 -183 -469 -130 -170 -351 -300 -567 -335 -89 -14 -3011 -14 -3100 0 -226 36 -441 164 -576 343 -98 131 -169 316 -180 471 -6 85 176 2614 197 2729 36 206 131 386 287 549 158 164 358 274 571 312 118 22 2360 22 2481 1z"
            />
            <path d="M1234 3989 c-101 -13 -189 -80 -220 -166 -29 -82 -23 -106 160 -640 96 -279 177 -515 181 -524 5 -14 -6 -17 -69 -22 -95 -7 -149 -35 -192 -99 -91 -135 -24 -293 143 -340 21 -6 94 -13 162 -17 l124 -6 196 -561 c202 -577 208 -591 288 -666 89 -85 245 -98 342 -27 83 60 121 187 92 306 -9 35 -288 860 -318 941 -4 10 58 12 306 10 l311 -3 179 -535 c98 -294 190 -558 204 -586 14 -28 50 -73 80 -100 89 -82 197 -102 304 -58 112 47 182 192 153 319 -6 28 -163 498 -349 1045 -186 547 -343 1019 -350 1048 -15 73 -14 110 8 158 26 56 73 78 155 72 207 -17 427 -273 581 -677 49 -130 60 -147 110 -176 86 -51 221 -48 297 7 33 23 68 89 68 128 0 38 -71 241 -126 360 -201 437 -454 694 -769 782 -103 29 -288 35 -396 14 -199 -41 -363 -153 -442 -304 -56 -107 -71 -171 -71 -297 1 -135 14 -185 128 -505 l84 -235 -87 -3 c-47 -1 -189 1 -315 5 l-228 8 -14 35 c-7 19 -97 280 -199 580 -102 300 -193 560 -203 578 -23 46 -94 110 -145 132 -54 23 -99 28 -163 19z" />
          </g>
        </svg>
      ),
    },
    {
      slug: "/learn/",
      name: "Courses",
      isBeta: true,
      icon: "",
    },
    {
      slug: "/blog/",
      name: "Blog",
      icon: "",
    },
  ];
  const mobileNavLinks = [
    {
      slug: "/",
      name: "",
      icon: (
        <svg
          className="w-6 h-6 inline-block"
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
              className="fill-current text-white dark:text-gray-700"
              d="M0 2500 l0 -2500 2500 0 2500 0 0 2500 0 2500 -2500 0 -2500 0 0 -2500z m3730 2245 c434 -76 787 -415 874 -839 9 -40 59 -655 111 -1367 89 -1193 96 -1302 85 -1395 -20 -183 -78 -332 -183 -469 -130 -170 -351 -300 -567 -335 -89 -14 -3011 -14 -3100 0 -226 36 -441 164 -576 343 -98 131 -169 316 -180 471 -6 85 176 2614 197 2729 36 206 131 386 287 549 158 164 358 274 571 312 118 22 2360 22 2481 1z"
            />
            <path d="M1234 3989 c-101 -13 -189 -80 -220 -166 -29 -82 -23 -106 160 -640 96 -279 177 -515 181 -524 5 -14 -6 -17 -69 -22 -95 -7 -149 -35 -192 -99 -91 -135 -24 -293 143 -340 21 -6 94 -13 162 -17 l124 -6 196 -561 c202 -577 208 -591 288 -666 89 -85 245 -98 342 -27 83 60 121 187 92 306 -9 35 -288 860 -318 941 -4 10 58 12 306 10 l311 -3 179 -535 c98 -294 190 -558 204 -586 14 -28 50 -73 80 -100 89 -82 197 -102 304 -58 112 47 182 192 153 319 -6 28 -163 498 -349 1045 -186 547 -343 1019 -350 1048 -15 73 -14 110 8 158 26 56 73 78 155 72 207 -17 427 -273 581 -677 49 -130 60 -147 110 -176 86 -51 221 -48 297 7 33 23 68 89 68 128 0 38 -71 241 -126 360 -201 437 -454 694 -769 782 -103 29 -288 35 -396 14 -199 -41 -363 -153 -442 -304 -56 -107 -71 -171 -71 -297 1 -135 14 -185 128 -505 l84 -235 -87 -3 c-47 -1 -189 1 -315 5 l-228 8 -14 35 c-7 19 -97 280 -199 580 -102 300 -193 560 -203 578 -23 46 -94 110 -145 132 -54 23 -99 28 -163 19z" />
          </g>
        </svg>
      ),
    },
    {
      slug: "/blog/",
      name: "Blog",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      slug: "/news/",
      name: "News",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      ),
    },
    {
      slug: "/learn/",
      name: "Courses",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="w-6 h-6"
          stroke="currentColor"
        >
          <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path
            fill="#fff"
            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
          />
        </svg>
      ),
    },
    {
      slug: "/case-study/",
      name: "Case Study",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
    },
    {
      slug: "/snippets/",
      name: "Code Snippets",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
    },
  ];
  const megaCol1 = [
    {
      slug: "/snippets",
      name: "Code Snippets",
      description: "Code to help in rapid development",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-8 h-8 inline-block text-primary-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
    },
    {
      slug: "/case-study/",
      name: "Case Study",
      description: "In depth articles, bulk of knowledge",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-8 h-8 inline-block text-primary-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
    },
    {
      slug: "/learn/",
      name: "Courses",
      description: "Learn new things with ease",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="w-8 h-8 inline-block text-primary-100"
          stroke="currentColor"
        >
          <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path
            fill="#fff"
            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
          />
        </svg>
      ),
    },
    {
      slug: "/news/",
      name: "News",
      description: "Latest programming news for you",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="w-8 h-8 inline-block text-primary-100"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      ),
    },
  ];

  const userLinks = [
    {
      slug: `/u/${user && user.username ? user.username : ""}/`,
      name: "Profile",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 inline-block text-primary-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      slug: "/dashboard/",
      name: "Dashboard",
      isProtected: true,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 inline-block text-primary-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
    },
    {
      slug: "/u/library/",
      name: "Library",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 inline-block text-primary-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
    },
    {
      slug: `/u/setting/`,
      name: "Setting",
      icon: (
        <svg
          className="w-6 h-6 inline-block text-primary-100"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      slug: `/logout/`,
      name: "Logout",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 inline-block text-primary-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      ),
    },
    {
      slug: `/report/`,
      name: "Report an issue",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 inline-block text-primary-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
    },
  ];

  return (
    <nav
      className={` ${
        currentPath ? "" : ""
      }  text-gray-600 px-2  py-1 border-primary-400 dark:bg-gray-700 relative`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative flex items-center justify-between py-1 sm:mr-5 h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <button
              onClick={() =>
                setNavState({ ...navState, navopen: !navState.navopen })
              }
              className={`inline-flex items-center justify-center px-2 mx-2 rounded-md text-gray-800 dark:text-gray-100  focus:outline-none`}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon of menu */}
              {!navState.navopen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:block sm:ml-1">
              <div className="flex space-x-4 items-center">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                {navLinks.map((element) => {
                  return (
                    <Link href={element.slug} key={element.slug}>
                      <a
                        className={`flex relative items-center ${
                          currentPath &&
                          currentPath === element.slug.split("/")[1]
                            ? "text-primary-600"
                            : "text-gray-600"
                        }  hover:bg-white dark:hover:bg-gray-600 dark:text-gray-200 hover:text-primary-600 px-2 py-4 rounded text-lg font-bold`}
                      >
                        <span className="mx-1">{element.icon}</span>
                        <span className="mx-1">{element.name}</span>
                        {/* {element.isBeta ? <span className="animate-ping w-2 h-2 rounded-full bg-primary-600 absolute top-0 right-0"></span> : ""} */}
                      </a>
                    </Link>
                  );
                })}
                {/* Mega Menu */}
                <div
                  onMouseEnter={() =>
                    setNavState({ ...navState, megaMenuOpen: true })
                  }
                  onMouseLeave={() =>
                    setNavState({ ...navState, megaMenuOpen: false })
                  }
                  className="hover:bg-white dark:hover:bg-gray-600 dark:text-gray-200 hover:text-primary-600 cursor-pointer px-2 py-4 rounded text-lg"
                >
                  <div className="flex items-center mx-2 font-bold">
                    <span>More</span>
                    {navState.megaMenuOpen ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 mx-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 mx-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </div>
                  <div
                    className={`transition-all duration-200 ${
                      navState.megaMenuOpen
                        ? "visible opacity-100 top-16"
                        : "invisible opacity-0 top-20"
                    } absolute left-10 rounded-lg z-50`}
                  >
                    <div className="grid grid-cols-12 rounded-lg">
                      <div className="col-span-12 lg:col-span-4 bg-gray-700 px-6 py-4 hidden md:block rounded-l-lg"></div>
                      <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-gray-900 p-6">
                        <ul>
                          {megaCol1.map((item) => {
                            return (
                              <li key={item.slug}>
                                <Link href={item.slug}>
                                  <a className="px-4 flex items-center rounded-lg hover:bg-gray-800 py-4 cursor-pointer">
                                    <span className="bg-primary-600 mr-4 rounded-lg px-2 py-2">
                                      {item.icon}
                                    </span>
                                    <span className="flex flex-nowrap flex-col text-lg text-gray-100">
                                      <span>{item.name}</span>
                                      <span className="text-sm text-gray-400">
                                        {item.description}
                                      </span>
                                    </span>
                                  </a>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-gray-700 p-6 hidden md:block rounded-r-lg"></div>
                    </div>
                  </div>
                </div>
                {/* Mega Menu Ends */}
              </div>
            </div>
          </div>
          <div className="group absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            {!user ? (
              <Link href="/enter">
                <a className="rounded-full p-2 font-bold mx-2 inline-flex py-2 px-6 text-lg border-2 border-gray-200 hover:bg-primary-400 hover:border-primary-400 dark:text-gray-200 hover:text-white transition-all duration-500">
                  Dashboard
                </a>
              </Link>
            ) : (
              <div
                onMouseEnter={() =>
                  setNavState({
                    ...navState,
                    userNavOpen: true,
                  })
                }
                onClick={() =>
                  setNavState({
                    ...navState,
                    userNavOpen: !navState.userNavOpen,
                  })
                }
                onMouseLeave={() =>
                  setNavState({
                    ...navState,
                    userNavOpen: false,
                  })
                }
                className="ml-3 relative cursor-pointer"
              >
                <div
                  className="flex text-sm rounded-md focus:outline-none px-4 py-2"
                  id="user-menu"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
            
                    <a className="flex items-center">
                      <img
                        className="h-12 w-12 rounded-full"
                        src={
                          user && user.profileImage
                            ? user.profileImage
                            : "/content/images/dummy/user.svg"
                        }
                        alt="user"
                      />
                      <div className="flex flex-col mx-2">
                        <span className="font-bold text-lg dark:text-gray-200">
                          {user.username ? user.username : "No Name"}
                        </span>
                        <span className="text-gray-500 dark:text-gray-200">{user.role}</span>
                      </div>
                    </a>

                  <div
                    className={`transition-all duration-200 ${
                      navState.userNavOpen
                        ? "visible opacity-100 top-16"
                        : "invisible opacity-0 top-20"
                    } origin-top-right absolute right-0  w-60 z-50 rounded-lg shadow-lg border-2 border-gray-200 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100  ring-1 ring-black ring-opacity-5`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    {userLinks.map((item) => {
                      return item.isProtected &&
                        user &&
                        !["admin", "editor", "teacher"].includes(user.role) ? (
                        ""
                      ) : (
                        <Link href={item.slug} key={item.slug}>
                          <a
                            className="flex items-center px-2 py-2 md:text-lg hover:bg-gray-100  dark:hover:bg-gray-800  font-semibold"
                            role="menuitem"
                          >
                            <span className="bg-primary-600 text-center flex items-center rounded-lg mx-2 px-2 py-2">
                              {item.icon}
                            </span>
                            <span className="mx-2">{item.name}</span>
                          </a>
                        </Link>
                      );
                    })}
                  </div>
                </div>
                {/*
                  Profile dropdown panel, show/hide based on dropdown state.
                  Entering: "transition ease-out duration-100"
                    From: "transform opacity-0 scale-95"
                    To: "transform opacity-100 scale-100"
                  Leaving: "transition ease-in duration-75"
                    From: "transform opacity-100 scale-100"
                    To: "transform opacity-0 scale-95"
                */}
              </div>
            )}
          </div>
        </div>
      </div>
      {/*
        Mobile menu, toggle classes based on menu state.
        Menu open: "block", Menu closed: "hidden"
      */}
      <div
        className={`${
          navState.navopen ? "block" : "hidden"
        } shadow-lg rounded-lg`}
      >
        <div className="px-1 pt-2 pb-3 space-y-1">
          {mobileNavLinks.map((element) => {
            return (
              <Link href={element.slug} key={element.slug}>
                <a className="text-gray-600 dark:text-white flex items-center px-3 py-3 hover:text-green-500 hover:bg-white rounded-sm text-base font-semibold">
                  <span className="mx-2">{element.icon}</span>
                  <span className="mx-1">
                    {element.name ? element.name : "Home"}
                  </span>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
