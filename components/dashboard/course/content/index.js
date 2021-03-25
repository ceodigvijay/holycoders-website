import React, { useState, useEffect } from "react";
import FTB from "./ftb";
import ATF from "./atf";
import MCQ from "./mcq";
import MarkdownEditor from "rich-markdown-editor";

export default function index({ content, setContent }) {
  return (
    <div className="px-6 py-2">
      <div className="text-gray-300 font-semibold my-5">
        {content.type === "markdown" ? "Markdown" : ""}
        {content.type === "atf" ? "Arrange the Following" : ""}
        {content.type === "code-ftb" ? "Code Fill in the blanks" : ""}
        {content.type === "ftb" ? "Fill in the blanks" : ""}
        {content.type === "mcq" ? "Multiple Choice Questions" : ""}
      </div>
      <div>
        <div>
          <h2 className="text-gray-400">Short Title (2-3 words)</h2>
          <input
            value={content.title}
            onChange={(e) => setContent("title", e.target.value)}
            type="text"
            placeholder="Short Content Title (~ 2-3 words)"
            className="w-full border-2 border-gray-200 rounded-md text-gray-700 text-5xl placeholder-gray-300 font-bold"
          />
        </div>

        <div className="my-10">
          <h2 className="text-gray-400">Description</h2>
          <MarkdownEditor
            defaultValue={content.content_raw}
            onChange={(value) => setContent("content_raw", value())}
            className="prose dark:prose-dark lg:prose-lg max-w-none border-2 border-gray-200 rounded-md"
            // dark={true}
            placeholder="Description will go here"
          />
        </div>
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
