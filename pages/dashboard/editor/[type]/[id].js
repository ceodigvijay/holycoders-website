import React, { useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../../../../components/dashboard/starryEditor/editor"),
  {
    ssr: false,
  }
);

const postEditor = () => {
  const router = useRouter();
  const { type, id } = router.query;
  const [post, setPost] = useState({
    parent_id: null,
    post_id: "",
    title: null,
    slug: null,
    publish_date: "",
    featured_image: '',
    introduction: "",
    content_raw: " ",
    content_html: "",
    tags: [],
    type: type,
    category: "general",
    status: "draft",
    canonical_link: "",
    meta_title: "",
    meta_description: "",
    code_injection_head: "",
    code_injection_foot: "",
    show_comments: true,
    featured: false,
  });
  console.log(post);
  return (
    <div>
      <DynamicComponentWithNoSSR post={post} setPost={setPost} />
    </div>
  );
};

export default postEditor;
