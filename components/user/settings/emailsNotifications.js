import React from "react";

export default function emailsNotifications() {
  return (
    <div>
      <div className="field">
        <label class="checkbox">
          <input type="checkbox" />
          <span className="mx-2">Emails about trending Posts</span>
        </label>
      </div>
      <div className="field">
        <label class="checkbox">
          <input type="checkbox" />
          <span className="mx-2">Emails about profile stats (Followings, reactions)</span>
        </label>
      </div>
    </div>
  );
}
