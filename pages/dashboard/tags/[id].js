import React, { useState, useEffect } from "react";
import Layout from "../../../components/layouts/layout";
import axios from "axios";
import { useRouter } from "next/router";
import DashboardLayout from "../../../components/layouts/dashboardLayout";

export default function newPost() {
  const [tag, setTag] = useState({
    name: "",
    slug: "",
    description: "",
    meta_title: "",
    meta_description: "",
    featured_image: "",
    hex_color: "",
  });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function getData() {
      const res = await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_URL}/tags/` + id,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: tag,
      });
      if (res.status === 200) {
        setTag({
          name: res.data.name ? res.data.name : "",
          slug: res.data.slug,
          description: res.data.description ? res.data.description : "",
          meta_title: res.data.meta_title ? res.data.meta_title : "",
          meta_description: res.data.meta_description ? res.data.meta_description : "",
          featured_image: res.data.featured_image ? res.data.featured_image : "" ,
          hex_color: res.data.hex_color ? res.data.hex_color : "",
        });
      }
    }
    if (id && id !== "new") {
      getData();
    }
  }, [id]);

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
      console.log(res);
      console.log(router.asPath.split("/"));
      router.replace(
        `/dashboard/tags/[id]`,
        router.asPath.split("/").slice(0, -2).join("/") + "/" + res.data.id,
        undefined,
        { shallow: true }
      );
    }
  };

  const handleUpdate = async () => {
    const res = await axios({
      method: "put",
      url: `${process.env.NEXT_PUBLIC_API_URL}/admin/tags/` + id,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: tag,
    });
    if (res.status === 200 && res.data.ok === 1) {
      setTag({ ...tag, slug: res.data.slug });
      console.log(res);
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
          <label className="label">Color</label>
          <div className="control">
            <input
              className="input"
              type="color"
              value={tag.hex_color}
              onChange={(e) => setTag({ ...tag, hex_color: e.target.value })}
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

        {id === "new" ? (
          <button className="button is-primary" onClick={() => handlePublish()}>
            Publish Tag
          </button>
        ) : (
          <button className="button is-primary" onClick={() => handleUpdate()}>
            Update Tag
          </button>
        )}
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
