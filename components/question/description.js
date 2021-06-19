import React from "react";
import MarkDownParser from "../utils/mdParser";
export default function description({ question }) {
  return (
    <article className="px-4 my-6">
      <h1 className="lg:text-4xl sm:text-2xl md:text-3xl font-bold text-gray-700 text-center flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-primary-500 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span>{question.title}</span>
      </h1>
      <section className="my-10 prose dark:prose-dark prose max-w-none">
        <MarkDownParser>{question.content_raw}</MarkDownParser>
      </section>
    </article>
  );
}
