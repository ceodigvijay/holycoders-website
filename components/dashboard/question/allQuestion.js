import React, { useEffect, useState, useContext } from "react";
import { getAllQuestions } from "../../../lib/index";
import GlobalContext from "../../../contexts/globalContext";
import { useRouter } from "next/router";
import ListView from "../collection/index";
export default function allPosts() {
  const router = useRouter();
  const page = router.query.page ? router.query.page : 1;
  const [postData, setPostsData] = useState({
    questions: [],
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
        const res = await getAllQuestions({page:page, limit: 12, authorOnly: true});
        data = res.data;
        console.log(data);
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
      type="question"
      pathname="question"
      data={postData.questions}
      handleSearch={(searchText, statusOfItem) =>
        setSearchValue({ searchText: searchText, statusOfItem: statusOfItem })
      }
      pageCount={postData.meta.pageCount}
    />
  );
}

