import React from "react";
export default function button(props) {
  const { padding, borderRadius, border, margin } = props;
  const btnTheme = {
    default: ["transparent", "#333"],
    success: ["#36a666", "#fff"],
    danger: ["#e74c3c", "#fff"],
    warning: ["#f39c12", "#fff"],
  };
  const [backgroundColor, color] = props.type
    ? btnTheme[props.type]
    : btnTheme["default"];

  return (
    <>
      <button {...props} className={"hc_button " }>
        {props.children}
      </button>
      <style jsx>{`
        .hc_button {
          border-radius: ${borderRadius ? borderRadius : "5px"};
          padding: ${padding ? padding : "10px"};
          cursor: pointer;
          background-color: ${backgroundColor ? backgroundColor : "fff"};
          color: ${color ? color : "333"};
          border: ${border ? border : "none"};
          margin: ${margin ? margin : "5px"};
        }

        .hc_button:hover {
          background-color: ${({ theme }) => theme.bgSoft};
        }
      `}</style>
    </>
  );
}
