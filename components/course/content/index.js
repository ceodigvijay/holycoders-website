import React from "react";
import FTB from "./ftb";
import ATF from "./atf";
import MCQ from "./mcq";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { shadesOfPurple } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Tex from "@matejmazur/react-katex";
import math from "remark-math";

export default function index({ moveToModule, content, setContent }) {
  const renderers = {
    inlineMath: ({ value }) => <Tex math={value} />,
    math: ({ value }) => <Tex block math={value} />,
    code: ({ language, value }) => {
      if (language && ["info", "warning", "tip"].includes(language)) {
        return <p className={language}>{value}</p>;
      }
      return (
        <SyntaxHighlighter
          customStyle={{ padding: "20px" }}
          language={language}
          style={shadesOfPurple}
        >
          {value}
        </SyntaxHighlighter>
      );
    },
    image: ({ src, alt }) => {
      return <img src={src} alt={alt} loading="lazy" className="rounded-md mx-auto" />;
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
            plugins={[gfm, math]}
            renderers={renderers}
            children={content.content_raw.replace(/\\\\/g, '\\')}
          />
        </article>
      </div>
      {content.type === "markdown" ? (
        <div className="text-center mt-20 mb-10">
          <button
            className="bg-primary-500 font-bold text-white px-20 py-3 hover:bg-primary-400 uppercase rounded-full text-md"
            onClick={() => moveToModule("next")}
          >
            Continue
          </button>
        </div>
      ) : (
        ""
      )}
      {content.type === "code-ftb" ? (
        <FTB type="code" moveToModule={moveToModule} content={content} />
      ) : (
        ""
      )}
      {content.type === "ftb" ? (
        <FTB moveToModule={moveToModule} content={content} />
      ) : (
        ""
      )}
      {content.type === "mcq" ? (
        <MCQ content={content} moveToModule={moveToModule} />
      ) : (
        ""
      )}
      {content.type === "atf" ? (
        <ATF content={content} moveToModule={moveToModule} />
      ) : (
        ""
      )}
    </div>
  );
}
