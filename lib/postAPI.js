import axios from "axios";
module.exports = {
  getAllPosts: async (headers, page, limit) => {
    try {
      return await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/posts?page=${
          page ? page : 1
        }&limit=${limit}`,
        headers: headers,
        credentials: "same-origin",
      });
    } catch (error) {
      throw error;
    }
  },
  getUserPublishedPosts: async (userId, page, limit) => {
    try {
      return await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/posts/user/${userId}?page=${page}&limit=${limit}`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  },
  getUserAllPosts: async (page, limit, type) => {
    try {
      return await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/admin/userposts/?type=${type}&page=${page}&limit=${limit}`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  },
  getPostBySlug: async (slug) => {
    try {
      return await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`,
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
  getAdminPostById: async (id) => {
    try {
      return await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_URL}/admin/posts/` + id,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  },
  publishPost: async (id, postData, status) => {
    try {
      return await axios({
        method: "put",
        url: `${process.env.NEXT_PUBLIC_API_URL}/admin/posts/` + id,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: { ...postData, status: status },
      });
    } catch (error) {
      throw error;
    }
  },
  getPostReactions: async (id) => {
    try {
      return await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_URL}/reaction/post/` + id,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  },
};
