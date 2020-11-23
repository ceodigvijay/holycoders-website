import React from "react";
import Layout from "../../../../components/layouts/layout";
import { getPostsByTagId } from "../../../../lib/index";
import AllPosts from "../../../../components/user/posts/allPosts";
import PageSEO from "../../../../components/seo/page";
export default function index({ data, error, page, tagname }) {
  return (
    <Layout>
      <PageSEO
        slug={`tag/${tagname}/page/${page}`}
        title={`${tagname} Tag - HolyCoders`}
        description={`Collection page for articles tagged with ${tagname} tag at HolyCoders blog.`}
      />
      <AllPosts data={data} page={"userPosts"} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const queryTag = context.query.tag;

  let data = null;
  let error = null;
  try {
    // const res = await getUserByUsername(queryUser);
    const res = await getPostsByTagId(queryTag, context.query.pagenum, 12);
    data = res.data;
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      error = e.response.data.message;
    } else {
      error = "Some error Occured";
    }
  }
  return {
    props: {
      data: data,
      error: error,
      page: context.query.pagenum,
      tagname: queryTag,
    },
  };
}
