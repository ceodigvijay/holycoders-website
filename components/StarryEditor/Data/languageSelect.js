import React from "react";
import languages from "./languages";
import Select from "react-select";

export default function CodeSelector({
  language,
  setLanguage = (v) => console.log(v),
}) {
  return (
    <Select
      placeholder="Language"
      onChange={(data) => setLanguage(data.value)}
      defaultValue={language}
      className="max-w-md my-4"
      options={languages}
    />
  );
}
