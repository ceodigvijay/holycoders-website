import React from "react";

export default function mcq({ content, setContent }) {
  return (
    <>
      <div className="my-6 text-center">
        <h2 className="text-gray-700 text-xl">
          Add your options in correct order
        </h2>
        <p className="text-gray-400 text-sm">
          Don't worry we will shuffle that later
        </p>
      </div>

      <div>
        {content.options.map((option, index) => {
          return (
            <div
              className="text-center"
              key={option.title + option.position + index}
            >
              <input
                value={option.title}
                onChange={(e) => {
                  const newOptions = [...content.options];
                  newOptions[index].title = e.target.value;
                  setContent("options", newOptions);
                }}
                type="text"
                placeholder="Your option"
                className="border-gray-200 border-2 rounded-md text-gray-600 placeholder-gray-300 mr-4 my-6"
              />
              <button
                onClick={() => {
                  //TODO: Delete and reset all positions in objects
                  const newOptions = [...content.options];
                  newOptions.splice(index, 1);
                  newOptions.map((option, index) => {
                    option.position = index + 1;
                  });
                  setContent("options", newOptions);
                }}
              >
                Del
              </button>
            </div>
          );
        })}
      </div>
      <div className="text-center">
        <button
          onClick={() =>
            setContent("options", [
              ...content.options,
              {
                title: "",
                position: content.options.length + 1,
                explanation_raw: "",
                explanation_html: "",
              },
            ])
          }
          className="py-2 px-10 border-2 border-primary-600 rounded-full"
        >
          Add Option
        </button>
      </div>
    </>
  );
}
