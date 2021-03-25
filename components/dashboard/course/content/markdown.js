import React from "react";
import Editor from "rich-markdown-editor";

export default function markdown() {
  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Title"
        className="w-full border-gray-100 rounded-md text-gray-600 text-4xl"
      />
      {/* //Outline editor */}
      <Editor
        className="prose dark:prose-dark lg:prose-lg max-w-none mt-10 border border-gray-100"
        // dark={true}
        placeholder="Start Writing Your Amazing Post..."
      />
    </div>
  );
}
