import React from "react";

export default function tag({ name, icon, slug }) {
  return (
    <div className="control">
      <div className="tags has-addons">
        <span className="tag">
          <figure class="image is-48x48">
            <img src={icon} alt={name} width="48px" height="48px" className="image is-48x48" />
          </figure>
        </span>
        <span className="tag is-gray p-3">{name}</span>
      </div>
    </div>
  );
}
