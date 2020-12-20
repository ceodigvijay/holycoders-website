import React, { useContext, useState, useEffect } from "react";
import Layout from "../layouts/layout";
import { useRouter } from "next/router";
import GlobalContext from "../../contexts/globalContext";
import Comments from "./comments/comments";
import Seo from "../seo/posts/index";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Prism from "prismjs";
import Toolbar from "./toolbar";
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
  const renderers = {
    code: ({ language, value }) => {
      return (
        <pre>
          <code className={`language-${language}`}>{value}</code>
        </pre>
      );
    },
    image: ({ src, alt }) => {
      return <Image src={src} alt={alt} width="720px" height="400px" />;
    },
  };

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
        <header className="article-header my-6">
          <span className="meta text-gray-500 text-xl">
            <time dateTime="date time Insert here">5 months ago</time>
            <span className="bull mx-2">&#8226;</span>
            <span className="reading-time">10 minutes read</span>
          </span>
          <h1 className="title-font text-6xl font-bold mb-6 mt-2">{title}</h1>
        </header>
        <section>
          {featured_image ? (
            <div className="featured_image">
              <Image
              className="rounded-lg"
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
        <div className="content-container grid grid-cols-5 gap-2 my-5">
          <div className="col-span-1">{_id ? <Toolbar postId={_id} /> : ""}</div>
          <div className="col-span-3 prose lg:prose-lg mx-3">
            <p className="mb-6">
              <i className="mr-2">Summary: </i> {introduction}
            </p>
            <ReactMarkdown renderers={renderers} children={content_raw} />
          </div>
          <div className="text-center col-span-1">
            <Image
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
            />
          </div>
        </div>

        <div className="tags are-large container has-text-centered">
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
        <section className="" id="comments">
          
          {showComments ? (
            <>
            <h2 className="title is-4 has-text-centered">Comments</h2>
            <Comments contentId={_id} contentType={"post"} />
            </>
          ) : (
            <div className="has-text-centered">
              <button className="button" onClick={() => setShowComments(true)}>
                Load Comments
              </button>
            </div>
          )}
        </section>
      </article>
      <style jsx>{`
        #comments{
          max-width: 900px;
          margin: 10px auto;
        }
        `}</style>
    </Layout>
  );
};

export default fullArticle;
