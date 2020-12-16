import React, { useState } from "react";
import DashboardLayout from "../../../components/layouts/dashboardLayout";
import axios from "axios";
export default function newPost() {
  const [tag, setTag] = useState({
    name: "",
    slug: "",
    description: "",
    meta_title: "",
    meta_description: "",
    featured_image: "",
  });

  const handlePublish = async () => {
    const res = await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/admin/tags`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: tag,
    });
    if (res.status === 200 && res.data.ok === 1) {
      setTag({
        name: "",
        slug: "",
        description: "",
        meta_title: "",
        meta_description: "",
        featured_image: "",
      });
    }
  };
  return (
    <DashboardLayout>
      <div className="tag-settings">
        <div className="field mt-2">
          <label className="label">Tag Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="name"
              value={tag.name}
              onChange={(e) => setTag({ ...tag, name: e.target.value })}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea
              className="textarea"
              placeholder="Description"
              value={tag.description}
              onChange={(e) => setTag({ ...tag, description: e.target.value })}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Slug</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="slug"
              value={tag.slug}
              onChange={(e) => setTag({ ...tag, slug: e.target.value })}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Meta Title</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="meta_title"
              value={tag.meta_title}
              onChange={(e) => setTag({ ...tag, meta_title: e.target.value })}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Meta Description</label>
          <div className="control">
            <textarea
              className="textarea"
              type="text"
              placeholder="Meta Description"
              value={tag.meta_description}
              onChange={(e) =>
                setTag({ ...tag, meta_description: e.target.value })
              }
            />
          </div>
        </div>

        <button className="button is-primary" onClick={() => handlePublish()}>
          Publish Tag
        </button>
      </div>
      <style jsx>{`
        .tag-settings {
          max-width: 720px;
          margin: 0 auto;
        }
      `}</style>
    </DashboardLayout>
  );
}
