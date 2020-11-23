import React, { useContext, useState } from "react";
import Link from "next/link";
import UserContext from "../../contexts/globalContext";
import { useRouter } from "next/router";

export default function navbar() {
  const router = useRouter();
  const currentPath = router.asPath.split("/")[1];
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a
          className={`navbar-item ${currentPath === "" ? "active" : ""}`}
          href="/"
        >
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

      <div className="navbar-menu">
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
            <div className="navbar-item navbar-auth">
              <div className="buttons">
                <span className="button is-primary">
                  <Link href="/login/">
                    <a>
                      <strong>Log in</strong>
                    </a>
                  </Link>
                </span>
                <span className="button is-white">
                  <Link href="/join/">
                    <a className="has-text-primary">
                      <strong>Signup</strong>
                    </a>
                  </Link>
                </span>
              </div>
            </div>
          ) : (
            <div className="navbar-item has-dropdown is-hoverable navbar-auth">
              <a className="navbar-link">
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
