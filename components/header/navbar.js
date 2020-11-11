import React, { useContext } from "react";
import Link from "next/link";
import UserContext from "../../contexts/globalContext";

export default function navbar() {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <nav className="navbar is-transparent" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          HolyCoders
        </a>

        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <span className="navbar-item">
            <Link href="/blog">
              <a>Blog</a>
            </Link>
          </span>

          <span className="navbar-item">
            <Link href="/course/">
              <a>Courses</a>
            </Link>
          </span>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>

            <div className="navbar-dropdown is-boxed">
              <Link href="/tags/">
                <a className="navbar-item">Tags</a>
              </Link>
              <a className="navbar-item">Contact</a>
              <hr className="navbar-divider" />
              <a className="navbar-item">Report an issue</a>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          {!user ? (
            <div className="navbar-item">
              <div className="buttons">
                <span className="button is-primary">
                  <Link href="/join">
                    <a className="has-text-white	">
                      <strong>Signup</strong>
                    </a>
                  </Link>
                </span>
                <span className="button is-light">
                  <Link href="/login">
                    <a className="has-text-grey-dark">
                      <strong>Log in</strong>
                    </a>
                  </Link>
                </span>
              </div>
            </div>
          ) : (
            <div className="navbar-item has-dropdown is-hoverable px-2 py-2 mx-2">
              <a className="navbar-link">
                <figure className="image is-48x48 has-image-centered">
                  <img
                    className="is-rounded"
                    src={user.profileImage}
                    alt={user.username}
                  />
                </figure>
              </a>
              <div className="navbar-dropdown is-right ">
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
      <style jsx>{`
        .navbar {
          background-color: transparent;
        }
        a {
          color: inherit !important;
        }
        .navbar-item img {
          max-height: 48px;
        }
      `}</style>
    </nav>
  );
}
