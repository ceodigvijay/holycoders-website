import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import math from "remark-math";
import Tex from "@matejmazur/react-katex";
import { UnControlled as CodeMirror } from "react-codemirror2";
// import "codemirror/mode/python/python";
// import "codemirror/mode/clike/clike";
// import "codemirror/mode/javascript/javascript";
// import "codemirror/mode/css/css";
// import "codemirror/mode/htmlembedded/htmlembedded";
// import "codemirror/mode/php/php";
// import "codemirror/mode/dart/dart";
// import "codemirror/mode/go/go";
// import "codemirror/mode/ruby/ruby";
// import "codemirror/mode/sass/sass";
// import "codemirror/mode/sql/sql";
// import "codemirror/mode/shell/shell";
// import "codemirror/mode/powershell/powershell";

export default function MarkDownParser({ children }) {
  const renderers = {
    inlineMath: ({ value }) => <Tex math={value} />,
    math: ({ value }) => <Tex block math={value} />,
    code: ({ language, value }) => {
      if (language && ["info", "warning", "tip"].includes(language)) {
        return <p className={language}>{value}</p>;
      }
      return (
        <CodeMirror
          className="text-base"
          value={value}
          options={{
            mode: language,
            theme: "material",
            lineNumbers: true,
            readOnly: true,
          }}
        />
      );
    },
    image: ({ src, alt }) => {
      return (
        <div className="text-center shadow-lg">
          <img src={src} alt={alt} loading="lazy" />
        </div>
      );
    },
  };

  //Hack to make info warning and tips
  var newRawContent = children ? children.replace(/:::/g, "```") : "";
  //Fix '/' and '.' characters at the end of markdown
  if (["\\", "."].includes(newRawContent.split("\n").reverse()[0])) {
    console.log("Run");
    newRawContent = newRawContent.slice(0, -2);
  }
  return (
    <ReactMarkdown
      plugins={[gfm, math]}
      renderers={renderers}
      children={newRawContent}
    />
  );
}
