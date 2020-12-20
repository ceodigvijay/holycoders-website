import React, { useContext, useState } from "react";
import Link from "next/link";
import UserContext from "../../contexts/globalContext";
import { useRouter } from "next/router";

export default function navbar() {
  const [navState, setNavState] = useState({
    navopen: false,
    userNavOpen: false,
  });
  const router = useRouter();
  const currentPath = router.asPath.split("/")[1];
  const { user } = useContext(UserContext);
  const navLinks = [
    {
      slug: "/",
      name: "HolyCoders",
    },
    {
      slug: "/blog/",
      name: "Blog",
    },
    {
      slug: "/learn/",
      name: "Courses",
    },
    {
      slug: "/tags/",
      name: "Tags",
    },
  ];
  return (
    <nav className="bg-green-500 rounded-md mx-2 my-2">
      <div className="max-w-7xl mx-auto">
        <div className="relative flex items-center justify-between py-1 sm:mr-5 h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <button
              onClick={() =>
                setNavState({ ...navState, navopen: !navState.navopen })
              }
              className={`inline-flex items-center justify-center px-2 mx-2 rounded-md text-white  focus:outline-none`}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed. */}
              {/*
      Heroicon name: menu

      Menu open: "hidden", Menu closed: "block"
    */}
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
              <div className="flex space-x-4">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                {navLinks.map((element) => {
                  return (
                    <Link href={element.slug}>
                      <a
                        className={`${
                          currentPath === element.slug.split("/")[1]
                            ? "bg-white text-green-600"
                            : ""
                        } text-white hover:bg-white hover:text-green-600 px-3 py-4 rounded text-lg font-bold`}
                      >
                        {element.name}
                      </a>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="group absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            {!user ? (
              <Link href="/enter">
                <a className="button bg-white rounded p-2 font-bold">
                  Dashboard
                </a>
              </Link>
            ) : (
              <div className="ml-3 relative">
                <div>
                  <button
                    onClick={() =>
                      setNavState({
                        ...navState,
                        userNavOpen: !navState.userNavOpen,
                      })
                    }
                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none"
                    id="user-menu"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-12 w-12 rounded-full"
                      src={user.profileImage}
                      alt="user"
                    />
                  </button>
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
                <div
                  className={`${
                    navState.userNavOpen ? "block" : "hidden"
                  } origin-top-right absolute right-0  w-48 mt-4 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <Link href={`/u/${user.username}/`}>
                    <a
                      className="block px-4 py-2 md:text-lg hover:bg-gray-100 font-semibold text-green-500"
                      role="menuitem"
                    >
                      Profile
                    </a>
                  </Link>
                  <Link href={`/u/${user.username}/posts/`}>
                    <a
                      className="block px-4 py-2 md:text-lg hover:bg-gray-100 font-semibold text-green-500"
                      role="menuitem"
                    >
                      Posts
                    </a>
                  </Link>
                  <Link href="/dashboard/">
                    <a
                      className="block px-4 py-2 md:text-lg hover:bg-gray-100 font-semibold text-green-500"
                      role="menuitem"
                    >
                      Dashboard
                    </a>
                  </Link>
                  <Link href="/logout/">
                    <a
                      className="block px-4 py-2 md:text-lg hover:bg-gray-100 font-semibold text-green-500"
                      role="menuitem"
                    >
                      Log out
                    </a>
                  </Link>
                  <Link href="/report/">
                    <a
                      href="#"
                      className="block px-4 py-2 md:text-lg hover:bg-gray-100 font-semibold text-green-500"
                      role="menuitem"
                    >
                      Report an issue
                    </a>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/*
    Mobile menu, toggle classes based on menu state.

    Menu open: "block", Menu closed: "hidden"
  */}
      <div className={`${navState.navopen ? "block" : "hidden"}`}>
        <div className="px-1 pt-2 pb-3 space-y-1">
          {navLinks.map((element) => {
            return (
              <Link href={element.slug}>
                <a className="text-white block px-3 py-3 hover:text-green-500 hover:bg-white rounded-sm text-base font-semibold">
                  {element.name}
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
