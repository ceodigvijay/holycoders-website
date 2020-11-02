import React, { useContext } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import GlobalContext from "../../../contexts/globalContext";

function shadeColor(colorCode, amount) {
  var usePound = false;

  if (colorCode[0] == "#") {
    colorCode = colorCode.slice(1);
    usePound = true;
  }

  var num = parseInt(colorCode, 16);

  var r = (num >> 16) + amount;

  if (r > 255) {
    r = 255;
  } else if (r < 0) {
    r = 0;
  }

  var b = ((num >> 8) & 0x00ff) + amount;

  if (b > 255) {
    b = 255;
  } else if (b < 0) {
    b = 0;
  }

  var g = (num & 0x0000ff) + amount;

  if (g > 255) {
    g = 255;
  } else if (g < 0) {
    g = 0;
  }

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

export default function postCollection({ data }) {
  const bookmarks = data.bookmarks;
  const { addNotification, user } = useContext(GlobalContext);
  return (
    <div className="columns is-multiline">
      {data.posts.map((post) => (
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
                  href={"/[category]/[slug]"}
                  as={"/" + post.category + "/" + post.slug}
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
                    <figure className="image is-48x48">
                      <img
                        src="https://bulma.io/images/placeholders/48x48.png"
                        alt="Placeholder image"
                        className="is-rounded"
                      />
                    </figure>
                  </div>
                  <div className="media-content">
                    <p className="title is-6 mb-1 has-text-grey">
                      {post.author && post.author[0].name
                        ? post.author[0].name
                        : post.author[0].username}
                    </p>
                    <p
                      className="has-text-gray has-text-grey"
                      style={{ fontSize: "0.95rem" }}
                    >
                      {new Date(post.updated_at).toDateString().slice(4)}{" "}
                      &nbsp;&bull; &nbsp;
                      {post.reading_time / (60 * 1000)} min
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
                    <button class="button is-primary is-light">
                      <FontAwesomeIcon
                        style={{ verticalAlign: "middle" }}
                        className="like-button icon is-medium 	"
                        icon={faBookmark}
                      />
                      {bookmarks && bookmarks.includes(post._id)
                        ? "Bookmarked"
                        : "Save"}
                      <span style={{ margin: "0px 5px" }}>
                        {post.bookmarks}
                      </span>
                    </button>
                    // <button class="button is-primary is-light">
                    //   {post.category.replace(/\b[a-z]/g, (x) =>
                    //     x.toUpperCase()
                    //   )}
                    // </button>
                  )}
                </div>
              </footer>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
