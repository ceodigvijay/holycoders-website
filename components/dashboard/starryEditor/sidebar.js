import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTags from "react-tag-autocomplete";
import { searchTags } from "../../../lib/index";
import moment from "moment";
import {
  faExclamationTriangle,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import GlobalContext from "../../../contexts/globalContext";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

export default function sidebar(props) {
  const { user } = useContext(GlobalContext);
  const { post, setPost } = props;
  const [suggestions, setSuggestions] = useState([]);
  const [date, setDate] = useState(
    post.publish_date
      ? moment(post.publish_date).format("DD/MM/YYYY HH:mm")
      : ""
  );

  async function getTags(query) {
    try {
      const res = await searchTags(query, 5);
      var data = res.data;
      data.map((element) => {
        element.id = element._id;
        return element;
      });
      setSuggestions(data);
    } catch (error) {
      console.log(error);
    }
  }
  const reactTags = React.createRef();
  return (
    <div className="sidebar">
      <label htmlFor="se_url" className="my-2">
        Slug
      </label>
      <input
        id="se_url"
        type="text"
        className="setting-input"
        placeholder="URL of the Post"
        value={post.slug || ""}
        onChange={(e) => {
          setPost({ ...post, slug: e.target.value });
        }}
      />
      {/* Show Publish Time only when user is editor or admin */}
      {user && ["admin", "editor"].includes(user.role) ? (
        <>
          <label for="publish-time">Enter the Publish time</label>
          <Datetime
            className="se-datetime"
            value={
              post.publish_date
                ? moment(post.publish_date).format("DD/MM/YYYY HH:mm")
                : ""
            }
            dateFormat="DD/MM/YYYY"
            timeFormat="HH:mm"
            onChange={(e) => {
              console.log(e.toISOString());
              setPost({ ...post, publish_date: e.toISOString() });
            }}
          />
        </>
      ) : (
        ""
      )}
      <ReactTags
        ref={reactTags}
        tags={post.tags}
        suggestions={suggestions}
        onInput={(e) => getTags(e)}
        onDelete={(i) => {
          const tags = post.tags.slice(0);
          tags.splice(i, 1);
          setPost({ ...post, tags });
        }}
        onAddition={(tag) => {
          const tags = [...post.tags, tag];
          setPost({ ...post, tags });
        }}
      />
      <select
        style={{ width: "100%" }}
        className="setting-input my-2"
        value={post.category}
        onChange={(e) => setPost({ ...post, category: e.target.value })}
      >
        <option value="tutorial">Tutorial</option>
        <option value="news">News</option>
        <option value="snippets">Snippets</option>
        <option value="opinion">Opinion</option>
        <option value="general">General</option>
        <option value="case-study">Case Study</option>
      </select>
      <div className="my-2">
      <input
        type="text"
        className="setting-input my-2"
        placeholder="Meta title"
        value={post.meta_title}
        onChange={(e) => setPost({ ...post, meta_title: e.target.value })}
      />
      <p
        className={` text-sm text-gray-500 ${
          post.meta_title.length <= 60 ? "" : "text-red-600"
        }`}
      >
        {post.meta_title.length} / 60
      </p>
      </div>

      <textarea
        className="setting-input my-2"
        placeholder="Description"
        value={post.meta_description}
        onChange={(e) => setPost({ ...post, meta_description: e.target.value })}
      />
      <p
        className={` text-sm text-gray-500 ${
          post.meta_description.length <= 158 ? "" : "text-red-600"
        }`}
      >
        {post.meta_description.length} / 158
      </p>
      <input
        type="text"
        className="setting-input my-2"
        placeholder="Canonical Link"
        value={post.canonical_link}
        onChange={(e) => setPost({ ...post, canonical_link: e.target.value })}
      />
      {user && user.role === "admin" ? (
        <>
          <textarea
            placeholder="Header Code Injection"
            value={post.code_injection_head}
            onChange={(e) =>
              setPost({ ...post, code_injection_head: e.target.value })
            }
          />
          <textarea
            placeholder="Footer Code Injection"
            value={post.code_injection_head}
            onChange={(e) =>
              setPost({ ...post, code_injection_foot: e.target.value })
            }
          />
        </>
      ) : (
        ""
      )}

      <div className="flex">
          <button className="flex items-center px-1 py-2 mx-1 text-gray-600 rounded-md">
            <span className="mx-1">
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </span>
            <span>Revert to Draft</span>
          </button>
          <button className="flex items-center px-1 py-2 mx-1 text-red-600 rounded-md" onClick={props.deletePost}>
            <span className="mx-1">
              <FontAwesomeIcon icon={faTrashAlt} />
            </span>
            <span>
              {post.status === "trash" ? "Delete Post" : "Move to Trash"}
            </span>
          </button>
      </div>

      <style global jsx>
        {`
          .select {
            margin: 5px 0 20px 0;
          }
          label {
            color: #cecece;
          }
          input,
          textarea {
            display: block;
            padding: 10px;
            font-size: 1.1rem;
            color: #333;
            border: 1px solid #d2d2d2;
            margin: 5px 0 20px 0;
            border-radius: 5px;
            width: 300px;
          }
          .sidebar {
            padding: 20px 20px;
          }
          textarea {
            height: 100px;
          }
        `}
      </style>
    </div>
  );
}
