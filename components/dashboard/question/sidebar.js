import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import GlobalContext from "../../../contexts/globalContext";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { TagInput } from "../../index";

export default function sidebar({ question, setQuestion, deleteQuestion }) {
  const { user } = useContext(GlobalContext);

  return (
    <div className="sidebar">
      <label htmlFor="se_url" className="my-2">
        Slug
      </label>
      <input
        value={question.slug}
        onChange={(e) => setQuestion({ ...question, slug: e.target.value })}
        id="se_url"
        type="text"
        className="setting-input"
        placeholder="URL of the Post"
      />
      {/* Show Publish Time only when user is editor or admin */}
      {/* {user && ["admin", "editor"].includes(user.role) ? (
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
              setPost({ ...post, publish_date: e.toISOString() });
            }}
          />
        </>
      ) : (
        ""
      )} */}

      <div className="my-4 max-w-xs">
        <label className="my-2">Tags</label>
        <TagInput
          value={question.tags}
          onChange={(tags) => setQuestion({ ...question, tags: tags })}
        />
      </div>

      <select
        style={{ width: "100%" }}
        className="setting-input my-2"
        value={question.required_subscription}
        onChange={(e) =>
          setQuestion({ ...question, required_subscription: e.target.value })
        }
      >
        <option value="free">Free</option>
        <option value="premium">Premium</option>
        <option value="private">Private</option>
      </select>
      <div className="my-2">
        <input
          type="text"
          className="setting-input my-2"
          placeholder="Meta title"
          value={question.meta_title}
          onChange={(e) =>
            setQuestion({ ...question, meta_title: e.target.value })
          }
        />
        <p
          className={` text-sm text-gray-500 ${
            question.meta_title.length <= 60 ? "" : "text-red-600"
          }`}
        >
          {question.meta_title.length} / 60
        </p>
      </div>
      <textarea
        className="setting-input my-2"
        placeholder="Description"
        value={question.meta_description}
        onChange={(e) =>
          setQuestion({ ...question, meta_description: e.target.value })
        }
      />
      <p
        className={` text-sm text-gray-500 ${
          question.meta_description.length <= 158 ? "" : "text-red-600"
        }`}
      >
        {question.meta_description.length} / 158
      </p>
      <select
        style={{ width: "100%" }}
        className="setting-input my-2"
        value={question.status}
        onChange={(e) => setQuestion({ ...question, status: e.target.value })}
      >
        <option value="published">Published</option>
        <option value="draft">Draft</option>
      </select>
      <div className="flex">
        <button className="flex items-center px-1 py-2 mx-1 text-red-600 rounded-md" onClick={deleteQuestion}>
          <span className="mx-1">
            <FontAwesomeIcon icon={faTrashAlt} />
          </span>
          <span>Delete Question</span>
        </button>
      </div>
      <style jsx>
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
