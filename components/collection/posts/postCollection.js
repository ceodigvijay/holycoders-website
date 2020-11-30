import React, { useContext } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import GlobalContext from "../../../contexts/globalContext";
import Image from "next/image";
export default function postCollection({ bookmarks, posts }) {
  const { addNotification, user } = useContext(GlobalContext);
  return (
    <div className="columns is-multiline">
      {posts.map((post) => (
        <div className="column is-half ">
          <div
            className="card blog-card"
            style={{
              borderLeft: `4px solid ${
                post.tags[0] ? post.tags[0].hex_color : ""
              }`,
            }}
          >
            <div className="card-content">
              <div className="content">
                <div className="post-tag mb-3 has-background-success-light px-2 py-2">
                  {post.tags.length !== 0 ? "#" + post.tags[0].name : "No tag"}
                </div>
                <Link
                  href={
                    post.type === "page"
                      ? `/${post.slug}`
                      : `/${post.category}/${post.slug}`
                  }
                >
                  <a className="title is-5 is-block is-centered">
                    {post.title}
                  </a>
                </Link>
                <Link href={"/tutorials/[slug]"} as={"/tutorials/" + post.slug}>
                  <a className="description subtitle is-6 my-1 has-text-grey is-block">
                    {post.introduction.substring(0, 120) + "..."}
                  </a>
                </Link>
              </div>
              <footer
                className="is-flex"
                style={{ justifyContent: "space-between" }}
              >
                <div className="media">
                  <div className="media-left">
                    {post.author && post.author[0].profile_image ? (
                      <figure className="image is-48x48">
                        <Image
                          src={post.author[0].profile_image}
                          className="is-rounded"
                          width="48px"
                          height="48px"
                        />
                      </figure>
                    ) : (
                      <figure className="image is-48x48">
                        <img
                          src="https://bulma.io/images/placeholders/48x48.png"
                          alt="Placeholder image"
                          className="is-rounded"
                        />
                      </figure>
                    )}
                  </div>
                  <div className="media-content">
                    <Link
                      href={`/u/${post.author ? post.author[0].username : ""}`}
                    >
                      <a className="title is-6 mb-1 has-text-grey">
                        {post.author && post.author[0].name
                          ? post.author[0].name
                          : post.author[0].username}
                      </a>
                    </Link>
                    <p
                      className="has-text-gray has-text-grey"
                      style={{ fontSize: "0.95rem" }}
                    >
                      {new Date(post.updated_at).toDateString().slice(4)}
                      &nbsp;&bull; &nbsp;
                      {post.reading_time
                        ? post.reading_time / (60 * 1000)
                        : "5"}
                      min
                    </p>
                  </div>
                </div>
                <div className="has-text-grey-dark">
                  {user && user.userId == post.author[0]._id ? (
                    <>
                      <Link
                        href="/u/[user]/editor/[type]/[id]/"
                        as={`/u/${user.username}/editor/post/${post._id}/`}
                      >
                        <a
                          className="button is-primary is-light"
                          style={{ margin: "0px 5px" }}
                        >
                          Edit
                        </a>
                      </Link>
                    </>
                  ) : (
                    <button className="button is-primary is-light">
                      <FontAwesomeIcon
                        style={{ verticalAlign: "middle" }}
                        className="like-button icon is-medium 	"
                        icon={faBookmark}
                      />
                      <span className="is-hidden-touch">
                        {bookmarks && bookmarks.includes(post._id)
                          ? "Bookmarked"
                          : "Save"}
                      </span>
                      <span style={{ margin: "0px 5px" }}>
                        {post.bookmarks}
                      </span>
                    </button>
                  )}
                </div>
              </footer>
            </div>
          </div>
        </div>
      ))}
      <style jsx>{`
        .is-rounded {
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
}
