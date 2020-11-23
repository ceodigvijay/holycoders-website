import React from "react";
import FullArticle from "../../components/blog/fullArticle";
import { getPostBySlug } from "../../lib/index";
import axios from 'axios'
const Post = (data) => {
  if (data && data.title) {
    return <FullArticle {...data} />;
  }
  return "Loading";
};

export const getStaticProps = async (ctx) => {
  const res = await getPostBySlug(ctx.params.slug);
  const postData = res.data;
  return {
    props: postData,
  };
};

export const getStaticPaths = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/slugs`);
  const paths = res.data.map((post) => {
    return { params: { slug: post.slug, category: post.category } };
  });
  // const paths = [{ params: { slug: "post-slug-1", category: "general" } }];
  return {
    fallback: true,
    paths: paths,
  };
};

export default Post;
