import React, { useEffect, useState, useContext } from "react";
import { getUserAllPosts } from "../../../lib/postAPI";
import GlobalContext from "../../../contexts/globalContext";
import { useRouter } from "next/router";
import ListView from "../collection/index";
export default function allPosts() {
  const router = useRouter();
  const page = router.query.page ? router.query.page : 1;
  const [postData, setPostsData] = useState({
    posts: [],
    meta: {},
  });
  const { addNotification } = useContext(GlobalContext);
  const [searchValue, setSearchValue] = useState({
    searchText: "",
    statusOfItem: "",
  });

  useEffect(() => {
    const getData = async () => {
      let data;
      try {
        const res = await getUserAllPosts(
          page,
          12,
          "page",
          searchValue.searchText,
          searchValue.statusOfItem
        );
        data = res.data;
      } catch (error) {
        addNotification({
          message:
            error && error.response && error.response.data.message
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
    <ListView
      type="page"
      pathname="pages"
      data={postData.posts}
      handleSearch={(searchText, statusOfItem) =>
        setSearchValue({ searchText: searchText, statusOfItem: statusOfItem })
      }
      pageCount={postData.meta.pageCount}
    />
  );
}
