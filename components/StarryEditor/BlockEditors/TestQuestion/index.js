import React from "react";
import { TestQuestionDataOption } from "../../Data/blockData";
import { XIcon } from "@heroicons/react/outline";
import Editor from "rich-markdown-editor";
import LanguageSelect from "../../Data/languageSelect";

export default function TestQuestion({
  data,
  setData,
  setOption,
  addNewOption,
  deleteOption,
}) {
  const BLOCKTYPE = data.type;
  return (
    <div className="">
      <p className="mb-2 text-lg mt-6 text-center text-gray-600">
        {BLOCKTYPE === "ATF"
          ? "Add The Options in Corect Order We will shuffle them"
          : ""}
        {BLOCKTYPE === "MCQ" ? "Tick the correct ones" : ""}
      </p>

      {/* If FTB */}
      {BLOCKTYPE === "FTB" ? (
        <div>
          <LanguageSelect
            language={data.language}
            setLanguage={(value) => setData("language", value)}
          />
          <textarea
            rows={10}
            className="w-full border-gray-200 border-2 rounded-md"
            placeholder="Your Fill in the blanks here use [--] for blanks"
            onChange={(e) => {
              setData("code", e.target.value);

              //If less options then blanks append one else change position to next one
              if (
                e.target.value.split("[--]").length - 1 >
                data.options.length
              ) {
                var options = [...data.options];
                //Chaos occured fixed that
                while (
                  e.target.value.split("[--]").length - 1 >
                  options.length
                ) {
                  options.push({
                    ...TestQuestionDataOption,
                    position: 0,
                  });
                }

                for (
                  var i = 0;
                  i < e.target.value.split("[--]").length - 1;
                  i++
                ) {
                  options[i].position = i + 1;
                }
                setData("options", options);
              }
            }}
            value={data.code}
          />
        </div>
      ) : (
        ""
      )}

      <div className="flex items-center flex-wrap justify-between">
        {data.options.map((option, index) => {
          return (
            <div
              className="flex items-center justify-center flex-1 px-6"
              key={option.key}
            >
              {BLOCKTYPE === "MCQ" ? (
                <input
                  type="checkbox"
                  checked={option.position}
                  className="mx-4 w-5 h-5"
                  onChange={(e) => {
                    const newOption = { ...option };
                    newOption.position = e.target.checked ? index + 1 : 0;
                    setOption(index, newOption);
                  }}
                />
              ) : (
                ""
              )}
              <input
                placeholder="Option"
                className="flex-1 border-2 border-gray-100 focus:border-transparent my-2 px-4 py-2 focus:outline-none rounded"
                type="text"
                value={option.text}
                onChange={(e) => {
                  const newOption = { ...option };
                  newOption.text = e.target.value;
                  setOption(index, newOption);
                }}
              />
              <button
                onClick={() => deleteOption(index)}
                className="w-6 h-6 mx-4 text-red-400"
              >
                <XIcon />
              </button>
            </div>
          );
        })}
      </div>
      <button
        className="bg-primary-500 text-white px-6 py-3 hover:bg-green-600 mx-auto block my-4 rounded-full"
        onClick={() => {
          addNewOption({
            ...TestQuestionDataOption,
            key: new Date().getTime().toString(36),
            position: data.options.length + 1,
          });
        }}
      >
        Add {BLOCKTYPE === "FTB" ? "Fake" : "New"} Option
      </button>
    </div>
  );
}
