import React, { useState, useEffect, useContext } from "react";
import Sidebar from "react-sidebar";
import SidebarComponents from "./sidebar";
import ImagePicker from "../../Input/imagePicker";
import Link from "next/link";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import {
  getAdminPostById,
  publishPost,
  handleImageUpload,
  deletePost,
} from "../../../lib/index";
import GlobalContext from "../../../contexts/globalContext";
import moment from "moment";
import TextareaAutosize from "react-textarea-autosize";
import Editor from "rich-markdown-editor";
import Spinner from "../../spinner";
import {
  faChevronLeft,
  faRocket,
  faSlidersH,
} from "@fortawesome/free-solid-svg-icons";

export default function starryEditor(props) {
  const { addNotification, user } = useContext(GlobalContext);
  const router = useRouter();
  const { post, setPost } = props;
  var currentPostID = router.query.id;
  const [isOpen, setOpen] = useState(false);
  //Instead of multiple states only one state which keeps track on loading b/c only one button shown
  const [loadingData, setLoadingData] = useState({
    saveInProgress: false,
  });

  useEffect(() => {
    async function getData() {
      const res = await getAdminPostById(currentPostID);
      setPost({
        parent_id: res.data.parent_id,
        post_id: res.data._id,
        title: res.data.title,
        slug: res.data.slug,
        publish_date: res.data.published_at,
        featured_image: res.data.featured_image,
        introduction: res.data.introduction,
        content_raw: res.data.content_raw,
        content_html: res.data.content_html,
        tags: res.data.tags,
        type: res.data.type,
        category: res.data.category,
        status: res.data.status,
        canonical_link: res.data.canonical_link,
        meta_title: res.data.meta_title,
        meta_description: res.data.meta_description,
        code_injection_head: res.data.code_injection_head,
        code_injection_foot: res.data.code_injection_foot,
      });
    }
    //If current post has valid is then only fetch data from servers
    if (currentPostID && currentPostID !== "new") {
      getData();
    }
  }, [router]);

  async function handleFeaturedImageUpload(e) {
    e.preventDefault();
    try {
      const imageUrl = await handleImageUpload(e.target.files[0]);
      setPost({ ...post, featured_image: imageUrl });
    } catch (error) {
      addNotification({
        message: "Some error occured in uploading the image.",
        type: "error",
      });
    }
  }

  async function handlePostUpdate() {
    const { type, id } = router.query;
    //Set default method as PUT and update url,
    var method = "put";
    var url = `${process.env.NEXT_PUBLIC_API_URL}/admin/posts/` + post.post_id;

    //if post is new then make method as POST and update url
    if (currentPostID === "new") {
      method = "post";
      url = `${process.env.NEXT_PUBLIC_API_URL}/admin/posts/`;
    }
    // e.preventDefault();
    try {
      setLoadingData({ ...loadingData, saveInProgress: true });
      const res = await axios({
        method: method,
        url: url,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
        data: { ...post, type: type },
      });
      console.log(res);
      if (res && res.status === 200 && res.data) {
        setPost({ ...post, slug: res.data.slug });
        if (currentPostID === "new") {
          router.replace(
            `/dashboard/editor/[type]/[id]`,
            router.asPath.split("/").slice(0, -2).join("/") + "/" + res.data.id,
            undefined,
            { shallow: true }
          );
        }
        addNotification({
          message: "Post updated successfully",
          type: "Success",
        });
      } else {
        addNotification({
          message: "Some error occured in updating the post.",
          type: "error",
        });
      }
      setLoadingData({ ...loadingData, saveInProgress: false });
    } catch (e) {
      const errorMessage =
        e.response && e.response.data && e.response.data.message
          ? e.response.data.message
          : "Some error occured in updating the post.";
      addNotification({
        message: errorMessage,
        type: "error",
      });
      setLoadingData({ ...loadingData, saveInProgress: false });
    }
  }

  async function handlePostPublish(e) {
    e.preventDefault();
    let res;
    try {
      var currentStatus =
        moment(post.publish_date).toDate() > new Date()
          ? "future"
          : "published";
      res = await publishPost(post.post_id, post, currentStatus);
    } catch (error) {
      console.log(error);
      addNotification({
        message: "Some error occured in publishing the post.",
        type: "error",
      });
    }
    console.log(res);
    if (res && res.status === 200 && res.data) {
      setPost({
        ...post,
        status: res.data.status ? res.data.status : "published",
      });
      addNotification({
        message:
          post.type === "post"
            ? `<p>Published the Post ${
                res.data.status === "published"
                  ? `<br /><a href="/${post.category}/${post.slug}" target="_blank" rel="noopener noreferrer">View Page</a>`
                  : ""
              }</p>`
            : `<p>Published the Page<br />${
                res.data.status === "published"
                  ? `<a href="/${post.slug}" target="_blank" rel="noopener noreferrer">View Post</a>`
                  : ""
              }</p>`,
        type: "success",
      });
    } else {
      addNotification({
        message: "Some error occured in publishing the post.",
        type: "error",
      });
    }
  }

  async function handleKeyDown(event) {
    let charCode = String.fromCharCode(event.which).toLowerCase();
    if (event.ctrlKey && charCode === "s") {
      event.preventDefault();
      handlePostUpdate();
    }
  }

  //Move posts to trash and delete posts with trash status
  async function handlePostDelete() {
    try {
      const response = await deletePost(post.post_id);
      console.log(response);
      if (response.data.ok) {
        if (post.status === "trash") {
          addNotification({
            message: "Successfully Deleted The Post.",
            type: "success",
          });
          router.push("/dashboard/posts/");
        } else {
          addNotification({
            message: "Successfully Moved the Post to Trash.",
            type: "success",
          });
          setPost({ ...post, status: "trash" });
        }
      }
    } catch (error) {
      addNotification({
        message: "Some error in deleting the post.",
        type: "error",
      });
    }
  }

  return currentPostID && currentPostID !== "new" && !post.post_id ? (
    <Spinner />
  ) : (
    <>
      <Sidebar
        styles={{
          content: {
            position: "relative",
          },
        }}
        sidebar={
          <SidebarComponents
            post={post}
            setPost={setPost}
            deletePost={handlePostDelete}
          />
        }
        open={isOpen}
        onSetOpen={(open) => setOpen(open)}
        styles={{ sidebar: { background: "white" } }}
        pullRight={true}
      >
        <header className="top-toolbar">
          <div className="header-left buttons has-addons">
            {/* <Link href="/u/[user]/posts" as={`/u/${user.username}/posts`}> */}
            <Link href="/dashboard/posts">
              <a className="button is-medium is-light">
                <span className="icon">
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    style={{ verticalAlign: "middle" }}
                  />
                </span>
                <span>Posts</span>
              </a>
            </Link>
            <span className="button is-medium is-white has-text-grey-light">
              {post.status.replace(/\b[a-z]/g, (x) => x.toUpperCase()) ||
                "draft-e"}
            </span>
          </div>
          <div className="header-left">
            {post.status === "draft" &&
            post.post_id &&
            post.post_id !== "new" ? (
              <button
                onClick={(e) => handlePostPublish(e)}
                className="button is-success is-light is-medium"
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faRocket} />
                </span>
                <span>Publish</span>
              </button>
            ) : (
              <button
                onClick={(e) => handlePostUpdate(e)}
                className={`button  is-success is-medium ${
                  loadingData.saveInProgress ? "is-loading" : "is-light"
                } `}
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faRocket} color="#36a666" />
                </span>
                {post.status === "draft" ? (
                  <span>Save Draft</span>
                ) : (
                  <span>Update</span>
                )}
              </button>
            )}

            <button
              onClick={() => setOpen(true)}
              border="1px solid #d5d5d5"
              className="button is-medium ml-5"
            >
              <span className="icon">
                <FontAwesomeIcon icon={faSlidersH} />
              </span>
            </button>
          </div>
        </header>
        <div className="starry-editor-editable" onKeyDown={handleKeyDown}>
          {/* 55-60 Char long */}
          <TextareaAutosize
            className="se-title"
            placeholder="Title"
            value={post.title}
            onChange={(e) => {
              setPost({ ...post, title: e.target.value });
            }}
          />

          <ImagePicker
            handleImageDelete={() => setPost({ ...post, featured_image: null })}
            handleImageUpload={handleFeaturedImageUpload}
            image={post.featured_image}
          />
          <div className="columns">
            <div className="column"></div>
            <div className="column is-three-fifths content is-medium">
              <TextareaAutosize
                className="se-intro"
                placeholder="Introduction"
                value={post.introduction}
                onChange={(e) => {
                  setPost({ ...post, introduction: e.target.value });
                }}
              />
              <Editor
                className="content"
                // dark={true}
                placeholder="Start Writing Your Amazing Post..."
                handleDOMEvents={{
                  focus: () => console.log("FOCUS"),
                  blur: () => console.log("BLUR"),
                  paste: (a) => console.log(a),
                  touchstart: () => console.log("TOUCH START"),
                }}
                onChange={(value) => {
                  console.log(value());
                  setPost({
                    ...post,
                    content_html: "html",
                    content_raw: value(),
                  });
                }}
                uploadImage={(file) => {
                  console.log("File upload triggered: ", file);

                  // Delay to simulate time taken to upload
                  return new Promise((resolve) => {
                    setTimeout(
                      () => resolve("/content/images/dummy.png"),
                      1500
                    );
                  });
                }}
                readOnly={false}
                defaultValue={post.content_raw}
              />
            </div>
            <div className="column"></div>
          </div>
        </div>
      </Sidebar>

      <style jsx global>{`
        html {
          overflow: auto !important;
        }
        .se-title,
        .se-intro {
          margin: 20px auto;
          color: #2c3e50;
          border: none;
          font-size: 20px;
          width: 100%;
          padding: 10px;
          resize: none;
        }
        .se-title {
          font-size: 2.8em;
          font-weight: 600;
        }
        .se-title:hover {
          outline: none;
        }
      `}</style>

      <style jsx>{`
        .top-toolbar {
          padding: 10px;
          display: flex;
          justify-content: space-between;
        }

        textarea {
          outline: none;
        }

        .header-right,
        .header-left {
          display: flex;
        }
        .starry-editor-editable {
          position: relative;
          max-width: 1200px;
          margin: 20px auto;
          padding: 20px;
        }
        .article-title,
        .article-intro,
        input {
          margin: 20px auto;
          border: none;
          font-size: 20px;
          width: 100%;
          padding: 10px;
          font-weight: 600;
          resize: none;
        }
        .article-title {
          font-size: 2.8em;
        }
        .article-title:hover {
          outline: none;
        }
      `}</style>
    </>
  );
}
