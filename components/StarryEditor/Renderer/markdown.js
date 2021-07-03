import React from "react";
import MarkdownParser from "../../utils/mdParser";
import "codemirror/mode/python/python";
import "codemirror/mode/clike/clike";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/mode/htmlembedded/htmlembedded";
import "codemirror/mode/php/php";
import "codemirror/mode/dart/dart";
import "codemirror/mode/go/go";
import "codemirror/mode/ruby/ruby";
import "codemirror/mode/sass/sass";
import "codemirror/mode/sql/sql";
import "codemirror/mode/shell/shell";
import "codemirror/mode/powershell/powershell";

export default function MarkDownRenderer({ content, moveToModule, type }) {
  return (
    <div className="mt-4">
      <h2 className="text-4xl text-center font-bold text-gray-700 dark:text-gray-300">
        {content.title}
      </h2>
      <article className="prose dark:prose-dark prose-lg lg:prose-xl max-w-none mx-2 my-6">
        <MarkdownParser>{content.text}</MarkdownParser>
      </article>
      <div className="text-center mt-20 mb-10">
        {content.type === "MARKDOWN" && (
          <button
            className="bg-primary-500 font-bold text-white px-20 py-3 hover:bg-primary-400 uppercase rounded-full text-md focus:outline-none"
            onClick={() => moveToModule("next")}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}
