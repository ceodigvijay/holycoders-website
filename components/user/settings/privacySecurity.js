import React from "react";

export default function privacySecurity() {
  return (
    <div>
      <div className="level">Choose Privacy Mode</div>
      <div class="select">
        <select>
          <option>Star</option>
          <option>Common</option>
          <option>Ghost (Only Name, username is visible)</option>
        </select>
      </div>
    </div>
  );
}
