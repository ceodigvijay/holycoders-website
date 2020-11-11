import React, { useState } from "react";

export default function index({ question = "", image = "", options = [] }) {
  const [submitValue, setSubmitValue] = useState(null);
  return (
    <div className="quiz px-4 py-4">
      <div className="question title is-5 has-text-centered">{question}</div>
      {options.map((option) => {
        return (
          <div
            className={`options ${
              submitValue === null
                ? ""
                : option.correct
                ? "has-background-success"
                : "has-background-danger"
            }`}
            onClick={() => setSubmitValue(option.title)}
          >
            {option.title}
          </div>
        );
      })}
      <style jsx>{`
        .quiz {
          background-color: #f6f6f6;
        }
        .options {
          background-color: #fff;
          margin: 20px 5px;
          padding: 15px;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
