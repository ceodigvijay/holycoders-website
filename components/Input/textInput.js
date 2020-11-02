import React from "react";

export default function textInput(props) {
  const { border, fontSize, margin, padding, fontWeight } = props;

  return (
    <>
      <input type={props.type} {...props} />
      <style jsx>{`
        input {
          color: ${({ theme }) => theme.text};
          display: block;
          margin: ${margin ? margin : "20px auto"};
          border: ${border ? border : "2px solid #d5d5d5"};
          border-radius: 5px;
          width: 100%;
          padding: ${padding ? padding : "10px"};
          font-size: ${fontSize ? fontSize : "16px"};
          font-weight: ${fontWeight ? fontWeight : "400"};
        }
        input:hover {
          outline: none;
        }
      `}</style>
    </>
  );
}
