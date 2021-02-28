import React, { useState, useEffect } from "react";
import Markdown from "./markdown";
import FTB from "./ftbdisplay";
import ATF from "./atf";
import MCQ from "./mcq";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

export default function index({ content, setContent }) {
  const renderers = {
    code: ({ language, value }) => {
      if (language && ["info", "warning", "tip"].includes(language)) {
        return <p className={language}>{value}</p>;
      }
      return (
        <pre>
          <code className={`language-${language} bg-gray-400`}>{value}</code>
        </pre>
      );
    },
    image: ({ src, alt }) => {
      return <img src={src} alt={alt} loading="lazy" />;
    },
  };

  return (
    <div className="px-6 py-2">
      <div className="text-gray-300 font-semibold">
        {content.type === "markdown" ? "Markdown" : ""}
        {content.type === "atf" ? "Arrange the Following" : ""}
        {content.type === "code-ftb" ? "Code Fill in the blanks" : ""}
        {content.type === "ftb" ? "Fill in the blanks" : ""}
        {content.type === "mcq" ? "Multiple Choice Questions" : ""}
      </div>
      <div>
        <h1 className="text-4xl text-center font-bold text-gray-700">
          {content.title}
        </h1>
        <article className="prose dark:prose-dark prose-lg lg:prose-xl max-w-none mx-2 my-6">
          <ReactMarkdown
            renderers={renderers}
            plugins={[gfm]}
            children={content.content_raw}
          />
        </article>
      </div>
      {content.type === "markdown" ? "" : ""}
      {content.type === "code-ftb" ? (
        <FTB type="code" content={content} setContent={setContent} />
      ) : (
        ""
      )}
      {content.type === "ftb" ? (
        <FTB content={content} setContent={setContent} />
      ) : (
        ""
      )}
      {content.type === "mcq" ? (
        <MCQ content={content} setContent={setContent} />
      ) : (
        ""
      )}
      {content.type === "atf" ? (
        <ATF content={content} setContent={setContent} />
      ) : (
        ""
      )}
    </div>
  );
}
