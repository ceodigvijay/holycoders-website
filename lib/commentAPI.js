import axios from "axios";

module.exports = {
  getCommentsWithContentId: async (contentId, contentType) => {
    try {
      return await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/comments/${contentType}/${contentId}`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        credentials: "same-origin",
      });
    } catch (error) {
      throw error;
    }
  },
  addComment: async ( comment) => {
    try {
      return await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/comments/${comment.content_type}/${comment.content_id}`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: { ...comment },
      });
    } catch (error) {
      throw error;
    }
  },
};
