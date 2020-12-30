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
      setPost({ ...post, featured_image: imageUrl.Location });
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
      addNotification({
        message: "Some error occured in publishing the post.",
        type: "error",
      });
    }
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
        <div className="">
          <header className="flex justify-between my-2">
            <div className="flex items-center buttons has-addons">
              <Link href="/dashboard/posts">
                <a className="px-4 my-4 flex items-center group border-r-2 border-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span>Posts</span>
                </a>
              </Link>
              <span className=" text-gray-400 px-4 py-4 flex items-center">
                {post.status.replace(/\b[a-z]/g, (x) => x.toUpperCase()) ||
                  "draft-e"}
              </span>
            </div>
            <div className="flex">
              {(post.status === "draft" || post.status === "review") &&
              post.post_id &&
              post.post_id !== "new" ? (
                <button
                  onClick={(e) => handlePostPublish(e)}
                  className={`px-4 mx-2 rounded-md flex items-center bg-primary-600 hover:bg-primary-700 text-white text-xl`}
                >
                  <span className="mx-2">
                    <svg
                      className={`w-8 h-8 ${
                        loadingData.saveInProgress ? "animate-pulse" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </span>
                  <span>Publish</span>
                </button>
              ) : (
                <button
                  onClick={(e) => handlePostUpdate(e)}
                  className={`px-4 mx-2 rounded-md flex items-center bg-primary-600 hover:bg-primary-700 text-white text-xl`}
                >
                  <span className="mx-2">
                    <svg
                      className={`w-8 h-8 ${
                        loadingData.saveInProgress ? "animate-pulse" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
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
                className="px-4 py-2 mx-4 bg-gray-50 text-gray-800 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
          </header>
          <div
            className="starry-editor-editable my-12"
            onKeyDown={handleKeyDown}
          >
            {/* 55-60 Char long */}
            <TextareaAutosize
              className="title-font text-center text-gray-800 dark:text-gray-100 text-5xl lg:text-6xl font-bold focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full border-transparent resize-none rounded-md"
              placeholder="Title"
              value={post.title}
              onChange={(e) => {
                setPost({ ...post, title: e.target.value });
              }}
            />

            <ImagePicker
              handleImageDelete={() =>
                setPost({ ...post, featured_image: null })
              }
              handleImageUpload={handleFeaturedImageUpload}
              image={post.featured_image}
            />
            <div className="grid grid-cols-5 gap-2">
              <div className="col-span-5 lg:col-span-1"></div>
              <div className="col-span-5 lg:col-span-3 ">
                <TextareaAutosize
                  className="w-full border-gray-50 resize-none text-lg"
                  placeholder="Introduction"
                  value={post.introduction}
                  onChange={(e) => {
                    setPost({ ...post, introduction: e.target.value });
                  }}
                />
                <Editor
                  className="prose dark:prose-dark lg:prose-lg max-w-none"
                  // dark={true}
                  placeholder="Start Writing Your Amazing Post..."
                  handleDOMEvents={{
                    focus: () => console.log("FOCUS"),
                    blur: () => console.log("BLUR"),
                    paste: (a) => console.log("PASTE"),
                    touchstart: () => console.log("TOUCH START"),
                  }}
                  onChange={(value) => {
                    setPost({
                      ...post,
                      content_html: "html",
                      content_raw: value(),
                    });
                  }}
                  uploadImage={async (file) => {
                    try {
                      //If filesize>1mb raise error
                      if (file && file.size >= 1000000) {
                        addNotification({
                          message: "Max File Size Limit is 1 MB",
                          type: "error",
                        });
                        throw "FILE ERROR";
                      } else {
                        const res = await handleImageUpload(file);
                        console.log(res);
                        return res.Location;
                      }
                    } catch (error) {
                      let message = "Some error occured";
                      if (
                        error &&
                        error.response.data &&
                        error.response.data.code === "FILE_TOO_LARGE"
                      ) {
                        message = "Max File Size Limit is 1 MB";
                      }
                      addNotification({
                        message: message,
                        type: "error",
                      });

                      throw error;
                    }
                  }}
                  readOnly={false}
                  defaultValue={post.content_raw}
                />
              </div>
              <div className="col-span-5 lg:col-span-1"></div>
            </div>
          </div>
        </div>
      </Sidebar>

      <style jsx global>{`
        html {
          overflow: auto !important;
        }
        .prose p:not(:last-child),
        .prose dl:not(:last-child),
        .prose ol:not(:last-child),
        .prose ul:not(:last-child),
        .prose blockquote:not(:last-child),
        .prose pre:not(:last-child),
        .prose table:not(:last-child) {
          margin-bottom: 1.33em;
        }
      `}</style>
    </>
  );
}
