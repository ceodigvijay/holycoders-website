import React, { useEffect, useState, useContext } from "react";
import { getUserPublishedPosts } from "../../../lib/postAPI";
import GlobalContext from "../../../contexts/globalContext";
import { useRouter } from "next/router";
import PostCollectionPage from '../../collection/posts/collectionPage'
import ListView from "../../dashboard/listView";
function allPosts({data}) {
  console.log(data);
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
  const { totalCount, pageCount, currentPage, limit } = postData.meta;
  const { addNotification, user } = useContext(GlobalContext);
  // useEffect(() => {
  //   const getData = async () => {
  //     let data;
  //     try {
  //       // {user && user.username === }
  //       console.log(router);
  //       const res = await getUserAllPosts(page, 12);
  //       data = res.data;
  //     } catch (error) {
  //       addNotification({
  //         message: "Some error in fetching the posts. Please contact us.",
  //         type: "error",
  //       });
  //     }
  //     if (data) {
  //       setPostsData(data);
  //       console.log(data);
  //     }
  //   };
  //   getData();
  // }, [page, user]);

  return (
    <div>
      <PostCollectionPage data={data} showPagination={true} />
    </div>
  );
}



export default allPosts;