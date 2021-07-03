import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import Select from "react-select";
import languages from "../../Data/languages";
import { IndividualCodeData } from "../../Data/blockData";
import { XIcon } from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";
import MarkdownEditor from "rich-markdown-editor";

export default function TabbedCode({
  data: codeData,
  setData,
  setCodeData,
  addNewCodeTab,
  deleteCodeTab,
}) {
  const [activeTab, setActiveTab] = useState(0);
  if (codeData.type !== "CODE") {
    return <p>Some error occured</p>;
  }

  /**
   *
   * @param {number} index The index of the code item to edit
   * @param {string} field The key/name of the field to edit
   * @param {any} data The data to update at the field
   */
  const onInputChangeHandle = (index, field, data) => {
    var newCodeData = { ...codeData.data[index] };
    newCodeData[field] = data;
    setCodeData(index, newCodeData);
  };

  return (
    <div className="">
  
      {/* Tabs */}
      <div className="flex items-center overflow-auto">
        {codeData.data.map((item, index) => {
          return (
            <button
              className={`${
                activeTab === index ? "bg-gray-100" : "text-gray-400"
              } px-2 py-2 focus:outline-none border-2 border-b-0 rounded flex items-center`}
              onClick={() => setActiveTab(index)}
            >
              <span className="text-lg">{item.title}</span>
              <XIcon
                className="h-5 w-5 mx-4"
                onClick={() => {
                  //TODO: Check Widow available SSR
                  const cnfrm = window.confirm(
                    "Do you really want to Delete this Tab?"
                  );
                  if (cnfrm) {
                    deleteCodeTab(index);
                  }
                }}
              />
            </button>
          );
        })}
        <button
          className="bg-gray-700 text-white mx-6 rounded-full hover:bg-gray-900 focus:outline-none"
          onClick={() =>
            addNewCodeTab({
              ...IndividualCodeData,
              key: new Date().getTime().toString(36),
            })
          }
        >
          <PlusCircleIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="bg-gray-50 border-2 px-4 py-2 rounded">
        {codeData.data.length
          ? ""
          : "Add a New Code By click the add icon above"}
        {codeData.data.map((item, index) => {
          if (activeTab === index) {
            return (
              <>
                <Editor
                  height={"60vh"}
                  defaultLanguage="python"
                  defaultValue={item.code}
                  value={item.code}
                  onChange={(value) =>
                    onInputChangeHandle(index, "code", value)
                  }
                  theme="vs-dark"
                />

                <div className="flex items-center gap-6">
                  <input
                    type="text"
                    placeholder="Title"
                    className="border-2 focus:border-transparent px-4 py-1 focus:ring-2 focus:outline-none focus:ring-offset-blue-900 rounded flex-1"
                    value={item.title}
                    onChange={(e) =>
                      onInputChangeHandle(index, "title", e.target.value)
                    }
                  />
                  <div className="w-full">
                    <Select
                      placeholder="Language"
                      onChange={(data) =>
                        onInputChangeHandle(index, "language", data.value)
                      }
                      defaultValue={item.language}
                      className="max-w-md my-4"
                      options={languages}
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 text-lg w-5 h-5"
                      checked={item.playground}
                      onChange={(e) =>
                        onInputChangeHandle(
                          index,
                          "playground",
                          e.target.checked
                        )
                      }
                    />
                    <label>PlayGround</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 text-lg w-5 h-5"
                      checked={item.exercise}
                      onChange={(e) => {
                        onInputChangeHandle(
                          index,
                          "exercise",
                          e.target.checked
                        );
                        
                      }}
                    />
                    <label>Exercise</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 text-lg w-5 h-5"
                      checked={item.downloadable}
                      onChange={(e) =>
                        onInputChangeHandle(
                          index,
                          "downloadable",
                          e.target.checked
                        )
                      }
                    />
                    <label>Downloadable</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 text-lg w-5 h-5"
                      checked={item.executable}
                      onChange={(e) =>
                        onInputChangeHandle(
                          index,
                          "executable",
                          e.target.checked
                        )
                      }
                    />
                    <label>Executable</label>
                  </div>
                </div>
                <div className="flex items-center gap-4 justify-between">
                  <div className="w-full">
                    <div>Highlight</div>
                    <textarea
                      data-gramm_editor="false"
                      value={item.highlight}
                      onChange={(e) =>
                        onInputChangeHandle(index, "highlight", e.target.value)
                      }
                      rows={6}
                      className="w-full border-2 focus:border-transparent my-2 px-4 py-2 focus:ring-2 focus:outline-none focus:ring-offset-blue-900 rounded flex-1"
                      placeholder="Example: 1-3, 5-6, 8-10"
                    />
                  </div>
                  {item.executable && (
                    <div className="w-full">
                      <div>Input Data</div>
                      <textarea
                        data-gramm_editor="false"
                        value={item.payload}
                        onChange={(e) =>
                          onInputChangeHandle(index, "payload", e.target.value)
                        }
                        placeholder="Passed as STDIN"
                        rows={6}
                        className="w-full border-2 focus:border-transparent my-2 px-4 py-2 focus:ring-2 focus:outline-none focus:ring-offset-blue-900 rounded flex-1"
                      />
                    </div>
                  )}
                  {item.exercise && (
                    <div className="w-full">
                      <div>Expected Output</div>
                      <textarea
                        data-gramm_editor="false"
                        value={item.output}
                        onChange={(e) =>
                          onInputChangeHandle(index, "output", e.target.value)
                        }
                        placeholder="Expected Output"
                        rows={6}
                        className="w-full border-2 focus:border-transparent my-2 px-4 py-2 focus:ring-2 focus:outline-none focus:ring-offset-blue-900 rounded flex-1"
                      />
                    </div>
                  )}
                </div>
                {item.exercise && (
                  <>
                    <div>Solution/Hint</div>
                    <MarkdownEditor
                      placeholder="Solution/Hint"
                      className="rounded py-2"
                      defaultValue={item.solution}
                      onChange={(value) =>
                        onInputChangeHandle(index, "solution", value())
                      }
                    />
                  </>
                )}
              </>
            );
          }
          return <></>;
        })}
      </div>
    </div>
  );
}
