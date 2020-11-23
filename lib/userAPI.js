import axios from "axios";
module.exports = {
  followUser: async (userId, isfollowing) => {
    let reqURL;
    if (isfollowing) {
      reqURL = `${process.env.NEXT_PUBLIC_API_URL}/unfollow/${userId}/`;
    } else {
      reqURL = `${process.env.NEXT_PUBLIC_API_URL}/follow/${userId}/`;
    }
    try {
      return await axios({
        method: "post",
        url: reqURL,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  },
  getUserByUsername: async (username) => {
    try {
      return await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_URL}/user/${username}/`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  },
  reactOnPost: async (type, postID, hasReactedPositively) => {
    try {
      //Reaction data can be either positive 1 or negative.
      return await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/react/post/${postID}/`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: {
          type: `${type}`,
          reaction: hasReactedPositively ? 1 : 0,
        },
      });
    } catch (error) {
      throw error;
    }
  },
  reactOnComment: async (type, commentId, hasReactedPositively) => {
    try {
      //Reaction data can be either positive 1 or negative.
      return await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/react/comment/${commentId}/`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: {
          type: `${type}`,
          reaction: hasReactedPositively ? 1 : 0,
        },
      });
    } catch (error) {
      throw error;
    }
  },
  updateUser: async (user) => {
    try {
      return await axios({
        method: "put",
        url: `${process.env.NEXT_PUBLIC_API_URL}/user/${user.id}/`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: {
          ...user,
        },
      });
    } catch (error) {
      throw error;
    }
  },
  checkUsername: async (username) => {
    try {
      return await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_URL}/user/check/${username}/`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  },
  getBookmarks: async (page, limit) => {
    try {
      return await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_URL}/user/bookmarks?page=${page}&limit=${limit}`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  },
  verifyEmail: async (token) => {
    try {
      return await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/verify/email/`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: {
          token: token,
        },
      });
    } catch (error) {
      throw error;
    }
  },
};
