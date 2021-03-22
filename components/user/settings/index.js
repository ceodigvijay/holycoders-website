import React, { useState } from "react";
import Profile from "./profile";
import PrivacySecurity from "./privacySecurity";
import EmailsNotifications from "./emailsNotifications";
import Layout from "../../layouts/global/index";
export default function index({ user, setUser }) {
  const [activeTab, setActiveTab] = useState("profile");
  let settingOptions = "";

  const renderSettings = () => {
    switch (activeTab) {
      case "profile":
        return <Profile user={user} setUser={setUser} />;
        break;
      case "privacy-security":
        return <PrivacySecurity />;
        break;
      case "emails-notifications":
        return <EmailsNotifications />;
        break;
      default:
        return "";
        break;
    }
  };

  return (
    <Layout>
      <section className="columns max-w-2xl mx-auto">
        {/* <aside className="menu column is-one-fifth px-3 panel">
          <p className="menu-label">Settings</p>
          <ul className="menu-list">
            <li onClick={() => setActiveTab("profile")}>
              <a className={`${activeTab === "profile" ? "is-active" : ""}`}>
                Profile
              </a>
            </li>
            <li onClick={() => setActiveTab("privacy-security")}>
              <a
                className={`${
                  activeTab === "privacy-security" ? "is-active" : ""
                }`}
              >
                Privacy and Security
              </a>
            </li>
            <li onClick={() => setActiveTab("emails-notifications")}>
              <a
                className={`${
                  activeTab === "emails-notifications" ? "is-active" : ""
                }`}
              >
                Emails and Notifications
              </a>
            </li>
          </ul>
        </aside> */}
        <div className="column mx-6">{renderSettings()}</div>
      </section>
    </Layout>
  );
}
