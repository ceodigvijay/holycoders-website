import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Like from "../../buttons/like";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
export default function card({
  featured_image,
  slug,
  title,
  tags,
  introduction,
  likes,
  reading_time,
  bookmarks,
  bookmarksList,
}) {
  return (
    <div className="column is-one-third ">
      <div className="card blog-card ">
        {featured_image ? (
          <div class="card-image">
            <Link href={"/tutorials/[slug]"} as={"/tutorials/" + slug}>
              <a>
                <figure class="image ">
                  <img
                    src={featured_image}
                    alt={title}
                    className="featured-image"
                  />
                </figure>
              </a>
            </Link>
          </div>
        ) : (
          ""
        )}
        <div className="card-content">
          <div className="is-flex" style={{ justifyContent: "space-between" }}>
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img
                    src="https://bulma.io/images/placeholders/96x96.png"
                    alt="Placeholder image"
                    className="is-rounded"
                  />
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-6 mb-1 has-text-grey">Digvijay Singh</p>
                <p className="title is-6 has-text-primary">Follow</p>
              </div>
            </div>
            <div className="has-text-grey-dark">
              <div className="">
                {tags.length !== 0 ? "#" + tags[0].name : "No tag"}
              </div>
              <div className="read-time">
                {reading_time / (60 * 1000)} minuted read
              </div>
            </div>
          </div>
          <div className="content">
            <Link href={"/tutorials/[slug]"} as={"/tutorials/" + slug}>
              <a className="title is-5 is-block is-centered">{title}</a>
            </Link>
            <Link href={"/tutorials/[slug]"} as={"/tutorials/" + slug}>
              <a className="description subtitle is-6 my-1 has-text-grey	">
                {introduction.substring(0, 120) + "..."}
              </a>
            </Link>
            <footer class="card-footer mt-6">
              <span href="#" class="card-footer-item 	">
                <Like likesCount={likes} />
              </span>
              <span href="#" class="card-footer-item has-text-info">
                <FontAwesomeIcon
                  style={{ verticalAlign: "middle" }}
                  className="like-button icon is-medium 	"
                  icon={faBookmark}
                />
                {bookmarksList.includes(post._id) ? "Bookmarked" : ""}
                <span style={{ margin: "0px 5px" }}>{bookmarks}</span>
              </span>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
