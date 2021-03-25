import React, { useContext, useState } from "react";
import Link from "next/link";
import GlobalContext from "../../contexts/globalContext";
import { useRouter } from "next/router";
import Layout from "./global/index";
import AuthWrapper from "./authWrapper";
export default function dashboardLayout({ children }) {
  const router = useRouter();
  const route = router.asPath.split("/").reverse()[1];
  const [currentRoute, setCurrentRoute] = useState(route);
  const { user, globalState, setGlobalState } = useContext(GlobalContext);
  const dashNavs = [
    {
      title: "Dashboard",
      link: "/dashboard/",
      isProtected: false,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-8 h-8"
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
      title: "Posts",
      link: "/dashboard/posts/",
      isProtected: true,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-8 h-8 "
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
      title: "Pages",
      link: "/dashboard/pages/",
      isProtected: true,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-8 h-8 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      title: "Tags",
      link: "/dashboard/tags/",
      isProtected: true,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
          />
        </svg>
      ),
    },
    {
      title: "Courses",
      link: "/dashboard/course/",
      isProtected: true,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-8 h-8"
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
      title: "Users",
      link: "/dashboard/users/",
      isProtected: true,

      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-8 h-8 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
  ];
  return (
    <Layout>
      <AuthWrapper>
        <div className="bg-primary-6 px-2 py-2 min-h-screen grid grid-cols-5 gap-2">
          <nav className="col-span-1">
            <ul className="flex-col items-center justify-start">
              {dashNavs.map((element) => {
                var isActive =
                  currentRoute === element.link.split("/").reverse()[1];
                return element.isProtected &&
                  user &&
                  !["admin", "editor"].includes(user.role) ? (
                  ""
                ) : (
                  <li key={element.link}>
                    <Link href={element.link}>
                      <a
                        className={`flex items-center px-6 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700  ${
                          isActive
                            ? "text-gray-700 bg-gray-100 dark:text-gray-200 font-semibold"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        <span className="mx-1">{element.icon}</span>
                        <span className="text-lg mx-1">{element.title}</span>
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <main className="dashboard-content md:px-2 pt-4 pb-40 col-span-4">
            {children}
          </main>
        </div>
      </AuthWrapper>
    </Layout>
  );
}
