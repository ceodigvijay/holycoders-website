import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

export default function MarkDownParser({ children }) {
  const renderers = {
    code: ({ language, value }) => {
      if (language && ["info", "warning", "tip"].includes(language)) {
        return <p className={language}>{value}</p>;
      }
      return (
        <pre>
          <code className={`language-${language}`}>{value}</code>
        </pre>
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
   if (['\\', '.'].includes(newRawContent.split('\n').reverse()[1])){
     newRawContent = newRawContent.slice(0, -2)
   }
  return (
    <ReactMarkdown plugins={[gfm]} renderers={renderers} children={newRawContent} />
  );
}
