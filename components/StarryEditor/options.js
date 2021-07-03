import React from "react";
import Select from "react-select";
import options from "./Data/blockData";

const newOptions = [];
for (const key in options) {
  newOptions.push({
    value: key,
    label: (
      <div className="flex flex-col justify-center items-center text-gray-600">
        <span className="w-8 h-8">{options[key].icon}</span>
        <label className="text-gray-700 my-2">{options[key].label}</label>
      </div>
    ),
  });
}
const CustomOption = ({ children, innerProps, isDisabled }) =>
  !isDisabled ? (
    <div
      {...innerProps}
      className="flex items-center justify-center flex-wrap mx-4 my-2 cursor-pointer"
    >
      {children}
    </div>
  ) : null;

export default function OptionSelect({
  contentState,
  setContentState,
  currentBlockPosition = -1,
}) {
  const addNewBlock = (newBlock) => {
    var position =
      currentBlockPosition === -1
        ? contentState.blocks.length
        : currentBlockPosition + 1;
    const oldBlocks = [...contentState.blocks];
    oldBlocks.splice(position, 0, {
      ...newBlock,
      key: new Date().getTime().toString(36),
    });
    setContentState({
      ...contentState,
      blocks: [...oldBlocks],
    });
  };

  return (
    <Select
      placeholder="Add New Block"
      onChange={({ value }) => addNewBlock(options[value].format)}
      value={null}
      className="max-w-md mx-auto"
      styles={{
        menuList: (provided, state) => ({
          ...provided,
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          padding: "5px",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999,
        }),
      }}
      options={newOptions}
      components={{ Option: CustomOption }}
    />
  );
}
