import React, { useState } from "react";
import { Button } from "../../index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTags from "react-tag-autocomplete";
import DatePicker from "react-datepicker";
import { searchTags } from "../../../lib/index";
import moment from "moment";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
export default function sidebar(props) {
  const { post, setPost } = props;
  const [suggestions, setSuggestions] = useState([]);
  const [date, setDate] = useState(
    post.publish_date
      ? moment(post.publish_date).format("DD/MM/YYYY HH:mm")
      : ""
  );
  const setInputDate = (passedDate) => {
    if (passedDate.split("/").join("").length > 4) {
      if (passedDate.split("/").join("").length === 8) {
        passedDate += " ";
      } else if (passedDate.split("/").join("").length === 11) {
        passedDate += ":";
      }
      if (passedDate.split("/").join("").length === 14) {
        var newPostDate = moment(passedDate, "DD/MM/YYYY HH:mm").utc().format();
        console.log(newPostDate);
        setPost({ ...post, publish_date: newPostDate });
      }
    } else if (
      passedDate.split("/").join("").length % 2 == 0 &&
      passedDate.split("/").join("").length !== 0
    ) {
      passedDate += "/";
    }
    setDate(passedDate);
  };

  async function getTags(query) {
    try {
      const res = await searchTags(query, 5);
      console.log(res);
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
      <button
        onClick={() => {
          console.log(post);
          // console.log(post.publish_date > new Date());
          console.log(date);
          console.log(moment(date, "DD/MM/YYYY HH:mm").utc().format());
        }}
      >
        Check State
      </button>
      <input
        type="text"
        placeholder="URL of the Post"
        value={post.slug || ""}
        onChange={(e) => {
          setPost({ ...post, slug: e.target.value });
        }}
      />
      <label for="publish-time">Format DD/MM/YYYY HH:mm</label>
      <input
        id="publish-time"
        type="text"
        maxLength="16"
        placeholder="DD/MM/YYYY HH:MM"
        value={date || ""}
        onChange={(e) => {
          setInputDate(e.target.value);
        }}
      />

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
      <div className="select" style={{ width: "100%" }}>
        <select
          style={{ width: "100%" }}
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
      </div>
      <input
        type="text"
        placeholder="Meta title"
        value={post.meta_title}
        onChange={(e) => setPost({ ...post, meta_title: e.target.value })}
      />
      <progress
        className={`progress is-small ${
          post.meta_title.length <= 60 ? "is-success" : "is-danger"
        }`}
        value={(post.meta_title.length / 60) * 100}
        max="100"
      >
        {(post.meta_title.length / 60) * 100}%
      </progress>
      <textarea
        placeholder="Description"
        value={post.meta_description}
        onChange={(e) => setPost({ ...post, meta_description: e.target.value })}
      />
      <progress
        className={`progress is-small ${
          post.meta_description.length <= 158 ? "is-success" : "is-danger"
        }`}
        value={(post.meta_description.length / 158) * 100}
        max="100"
      >
        {(post.meta_description.length / 158) * 100}%
      </progress>
      <input
        type="text"
        placeholder="Canonical Link"
        value={post.canonical_link}
        onChange={(e) => setPost({ ...post, canonical_link: e.target.value })}
      />
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
      <button className="button is-danger is-outlined">
        <FontAwesomeIcon icon={faTrashAlt} size="2x" /> Delete
      </button>
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
