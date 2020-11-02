import React, { useContext } from "react";
import AllPosts from "../../../../components/user/posts/allPosts";
import Layout from "../../../../components/layouts/layout";
import Link from "next/link";
import GlobalContext from "../../../../contexts/globalContext";
import { getUserPublishedPosts } from "../../../../lib/index";
export default function index({data, error}) {
  const { addNotification, user } = useContext(GlobalContext);
  return (
    <Layout>
      {user ? (
        <div className="is-centered has-text-centered">
          <Link
            href="/u/[user]/editor/[type]/[id]/"
            as={`/u/${user.username}/editor/post/new/`}
          >
            <a className="button is-primary my-6 p-6 is-medium">New Post</a>
          </Link>
        </div>
      ) : (
        ""
      )}

      <AllPosts data={data} page={"userPosts"} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const queryUser = context.query.user;

  let data = null;
  let error = null;
  try {
    // const res = await getUserByUsername(queryUser);
    const res = await getUserPublishedPosts(queryUser, 1, 12);
    data = res.data;
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      error = e.response.data.message;
    } else {
      error = "Some error Occured";
    }
  }
  return { props: { data: data, error: error } };
}
