import React from "react";
import AsyncSelect from "react-select/async";
import { searchTags } from "../../lib/index";

export default function TagSelect({ value, onChange, placeholder }) {
  if (value && Array.isArray(value)) {
    value.map((element) => {
      element.value = element._id;
      element.label = element.name;
      return element;
    });
  }

  async function getTags(query) {
    try {
      const res = await searchTags(query, 5);
      var data = res.data;
      data.map((element) => {
        element.value = element._id;
        element.label = element.name;
        return element;
      });
      return data;
      setSuggestions(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AsyncSelect
      placeholder={placeholder ? placeholder : "Enter the tags"}
      value={value}
      isMulti
      cacheOptions
      defaultOptions
      loadOptions={(value) => getTags(value)}
      onChange={onChange}
    />
  );
}
