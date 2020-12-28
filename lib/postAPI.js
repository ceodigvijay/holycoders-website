import axios from "axios";
module.exports = {
  getAllPosts: async (headers, page, limit, category = "") => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/posts?page=${
      page ? page : 1
    }&limit=${limit}${category ? "&category=" + category : ""}`;
    try {
      return await axios({
        method: "GET",
        url: url,
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
  getUserAllPosts: async (page, limit, type, searchText = "", status="") => {
    try {
      return await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/admin/userposts/?type=${type}&page=${page}&limit=${limit}&search=${searchText}&status=${status}`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  },
  getPostsByTagId: async (tagId, page, limit) => {
    try {
      return await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/posts/tag/${tagId}?page=${page}&limit=${limit}`,
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
  deletePost: async (id) => {
    try {
      return await axios({
        method: "delete",
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
  handleImageUpload: async (file) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/file`;
    const formData = new FormData();
    formData.append("avatar", file);
    const res = await axios({
      method: "POST",
      url: url,
      headers: {
        "content-type": "multipart/form-data",
      },
      data: formData,
      withCredentials: true,
    });
    return res.data;
  },
};
