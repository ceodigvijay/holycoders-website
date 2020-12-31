import React from "react";

export default function tag({ name, icon, slug }) {
  return (
    <div className="flex items-center mx-4">
      <span className="tag">
        <figure class="image is-48x48">
          <img
            src={icon}
            alt={name}
            width="48px"
            height="48px"
            className="h-12 w-12"
          />
        </figure>
      </span>
      <span className=" text-gray-500 p-2">{name}</span>
    </div>
  );
}
