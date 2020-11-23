import React from "react";
import PostCollectionPage from "../../collection/posts/collectionPage";
function allPosts({ data }) {
  return (
    <div>
      <PostCollectionPage data={data} showPagination={true} />
    </div>
  );
}

export default allPosts;
