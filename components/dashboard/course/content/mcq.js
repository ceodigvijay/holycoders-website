import React from "react";

export default function mcq({ content, setContent }) {
  return (
    <>
      <div className="my-4">
        <h2 className="text-gray-400">Question</h2>
        <input
          value={content.question}
          onChange={(e) => setContent("question", e.target.value)}
          type="text"
          placeholder="Question"
          className="w-full border-2 border-gray-200 rounded-md text-gray-700 text-5xl placeholder-gray-300 font-bold"
        />
      </div>
      <div className="my-6 text-center">
        <h2 className="text-gray-400 text-xl">
          Add your options (Automatically shuffled on frontend)
        </h2>
      </div>

      <div>
        {content.options.map((option, index) => {
          return (
            <div
              className="text-center flex items-center justify-center"
              key={index}
            >
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
                <svg
                  className="w-6 h-6 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center">
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
          className="flex items-center my-10 justify-center text-white rounded-md bg-secondary px-6 py-3"
        >
          <svg
            className="w-6 h-6 mx-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Add Options</span>
        </button>
      </div>
    </>
  );
}
