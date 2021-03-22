import React from "react";
import Layout from "../global/index";
import Link from "next/link";
import { useRouter } from "next/router";

export default function libraryLayout({ children }) {
  const router = useRouter();
  var currentPath = router.asPath.split("/").reverse()[1];
  const sidebarLinks = [
    {
      title: "My Courses",
      slug: "courses",
      icon: (
        <svg
          className="w-8 h-8 text-indigo-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
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
      title: "Bookmarks",
      slug: "bookmarks",
      icon: (
        <svg
          className="w-8 h-8 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      ),
    },
    {
      title: "Liked Items",
      slug: "liked",
      icon: (
        <svg
          className="w-8 h-8 text-red-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
    {
      title: "Saved Notes",
      slug: "notes",
      icon: (
        <svg
          className="w-8 h-8 text-indigo-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
    {
      title: "Certificates",
      slug: "certificates",
      icon: (
        <svg
          className="w-8 h-8 text-yellow-500"
          viewBox="0 0 24 24"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
            <g fill="#f39c12" fillRule="nonzero">
              <path
                d="M14.9995539,18.0009948 C15.8354423,18.6290841 16.8745763,19.0012854 18.0006427,19.0012854 C19.1258118,19.0012854 20.1641871,18.629677 20.999733,18.0024957 L21.0002082,21.2486967 C21.0002082,21.819493 20.3957089,22.1681379 19.9101212,21.9175853 L19.8206437,21.8634928 L18.0002854,20.5912144 L16.1806418,21.8634928 C15.7127439,22.190418 15.0807212,21.8945802 15.0079846,21.3530256 L15.0010772,21.2486967 L14.9995539,18.0009948 Z M19.25,3.00420373 C20.7125318,3.00420373 21.9084043,4.14590833 21.9949812,5.5866814 L22,5.75420373 L22.0013771,11.0000627 C21.597068,10.4618485 21.0866826,10.0078705 20.501261,9.66916876 L20.5,5.75420373 C20.5,5.10699504 20.0081253,4.57466983 19.3778052,4.51065734 L19.25,4.50420373 L4.75,4.50420373 C4.10279131,4.50420373 3.5704661,4.99607839 3.50645361,5.62639849 L3.5,5.75420373 L3.5,15.2542037 C3.5,15.9014124 3.99187466,16.4337376 4.62219476,16.4977501 L4.75,16.5042037 L13.6709061,16.5042615 C13.7707294,16.676523 13.880538,16.8422773 13.99954,17.0007324 L14,18.0042037 L4.75,18.0042037 C3.28746816,18.0042037 2.09159572,16.8624991 2.00501879,15.4217261 L2,15.2542037 L2,5.75420373 C2,4.29167189 3.1417046,3.09579945 4.58247767,3.00922252 L4.75,3.00420373 L19.25,3.00420373 Z M18.0006427,10 C20.2101367,10 22.0012854,11.7911488 22.0012854,14.0006427 C22.0012854,16.2101367 20.2101367,18.0012854 18.0006427,18.0012854 C15.7911488,18.0012854 14,16.2101367 14,14.0006427 C14,11.7911488 15.7911488,10 18.0006427,10 Z M11.25,12.5 C11.6642136,12.5 12,12.8357864 12,13.25 C12,13.6296958 11.7178461,13.943491 11.3517706,13.9931534 L11.25,14 L6.75,14 C6.33578644,14 6,13.6642136 6,13.25 C6,12.8703042 6.28215388,12.556509 6.64822944,12.5068466 L6.75,12.5 L11.25,12.5 Z M17.25,7 C17.6642136,7 18,7.33578644 18,7.75 C18,8.12969577 17.7178461,8.44349096 17.3517706,8.49315338 L17.25,8.5 L6.75,8.5 C6.33578644,8.5 6,8.16421356 6,7.75 C6,7.37030423 6.28215388,7.05650904 6.64822944,7.00684662 L6.75,7 L17.25,7 Z"
                id="🎨-Color"
              />
            </g>
          </g>
        </svg>
      ),
    },
  ];
  return (
    <Layout>
      <div className="min-h-screen bg-primary-6 px-2 py-2 grid grid-cols-5 gap-2 mt-10">
        <nav className="flex flex-col">
          {sidebarLinks.map((item) => {
            return (
              <Link href={`/u/library/${item.slug}/`}>
                <a
                  className={`flex items-center rounded-full px-2 py-2 text-xl font-semibold my-1 mx-2 ${
                    currentPath === item.slug ? " bg-gray-100" : ""
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  <span>{item.title}</span>
                </a>
              </Link>
            );
          })}
        </nav>
        <div className="col-span-4">{children}</div>
      </div>
    </Layout>
  );
}
