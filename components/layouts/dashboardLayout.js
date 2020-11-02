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
} from "@fortawesome/free-solid-svg-icons";
import AuthWrapper from "./authWrapper";
export default function dashboardLayout({ children }) {
  const router = useRouter();
  const currentRoute = router.asPath.split("/").reverse()[1];
  console.log(currentRoute);
  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <AuthWrapper>
      <div className="columns is-mobile">
        <nav
          className={`column ${isCollapsed ? "is-1-mobile" : "is-2-mobile"}`}
        >
          {/* <button className="button" onClick={()=>setIsCollapsed(!isCollapsed)}>Menu</button> */}
          <ul>
            <li className={`back-home`}>
              <Link href="/">
                <a>
                  <span class="icon">
                    <FontAwesomeIcon icon={faHome} />
                  </span>
                  <span>Homee</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/dashboard">
                <a className="sidebar-icon">
                  <FontAwesomeIcon icon={faTachometerAlt} size="2x" />
                </a>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/posts/">
                <a className="sidebar-icon">
                  <FontAwesomeIcon icon={faThumbtack} size="2x" />
                </a>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/pages/">
                <a className="sidebar-icon">
                  <FontAwesomeIcon icon={faFile} size="2x" />
                </a>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/tags/">
                <a className="sidebar-icon">
                  <FontAwesomeIcon icon={faTags} size="2x" />
                </a>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/setting/">
                <a className="sidebar-icon">
                  <FontAwesomeIcon icon={faCog} size="2x" />
                </a>
              </Link>
            </li>

            <li className="sidebar-logout">
              <Link href="/logout/">
                <a className="sidebar-icon">
                  <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
                </a>
              </Link>
            </li>
          </ul>
        </nav>
        <main className={`column ${isCollapsed ? "is-11" : "is-10"}`}>
          {children}
        </main>
        <style jsx>{`
          nav {
            border-right: 2px solid #f5f5f5;
            display: flex;
            justify-content: center;
          }
          ul {
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;
            position: fixed;
            justify-content: center;
          }
          .active {
            border-right: 3px solid #2996da;
          }
          .active a {
            color: #2996da;
          }
          .sidebar-icon {
            color: #95a5a6;
            margin: 20px 10px;
            display: inline-block;
          }

          .back-home {
            margin-bottom: auto;
          }
          .sidebar-logout {
            margin-top: auto;
          }
        `}</style>
      </div>
    </AuthWrapper>
  );
}
