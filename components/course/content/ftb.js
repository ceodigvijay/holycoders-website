import React, { useState } from "react";
import CodeEditor from "@monaco-editor/react";

export default function codeftb({ type = "text", content, setContent }) {
  const [code, setCode] = useState("");
  return (
    <>
      <div className="mt-6 flex items-center justify-end">
        <div className="mx-4">
          <input id="show-keyboard" type="checkbox" />
          <label htmlFor="show-keyboard" className="mx-1">
            User Can use Keyboard
          </label>
        </div>

        {type === "code" ? (
          <select className="border-2 border-gray-200 rounded-md">
            <option value="python">Python</option>
            <option value="javascript">Javascript</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
          </select>
        ) : (
          ""
        )}
      </div>
      <textarea
        rows={10}
        className="w-full my-4 border-gray-200 border-2 rounded-md"
        placeholder="Your Fill in the blanks here use ->____ for blanks"
        onChange={(e) => {
          setContent("question", e.target.value);

          //If less options then blanks append one else change position to next one
          if (
            e.target.value.split("->____").length - 1 >
            content.options.length
          ) {
            var options = [...content.options];
            console.log(
              e.target.value.split("->____").length - 1 - options.length
            );
            //Havoc occured fixed that
            while (e.target.value.split("->____").length - 1 > options.length) {
              options.push({
                explanation_html: "string",
                explanation_raw: "string",
                position: 0,
                title: "New Option",
              });
            }

            for (
              var i = 0;
              i < e.target.value.split("->____").length - 1;
              i++
            ) {
              options[i].position = i + 1;
            }
            setContent("options", options);
          }
        }}
        value={content.question}
      />
      {/* <CodeEditor
        onChange={(value, event) => {
          setCode(value);
        }}
        value={code}
        className="mt-2"
        height="60vh"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue="// some comment"
      /> */}
      {/* Options */}
      <div className="">
        <div className="flex justify-between flex-wrap">
          {content.options.map((e, index) => {
            return (
              <div className="mr-2 my-2">
                <label className="mr-2">
                  {e.position === 0
                    ? "Fake Option"
                    : `Option for ${e.position}`}
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  className="border-gray-400 rounded-md text-gray-600 placeholder-gray-300 mr-4 my-6"
                />
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center">
          <button
            className="flex items-center justify-center text-white rounded-md bg-secondary px-6 py-3"
            onClick={() => {
              const options = [
                ...content.options,
                {
                  explanation_html: "string",
                  explanation_raw: "string",
                  position: 0,
                  title: "New Option",
                },
              ];
              setContent("options", options);
            }}
          >
            <svg
              className="w-6 h-6 mx-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Add option</span>
          </button>
        </div>
      </div>

      {/* Final Output */}
      <textarea
        rows={10}
        className="w-full my-4 border-gray-200 border-2 rounded-md"
        placeholder="Final - Output for code/ Message for FTB & ATF."
        onChange={(e) => {
          setContent("final_output", e.target.value);
        }}
        value={content.final_output}
      />
    </>
  );
}
