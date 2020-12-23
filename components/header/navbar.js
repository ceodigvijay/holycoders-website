import React, { useContext, useState } from "react";
import Link from "next/link";
import UserContext from "../../contexts/globalContext";
import { useRouter } from "next/router";

export default function navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const router = useRouter();
  const currentPath = router.asPath.split("/")[1];
  const { user } = useContext(UserContext);
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link href="/">
          <a className={`navbar-item ${currentPath === "" ? "active" : ""}`}>
            HolyCoders
          </a>
        </Link>
        <a
          role="button"
          onClick={() => {
            setNavbarOpen(!navbarOpen);
          }}
          className={`navbar-burger burger ${navbarOpen ? "is-active" : ""} `}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className={`navbar-menu ${navbarOpen ? "is-active" : ""}`}>
        <div className="navbar-start">
          <Link href="/blog">
            <a
              className={`navbar-item ${
                currentPath === "blog" ? "active" : ""
              }`}
            >
              Blog
            </a>
          </Link>

          <Link href="/learn/">
            <a
              className={`navbar-item ${
                currentPath === "learn" ? "active" : ""
              }`}
            >
              Courses
            </a>
          </Link>
          <Link href="/news/">
            <a
              className={`navbar-item ${
                currentPath === "news" ? "active" : ""
              }`}
            >
              News
            </a>
          </Link>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>

            <div className="navbar-dropdown is-boxed">
              <Link href="/case-study/">
                <a className="navbar-item">Case Studies</a>
              </Link>
              <Link href="/snippets/">
                <a className="navbar-item">Code Snippets</a>
              </Link>
              <Link href="/tags/">
                <a className="navbar-item">Tags</a>
              </Link>
              <Link href="/contact/">
                <a className="navbar-item">Contact</a>
              </Link>
              <hr className="navbar-divider" />
              <Link href="/report/">
                <a className="navbar-item">Report an issue</a>
              </Link>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          {!user ? (
            <div className="navbar-item navbar-auth">
              <div className="buttons">
                <span className="button is-white">
                  <Link href="/enter/">
                    <a className="has-text-dark">
                      <strong>Dashboard</strong>
                    </a>
                  </Link>
                </span>
              </div>
            </div>
          ) : (
            <div className="navbar-item has-dropdown is-hoverable navbar-auth">
              <a className="navbar-link is-hidden-mobile is-hidden-tablet-only">
                <figure className="image is-48x48 has-image-centered">
                  <img
                    className="is-rounded"
                    src={user.profileImage}
                    alt={user.username}
                  />
                </figure>
              </a>
              <div className="navbar-dropdown is-right is-boxed">
                <Link href="/u/[user]/" as={`/u/${user.username}/`}>
                  <a className="navbar-item">Profile</a>
                </Link>
                <Link href="/u/[user]/posts/" as={`/u/${user.username}/posts/`}>
                  <a className="navbar-item">Posts</a>
                </Link>
                <Link href="/dashboard">
                  <a className="navbar-item">Dashboard</a>
                </Link>
                <hr className="navbar-divider" />

                <Link href="/logout">
                  <a className="navbar-item">Logout</a>
                </Link>
                <a className="navbar-item">Report an issue</a>
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx global>{`
         {
          /* body{
          background-color: #F3F7FC;
        } */
        }
      `}</style>
    </nav>
  );
}
