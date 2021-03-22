import React from "react";

export default function mcq({ content, setContent }) {
  return (
    <>
      <div>
        <input
          value={content.question}
          onChange={(e) => setContent("question", e.target.value)}
          type="text"
          placeholder="Question"
          className="w-full border-2 my-4 border-gray-200 rounded-md text-gray-700 text-5xl placeholder-gray-300 font-bold"
        />
      </div>
      <div className="my-6 text-center">
        <h2 className="text-gray-700 text-xl">Add your options</h2>
      </div>

      <div>
        {content.options.map((option, index) => {
          return (
            <div className="text-center" key={index}>
              <input
                type="checkbox"
                className="mx-4"
                defaultChecked={option.position == 0 ? false : true}
                onChange={(e) => {
                  const newOptions = [...content.options];
                  if (e.target.checked) {
                    newOptions[index].position = index + 1; //If checked then anything greater then 0
                  } else {
                    newOptions[index].position = 0; //If checked then 0
                  }
                  setContent("options", newOptions);
                }}
              />
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
                  const newOptions = [...content.options];
                  newOptions.splice(index, 1);
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
                position: 0,
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
