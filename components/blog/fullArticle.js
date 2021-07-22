import React, { useContext, useState, useEffect } from "react";
import Layout from "../layouts/global/index";
import { useRouter } from "next/router";
import GlobalContext from "../../contexts/globalContext";
import Comments from "./comments/comments";
import Seo from "../seo/posts/index";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Prism from "prismjs";
import Toolbar from "./toolbar";
import gfm from "remark-gfm";
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
  type,
  author,
  meta_title,
  meta_description,
  category,
  slug,
} = {}) => {
  //For like button add temporary state to likeIncremented if yes push update after
  // 3 seconds and set it to false, if user tries to leave display unsaved work
  const router = useRouter();
  const postContentRef = React.createRef();
  // const { slug } = router.query;
  const { addNotification } = useContext(GlobalContext);
  const [showComments, setShowComments] = useState(false);
  useEffect(() => {
    Prism.highlightAll();
  });

  // Heading Parser to generate heading id
  const flatten = (text, child) => {
    return typeof child === "string"
      ? text + child
      : React.Children.toArray(child.props.children).reduce(flatten, text);
  };
  /**
   * HeadingRenderer is a custom renderer
   * It parses the heading and attaches an id to it to be used as an anchor
   */
  const HeadingRenderer = (props) => {
    const children = React.Children.toArray(props.children);
    const text = children.reduce(flatten, "");
    const slug = text.toLowerCase().replace(/\W/g, "-");
    return React.createElement("h" + props.level, { id: slug }, props.children);
  };

  const renderers = {
    heading: HeadingRenderer,
    code: ({ language, value }) => {
      if (language && ["info", "warning", "tip"].includes(language)) {
        return <p className={language}>{value}</p>;
      }
      return (
        <pre>
          <code className={`language-${language}`}>{value}</code>
        </pre>
      );
    },
    image: ({ src, alt }) => {
      var width = src.split("x").reverse()[1];
      var height = src.split("x").reverse()[0].split(".")[0];
      if (width && height && !isNaN(width) && !isNaN(height)) {
        return (
          <div className="article-img shadow-lg">
            <Image src={src} alt={alt} width={width} height={height} />
          </div>
        );
      }
      return (
        <>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "400px",
              overflow: "hidden",
            }}
          >
            <Image
              src={src}
              alt={alt}
              objectFit="contain"
              objectPosition="50% 50%"
              className="hc_img"
              layout="fill"
            />
          </div>
          <a href={src} target="_blank" rel="norefferer noopener" c>
            Open Image
          </a>
        </>
      );
    },
  };

  //Hack to make info warning and tips
  var newRawContent = content_raw ? content_raw.replace(/:::/g, "```") : "";
  return (
    <Layout>
      <article>
        <Seo
          title={title}
          featuredImage={featured_image}
          introduction={introduction}
          type={type}
          tags={tags ? tags : []}
          author={author}
          publishedAt={published_at}
          updatedAt={updated_at}
          metaTitle={meta_title}
          metaDescription={meta_description}
          category={category}
          slug={slug}
        />
        <header className="article-header py-6">
          <span className="meta text-gray-500 text-xl">
            <time dateTime="date time Insert here">5 months ago</time>
            <span className="bull mx-2">&#8226;</span>
            <span className="reading-time">10 minutes read</span>
          </span>

          <h1 className="md:px-2 title-font text-gray-800 dark:text-gray-100 text-4xl md:text-5xl lg:text-6xl font-bold mb-6 mt-2">
            {title}
          </h1>
        </header>
        <section>
          {featured_image ? (
            <div className="featured_image">
              <Image
                className="rounded md:rounded-lg"
                src={featured_image}
                alt={title}
                width={720}
                height={400}
              />
            </div>
          ) : (
            ""
          )}
          <aside className="toc-container"></aside>
        </section>
        <div className="content-container grid grid-cols-5 gap-2 my-5 dark:text-gray-100">
          <div className="col-span-5 lg:col-span-1">
            {_id ? <Toolbar postId={_id} /> : ""}
          </div>
          <div className="col-span-5 lg:col-span-3 prose dark:prose-dark prose-lg lg:prose-xl max-w-none mx-3">
            <p className="mb-6">
              <i className="mr-2">
                <span className="font-semibold mr-2">Summary:</span>
                {introduction}
              </i>
            </p>
            <ReactMarkdown
              plugins={[gfm]}
              renderers={renderers}
              children={newRawContent}
            />
          </div>
          <div className="text-center col-span-5 lg:col-span-1">
            <div className="grid bg-gray-700 sticky top-0 rounded px-2 py-2 text-white font-bold">
              <p>Join Our Youtube Channel</p>
              <a
                href="https://www.youtube.com/channel/UChuKVKyXIcsv4vb9QD9PDTQ?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 block py-3 my-6 bg-red-600 text-white rounded font-bold"
              >
                Subscribe
              </a>
            </div>
            {/* <Image
              src="/content/images/dummy/laid1.png"
              alt="ad"
              width="280"
              height="250"
              className="article-rights-img rounded-lg"
            />
            <div className="my-6"></div>
            <Image
              src="/content/images/dummy/laid3.png"
              alt="ad"
              width="280"
              height="250"
              className="article-rights-img rounded-lg"
            /> */}
          </div>
        </div>

        <div className="text-center text-xl text-gray-500 my-4  dark:text-gray-400">
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

        <section id="comments" className="py-20">
          {showComments ? (
            <>
              <h2 className="text-center text-gray-800 dark:text-gray-100 text-2xl my-4">
                Comments
              </h2>
              <Comments contentId={_id} contentType={"post"} />
            </>
          ) : (
            <div className="text-center">
              <button
                className="px-4 py-2 bg-primary-600 m-auto hover:bg-primary-800 text-white rounded flex items-center"
                onClick={() => setShowComments(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 mx-2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>

                <span className="text-lg">Load Comments</span>
              </button>
            </div>
          )}
        </section>
      </article>
      <style jsx>{`
        #comments {
          max-width: 900px;
          margin: 0px auto;
        }
      `}</style>
    </Layout>
  );
};

export default fullArticle;
