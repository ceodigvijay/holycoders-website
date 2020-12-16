import React, { useContext, useState } from "react";
import Link from "next/link";
import GlobalContext from "../../contexts/globalContext";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faThumbtack,
  faFile,
  faTags,
  faCog,
  faSignOutAlt,
  faHome,
  faStar,
  faFileAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import AuthWrapper from "./authWrapper";
export default function dashboardLayout({ children }) {
  const router = useRouter();
  const route = router.asPath.split("/").reverse()[1];
  const [currentRoute, setCurrentRoute] = useState(route);
  const { user, globalState, setGlobalState } = useContext(GlobalContext);
  console.log(user);
  return (
    <AuthWrapper>
      <div className="">
        <nav className="dashboard-nav">
          <ul>
            <li className={`back-home`}>
              <Link href="/">
                <a>
                  <span className="sidebar-icon">
                    <FontAwesomeIcon icon={faHome} />
                  </span>
                </a>
              </Link>
            </li>
            <li className={currentRoute === "dashboard" ? "active" : ""}>
              <Link href="/dashboard">
                <a className="sidebar-icon">
                  <FontAwesomeIcon icon={faTachometerAlt} />
                </a>
              </Link>
            </li>
            <li className={currentRoute === "favourites" ? "active" : ""}>
              <Link href="/dashboard/favourites/">
                <a className="sidebar-icon">
                  <FontAwesomeIcon icon={faStar} />
                </a>
              </Link>
            </li>
            <li className={currentRoute === "posts" ? "active" : ""}>
              <Link href="/dashboard/posts/">
                <a className="sidebar-icon">
                  <FontAwesomeIcon icon={faFile} />
                </a>
              </Link>
            </li>
            {user && (user.role === "admin" || user.role === "editor") ? (
              <>
                <li className={currentRoute === "pages" ? "active" : ""}>
                  <Link href="/dashboard/pages/">
                    <a className="sidebar-icon">
                      <FontAwesomeIcon icon={faFileAlt} />
                    </a>
                  </Link>
                </li>
                <li className={currentRoute === "tags" ? "active" : ""}>
                  <Link href="/dashboard/tags/">
                    <a className="sidebar-icon">
                      <FontAwesomeIcon icon={faTags} />
                    </a>
                  </Link>
                </li>
                <li className={currentRoute === "users" ? "active" : ""}>
                  <Link href="/dashboard/users/">
                    <a className="sidebar-icon">
                      <FontAwesomeIcon icon={faUsers} />
                    </a>
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}

            <li className={currentRoute === "setting" ? "active" : ""}>
              <Link href="/dashboard/setting/">
                <a className="sidebar-icon">
                  <FontAwesomeIcon icon={faCog} />
                </a>
              </Link>
            </li>

            <li className="sidebar-logout">
              <Link href="/logout/">
                <a className="sidebar-icon">
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </a>
              </Link>
            </li>
          </ul>
        </nav>
        <main className="dashboard-content">{children}</main>
        <style jsx>{`
          .dashboard-nav {
            width: 66px;
            z-index: 99;
          }
          .dashboard-content {
            margin-left: 78px;
          }

          nav {
            fill: #fff;
            border-right: 2px solid #f5f5f5;
            display: flex;
            justify-content: center;
          }
          ul {
            padding: 12px;
            background-color: #333;
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;
            position: fixed;
            justify-content: center;
          }
          li:hover {
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.2);
            transition: 0.5s;
          }

          .active a {
            color: #36a666;
          }
          .sidebar-icon {
            font-size: 1.5em;
            border-radius: 50%;
            padding: 5px;
            color: #fff;
            margin: 10px 10px;
            display: inline-block;
          }

          .sidebar-logout {
            margin-top: auto;
          }
        `}</style>
      </div>
    </AuthWrapper>
  );
}
