import React, { useState } from "react";
// import Editor from "@monaco-editor/react";
import {
  DuplicateIcon,
  DownloadIcon,
  CheckCircleIcon,
} from "@heroicons/react/outline";
import { PlayIcon, PauseIcon } from "@heroicons/react/solid";
import { runUntrustedCode } from "../../../lib/index";
import languages from "../Data/languages";
import { UnControlled as CodeMirror } from "react-codemirror2";
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

export default function CodeRender({ content, moveToModule }) {
  const [activeCodeTab, setActiveCodeTab] = useState(0);
  const [codeData, setCodeData] = useState([...content.data]);
  const [copied, setCopied] = useState(false);
  const [executing, setExecuting] = useState(false);

  const downloadTxtFile = (data, filename = "codefile_holycoders.txt") => {
    const element = document.createElement("a");
    const file = new Blob([data], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };
  const getLanguageName = (languageValue) => {
    var languageName;
    languages.forEach((language) => {
      if (language.value === languageValue) {
        languageName = language.label;
      }
    });
    return languageName ? languageName.toLowerCase() : "";
  };

  const copyToClipboard = (text) => {
    var textField = document.createElement("textarea");
    textField.value = text;
    console.log(text);
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const runCode = async (language, untrustedCode, payload, codeIndex) => {
    setExecuting(true);
    try {
      const response = await runUntrustedCode(language, untrustedCode, payload);
      console.log(response);
      const newCodeData = [...codeData];
      newCodeData[codeIndex].compiledOutput = response.data.output[0].stdout;
      setCodeData(newCodeData);
    } catch (error) {
      console.log(error);
    }
    setExecuting(false);
  };
  const CodeMirrorRef = React.createRef();
  return (
    <div>
      {content.data.map((codeItem, index) => {
        return (
          <button
            className={`${
              activeCodeTab === index ? "bg-gray-200" : "bg-gray-50"
            } px-4 py-2 rounded ml-1 text-lg text-gray-700 font-semibold focus:outline-none`}
            onClick={() => setActiveCodeTab(index)}
          >
            {codeItem.title}
          </button>
        );
      })}
      {codeData.map((codeItem, index) => {
        if (index !== activeCodeTab) {
          return "";
        }
        return (
          <>
            <div className="relative">
              <div className="flex items-center justify-center absolute right-0 px-2 py-2 top-0 text-blue-600 z-50">
                {codeItem.executable && (
                  <button
                    className="focus:outline-none"
                    onClick={() =>
                      runCode(
                        codeItem.language,
                        codeItem.code,
                        codeItem.payload,
                        index
                      )
                    }
                  >
                    <PlayIcon
                      className={`w-8 h-8 mx-2 bg-white rounded-full focus:outline-none ${
                        executing
                          ? "text-gray-600 cursor-not-allowed"
                          : "text-primary-600"
                      }`}
                    />
                  </button>
                )}
                <button
                  className="focus:outline-none"
                  onClick={() => copyToClipboard(codeItem.code)}
                >
                  {copied ? (
                    <CheckCircleIcon className="w-8 h-8 mx-2 text-gray-400" />
                  ) : (
                    <DuplicateIcon className="w-8 h-8 mx-2 text-gray-400" />
                  )}
                </button>
                {codeItem.downloadable && (
                  <button
                    onClick={() =>
                      downloadTxtFile(codeItem.code, codeItem.title + ".txt")
                    }
                  >
                    <DownloadIcon className="w-8 h-8 text-gray-400" />
                  </button>
                )}
              </div>
              <div className="">
                <CodeMirror
                  className="text-base tabbed-code"
                  value={codeItem.code}
                  options={{
                    mode: getLanguageName(codeItem.language),
                    theme: "material",
                    lineNumbers: true,
                    readOnly: !codeItem.playground,
                  }}
                  onChange={(editor, data, value) => {
                    const newCodeData = [...codeData];
                    newCodeData[index].code = value;
                    setCodeData(newCodeData);
                  }}
                />
              </div>
            </div>
            <div className="my-10">
              {codeItem.compiledOutput && (
                <>
                  <h2
                    className="text-lg font-semibold"
                    onClick={() => console.log(codeItem)}
                  >
                    Code Output{" "}
                    {codeItem.exercise
                      ? codeItem.compiledOutput.slice(0, -1) == codeItem.output
                        ? "Passed"
                        : "Failed"
                      : ""}
                  </h2>
                  <div className="mb-10 bg-gray-700 rounded p-4">
                    <code
                      style={{ whiteSpace: "pre-line" }}
                      className="text-white rounded"
                    >
                      {codeItem.compiledOutput}
                    </code>
                  </div>
                </>
              )}
            </div>
          </>
        );
      })}

      {/* Evaluation Message and Next Navigation */}
      <div className={`text-center`}>
        <button
          onClick={() => moveToModule("next")}
          className="bg-primary-500 focus:outline-none hover:bg-primary-400 font-bold text-white px-20 py-3 uppercase rounded-full text-md"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
