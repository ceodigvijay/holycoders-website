import React, { useEffect, useState, useContext } from "react";
import { getUserAllPosts } from "../../../lib/postAPI";
import GlobalContext from "../../../contexts/globalContext";
import { useRouter } from "next/router";
import ListView from "../listView";
import Link from "next/link";
export default function allPosts() {
  const router = useRouter();
  const queryType = router.query.type;
  const page = router.query.page ? router.query.page : 1;
  const handleQueryChange = (type) => {
    if (type) {
      router.push({
        pathname: router.pathname,
        query: {
          type: type,
        },
      });
    } else {
      router.push({
        pathname: router.pathname,
      });
    }
  };
  const [postData, setPostsData] = useState({
    posts: [],
    meta: {},
  });
  const [searchValue, setSearchValue] = useState("");
  const { totalCount, pageCount, currentPage, limit } = postData.meta;
  const { addNotification } = useContext(GlobalContext);
  useEffect(() => {
    const getData = async () => {
      let data;
      try {
        const res = await getUserAllPosts(page, 12, "post", searchValue);
        data = res.data;
      } catch (error) {
        addNotification({
          message: error.response.data.message
            ? error.response.data.message
            : "Some error in fetching the posts. Please contact us.",
          type: "error",
        });
      }
      if (data) {
        setPostsData(data);
      }
    };
    getData();
  }, [page, searchValue]);

  return (
    <div>
      <nav className="">
        <p className="panel-heading">
          <span>Posts</span>
          <Link
            href="/dashboard/editor/[type]/[id]/"
            as="/dashboard/editor/post/new/"
          >
            <a className="button is-primary">New Post</a>
          </Link>
        </p>
      </nav>
      <ListView
        data={postData}
        isTagPage={false}
        searchvalue={searchValue}
        handleSearch={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
}
