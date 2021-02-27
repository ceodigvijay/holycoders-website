import React, { useContext, useState } from "react";
import Link from "next/link";
import UserContext from "../../contexts/globalContext";
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
      slug: "/dashboard/",
      name: "Dashboard",
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
      slug: `/u/${user && user.username ? user.username : ""}/posts/`,
      name: "Posts",
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
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
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
                        className={`flex items-center ${
                          currentPath &&
                          currentPath === element.slug.split("/")[1]
                            ? "text-primary-600"
                            : "text-gray-600"
                        }  hover:bg-white dark:hover:bg-gray-600 dark:text-gray-200 hover:text-primary-600 px-2 py-4 rounded text-lg font-bold`}
                      >
                        <span className="mx-1">{element.icon}</span>
                        <span className="mx-1">{element.name}</span>
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
            {/* Leaderboard Button */}
            <Link href="/leaderboard">
              <a className="mx-4 flex items-center hover:bg-gray-100 rounded-md p-4">
                <svg
                  className="w-4 h-4 mx-2 text-yellow-500 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0"
                  y="0"
                  enableBackground="new 0 0 490.2 490.2"
                  version="1.1"
                  viewBox="0 0 490.2 490.2"
                  xmlSpace="preserve"
                >
                  <path d="M385.85 0h-281.6v45H8.05v73.9c0 53.1 43.2 96.3 96.3 96.3h12.5c18.2 40.1 54.5 70.2 98.6 79.6v60.4h-34.5c-10.6 0-19.3 8.6-19.3 19.3v25.3h-29.6v90.4h226v-90.4h-29.5v-25.3c0-10.6-8.6-19.3-19.3-19.3h-34.5v-60.4c44.1-9.5 80.4-39.5 98.6-79.6h12.5c53.1 0 96.3-43.2 96.3-96.3V45h-96.3V0zm-281.6 166.5c-26.2 0-47.5-21.3-47.5-47.5V93.8h47.5v63.5c0 3.1.1 6.2.3 9.2h-.3zm179.9 237.9v48.4h-78.2v-48.4h78.2zm24.8-277.9l-28.9 24.4 9.1 36.7c1.7 6.9-5.9 12.4-11.9 8.6l-32.1-20-32.1 20c-6 3.8-13.6-1.7-11.9-8.6l9.1-36.7-28.9-24.4c-5.4-4.6-2.6-13.5 4.5-14l37.7-2.7 14.3-35c2.7-6.6 12-6.6 14.7 0l14.3 35 37.7 2.7c7 .6 9.8 9.4 4.4 14zm124.4-32.7V119c0 26.2-21.3 47.5-47.5 47.5h-.3c.2-3 .3-6.1.3-9.2V93.8h47.5z"></path>
                </svg>
                <span>Leaderboard</span>
              </a>
            </Link>
            {/* Leaderboard Button End */}
            {/* Toogle Button */}
            {/*             
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
            </label> */}
            {/* Toggle ends here */}

            {/* Profile dropdown */}
            {!user ? (
              <Link href="/enter">
                <a className="button bg-white rounded p-2 font-bold">
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
                  <Link
                    href={`/u/${user && user.username ? user.username : ""}/`}
                  >
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
                        <span className="font-bold text-lg">
                          Digvijay Singh
                        </span>
                        <span className="text-gray-500">Level 6</span>
                      </div>
                    </a>
                  </Link>

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
                      return (
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
