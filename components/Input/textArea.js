import React from "react";

export default function textInput(props) {
  const { border, fontSize, margin, padding, resize, fontWeight } = props;

  return (
    <>
      <textarea />
      <style jsx>
        {`
          textarea {
            display: block;
            margin: ${margin ? margin : "20px auto"};
            border: ${border ? border : "2px solid #333"};
            border-radius: 5px;
            width: 100%;
            padding: ${padding ? padding : "10px"};
            font-size: ${fontSize ? fontSize : "16px"};
            font-weight: ${fontWeight ? fontWeight : "400"};
            font-family: inherit;
            resize: ${!resize ? "none" : "auto"};
          }
          textarea:hover {
            outline: none;
          }
        `}
      </style>
    </>
  );
}
