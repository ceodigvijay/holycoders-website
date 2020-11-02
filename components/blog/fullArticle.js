import React, { useContext, useState, useEffect } from "react";
import Layout from "../layouts/layout";
import { useRouter } from "next/router";
import GlobalContext from "../../contexts/globalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Like from "../buttons/like";
import Bookmark from "../buttons/bookmark";
import Comments from "./comments/comments";
// import ReadingProgress from "./readingProgress";
import Seo from "../seo/posts/index";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { getPostReactions } from "../../lib/index";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Prism from "prismjs";

const fullArticle = ({
  _id,
  tags,
  title,
  content_raw,
  content_html,
  introduction,
  likes,
  featured_image,
  bookmarks,
  published_at,
  updated_at,
  author,
  meta_title,
  meta_description,
  category,
  slug,
} = {}) => {
  //For like button add temporary state to likeIncremented if yes push update after
  // 3 seconds and set it to false, if user tries to leave display unsaved work
  const [toolbarData, setToolbarData] = useState(null);
  const router = useRouter();
  const postContentRef = React.createRef();
  // const { slug } = router.query;
  const { addNotification } = useContext(GlobalContext);

  useEffect(() => {
    Prism.highlightAll();
  });
  const renderers = {
    code: ({ language, value }) => {
      return (
        <pre>
          <code className={`language-${language}`}>{value}</code>
        </pre>
      );
    },
    image: ({ src, alt }) => {
      return <Image src={src} alt={alt} unsized />;
    },
  };

  // const syncDynamicData = () => {
  //   setTimeout(async () => {
  //     console.log("Post Toolbar data Sync Started");
  //     const reactions = await getPostReactions(_id);
  //     setToolbarData(reactions.data);
  //     console.log(reactions);
  //   }, 5000);
  //   console.log("Sync likes, bookmarks with slug and userId");
  // };
  // if (!toolbarData && _id) {
  //   syncDynamicData();
  // }
  return (
    <Layout>
      <article>
        <Seo
          title={title}
          featuredImage={featured_image}
          tags={tags ? tags : []}
          author={author}
          publishedAt={published_at}
          updatedAt={updated_at}
          metaTitle={meta_title}
          metaDescription={meta_description}
          category={category}
          slug={slug}
        />
        <header className="article-header my-6">
          {/* <button
            onClick={() =>
              addNotification({
                message:
                  "Successfully logged in with some long and long text message and fonts",
                type: "Error",
              })
            }
            className="button mx-4"
          >
            Set Notification
          </button> */}
          <span className="meta">
            <time dateTime="date time Insert here">5 months ago</time>
            <span className="bull">&#8226;</span>
            <span className="reading-time">10 minutes read</span>
          </span>
          <h1 className="title is-1">{title}</h1>
        </header>
        <section>
          {featured_image ? (
            <div className="featured_image">
              <Image
                src={featured_image}
                alt={title}
                width={720}
                height={400}
              />
              {/* <img src={featured_image} alt={title} /> */}
            </div>
          ) : (
            ""
          )}

          <aside className="toc-container"></aside>
        </section>
        <div className="content-container columns my-5">
          <div className="column">For left</div>
          {/* <div
            className="column is-three-fifths content is-medium"
            ref={postContentRef}
            dangerouslySetInnerHTML={{ __html: content_html }}
          /> */}
          <div className="column is-three-fifths content is-medium">
            <p className="mb-6">
              <i className="mr-2">Summary: </i> {introduction}
            </p>
            <ReactMarkdown renderers={renderers} children={content_raw} />
          </div>
          <div className="column">
            {"for right "}
            {/* {toolbarData ? (
              <div className="utility-container">
                <Like
                  postID={_id}
                  likesCount={toolbarData.totalLikes}
                  userHasLiked={toolbarData.hasLiked}
                />
                <Bookmark
                  postID={_id}
                  bookmarkCount={toolbarData.totalBookmarks}
                  userHasbookmarked={toolbarData.hasBookmarked}
                />
                <FontAwesomeIcon className="icon is-medium" icon={faComment} />
                <FontAwesomeIcon
                  color="#00acee"
                  className="icon is-medium"
                  icon={faTwitter}
                />
              </div>
            ) : (
              ""
            )} */}
          </div>
        </div>

        <div className="tags are-large container">
          <div style={{ margin: "0 auto" }}>
            {tags && Array.isArray(tags)
              ? tags.map((element) => {
                  return (
                    <a className="tag" href={"/tag/" + element.slug}>
                      #{element.name}
                    </a>
                  );
                })
              : ""}
          </div>
        </div>
        <section className="mx-6">
          {/* <Comments contentId={_id} contentType={"post"} /> */}
        </section>
      </article>
      <style jsx>{``}</style>
    </Layout>
  );
};

export default fullArticle;
