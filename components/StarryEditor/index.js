import React, { useState } from "react";
// import "../../index.css";
import Editor from "rich-markdown-editor";
import OptionSelect from "./options";
import Code from "./BlockEditors/CodeTabs/index";
import { cloneDeep } from "lodash";
import TestQuestionEditor from "./BlockEditors/TestQuestion/index";
import { TrashIcon } from "@heroicons/react/outline";
import { handleImageUpload } from "../../lib/index";
export default function StarryEditor({
  contentState,
  setContentState,
  type = "POST",
  activeContentIndex = -1,
}) {
  const deleteBlock = (blockIndex) => {
    const confirmDeletion = prompt("Enter CONFIRM to confirm deletion");
    if (confirmDeletion === "CONFIRM") {
      const newBlocks = [...contentState.blocks];
      newBlocks.splice(blockIndex, 1);
      setContentState({ ...contentState, blocks: newBlocks });
    }
  };

  async function handleFeaturedImageUpload(e) {
    e.preventDefault();
    try {
      const imageUrl = await handleImageUpload(e.target.files[0]);
      setPost({ ...post, featured_image: imageUrl.Location });
    } catch (error) {
      addNotification({
        message: "Some error occured in uploading the image.",
        type: "error",
      });
    }
  }

  return (
    <div>
      <div className="max-w-5xl mx-auto rounded-sm my-10 min-h-screen p-2">
        {contentState.blocks.map((item, blockIndex) => {
          if (activeContentIndex != -1 && blockIndex !== activeContentIndex) {
            return "";
          }
          return (
            <>
              <div>
                <div className="text-right">
                  <button
                    onClick={() => deleteBlock(blockIndex)}
                    className="text-right"
                  >
                    <TrashIcon className="w-6 h-6 text-red-400" />
                  </button>
                </div>
                <input
                  value={item.title}
                  onChange={(e) => {
                    const newContentState = cloneDeep(contentState);
                    newContentState.blocks[blockIndex].title = e.target.value;
                    setContentState(newContentState);
                  }}
                  type="text"
                  placeholder="Short Content Title (2-3 words)"
                  className="w-full border-2 border-gray-50 rounded-md text-gray-700 text-5xl placeholder-gray-300 font-bold"
                />
                <Editor
                  className="my-4 prose dark:prose-dark lg:prose-lg max-w-none"
                  key={item.key}
                  uploadImage={async (file) => {
                    try {
                      //If filesize>1mb raise error
                      if (file && file.size >= 1000000) {
                        addNotification({
                          message: "Max File Size Limit is 1 MB",
                          type: "error",
                        });
                        throw "FILE ERROR";
                      } else {
                        const res = await handleImageUpload(file);
                        return res.Location;
                      }
                    } catch (error) {
                      let message = "Some error occured";
                      if (
                        error &&
                        error.response.data &&
                        error.response.data.code === "FILE_TOO_LARGE"
                      ) {
                        message = "Max File Size Limit is 1 MB";
                      }
                      addNotification({
                        message: message,
                        type: "error",
                      });

                      throw error;
                    }
                  }}
                  defaultValue={item.text}
                  onChange={(value) => {
                    const newContentState = cloneDeep(contentState);
                    newContentState.blocks[blockIndex].text = value();
                    setContentState(newContentState);
                  }}
                />
              </div>
              {item.type === "CODE" && (
                <>
                  <Code
                    data={item}
                    setData={(field, value) => {
                      const newContentState = cloneDeep(contentState);
                      newContentState.blocks[blockIndex][field] = value;
                      setContentState(newContentState);
                    }}
                    setCodeData={(index, newCodeData) => {
                      const newContentState = cloneDeep(contentState);
                      newContentState.blocks[blockIndex].data[index] =
                        newCodeData;
                      setContentState(newContentState);
                    }}
                    addNewCodeTab={(data) => {
                      const newContentState = cloneDeep(contentState);
                      newContentState.blocks[blockIndex].data.push(data);
                      setContentState(newContentState);
                    }}
                    deleteCodeTab={(index) => {
                      const newContentState = cloneDeep(contentState);
                      newContentState.blocks[blockIndex].data.splice(index, 1);
                      setContentState(newContentState);
                    }}
                  />
                </>
              )}
              {["FTB", "ATF", "MCQ"].includes(item.type) && (
                <>
                  <TestQuestionEditor
                    data={item}
                    setData={(field, value) => {
                      const newContentState = cloneDeep(contentState);
                      newContentState.blocks[blockIndex][field] = value;
                      setContentState(newContentState);
                    }}
                    setOption={(index, newOption) => {
                      const newContentState = cloneDeep(contentState);
                      newContentState.blocks[blockIndex].options[index] =
                        newOption;
                      setContentState(newContentState);
                    }}
                    addNewOption={(data) => {
                      const newContentState = cloneDeep(contentState);
                      newContentState.blocks[blockIndex].options.push(data);
                      setContentState(newContentState);
                    }}
                    deleteOption={(index) => {
                      const newContentState = cloneDeep(contentState);
                      newContentState.blocks[blockIndex].options.splice(
                        index,
                        1
                      );
                      setContentState(newContentState);
                    }}
                  />
                </>
              )}
            </>
          );
        })}
        {type !== "COURSE" ? (
          <OptionSelect
            contentState={contentState}
            setContentState={setContentState}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
