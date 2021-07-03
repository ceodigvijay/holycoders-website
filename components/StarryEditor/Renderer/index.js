import React from "react";
import FTB from "./ftb";
import ATF from "./atf";
import MCQ from "./mcq";
// import Code from "./code";
// import Markdown from "./markdown";
import dynamic from "next/dynamic";
const Code = dynamic(import("./code"), { ssr: false });
const Markdown = dynamic(import("./markdown"), { ssr: false });
export default function index({
  moveToModule,
  content,
  activeModuleIndex = -1,
  type = "POST",
}) {
  return (
    <div className="px-6 py-2">
      {content.blocks.map((block, index) => {
        if (activeModuleIndex != -1 && activeModuleIndex !== index) {
          return "";
        }
        return (
          <>
            <Markdown type={type} moveToModule={moveToModule} content={block} />

            {block.type === "FTB" && (
              <FTB type="code" moveToModule={moveToModule} content={block} />
            )}
            {block.type === "MCQ" && (
              <MCQ moveToModule={moveToModule} content={block} />
            )}
            {block.type === "ATF" && (
              <ATF moveToModule={moveToModule} content={block} />
            )}
            {block.type === "CODE" && (
              <Code moveToModule={moveToModule} content={block} />
            )}
          </>
        );
      })}
    </div>
  );
}
