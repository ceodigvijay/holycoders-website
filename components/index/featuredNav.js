import Link from "next/link";
import React from "react";

export default function featuredNav() {
  return (
    <>
      <div className="columns is-3 is-multiline">
        {/* News Card Start */}
        <div className="column is-half pl-6 py-5">
          <div className="featured__item px-2 py-5 is-flex-tablet">
            <div className="mx-4 mb-4">
              <figure className="image is-64x64 px-3 py-3 featured__item-img has-background-success-light has-text-success ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </figure>
            </div>
            <div className="featured__item-content mx-2">
              <h2 className="has-text-weight-medium	is-size-5 mb-3">
                Coder's News
              </h2>
              <p className="mb-3">
                Latest news related to coding and programming to keep you up to
                date with the industry.
              </p>
              <Link href="/news/">
                <a className="is-inline-flex is-align-items-center	">
                  <span>Learn More</span>
                  <svg
                    className="image is-16x16 is-inline mx-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </Link>
            </div>
          </div>
        </div>
        {/* Courses Card Start */}
        <div className="column is-half pr-6 py-5">
          <div className="featured__item px-2 py-5 is-flex-tablet">
            <div className="mx-4 mb-4">
              <figure className="image is-64x64 px-3 py-3 featured__item-img has-background-success-light has-text-success ">
                <svg
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
              </figure>
            </div>
            <div className="featured__item-content mx-2">
              <h2 className="has-text-weight-medium	is-size-5 mb-3">Courses</h2>
              <p className="mb-3">
                Learn coding with interactive and example based courses which
                are optimized for both beginners and advance coders.
              </p>
              <Link href="/learn">
                <a className="is-inline-flex is-align-items-center">
                  <span>Learn More</span>
                  <svg
                    className="image is-16x16 is-inline mx-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </Link>
            </div>
          </div>
        </div>
        {/* Code Snippet Card Start */}
        <div className="column is-half pl-6 py-3">
          <div className="featured__item px-2 py-5 is-flex-tablet">
            <div className="mx-4 mb-4">
              <figure className="image is-64x64 px-3 py-3 featured__item-img has-background-success-light has-text-success ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </figure>
            </div>
            <div className="featured__item-content mx-2">
              <h2 className="has-text-weight-medium	is-size-5 mb-3">
                Code Snippets
              </h2>
              <p className="mb-3">
                Code samples, themes and many other ready to use code. Save your
                time from rebuilding the wheel and innovate new things.
              </p>
              <Link href="/snippets/">
                <a className="is-inline-flex is-align-items-center	">
                  <span>Learn More</span>

                  <svg
                    className="image is-16x16 is-inline mx-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </Link>
            </div>
          </div>
        </div>
        {/* News Card Start */}
        <div className="column is-half pr-6 py-3">
          <div className="featured__item px-2 py-5 is-flex-tablet">
            <div className="mx-4 mb-4">
              <figure className="image is-64x64 px-3 py-3 featured__item-img has-background-success-light has-text-success ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </figure>
            </div>
            <div className="featured__item-content mx-2">
              <h2 className="has-text-weight-medium	is-size-5 mb-3">
                Case Study
              </h2>
              <p className="mb-3">
                Detailed case studies related to different technology, tools and
                frameworks to help you take better decision.
              </p>
              <Link href="/case-study/">
                <a className="is-inline-flex is-align-items-center	">
                  <span>Learn More</span>

                  <svg
                    className="image is-16x16 is-inline mx-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .featured__item {
          border: 2px solid #e5e7eb;
          border-radius: 10px;
        }
        .featured__item-img {
          border-radius: 50%;
        }
      `}</style>
    </>
  );
}
