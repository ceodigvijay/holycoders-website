import axios from "axios";
module.exports = {
  getAllAdminTags: async (page, limit) => {
    try {
      return await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/admin/tags/?page=${page}&limit=${limit}`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  },
  searchTags: async (query, limit=5) => {
    try {
      return await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_URL}/tags/search?tagname=${query}&limit=${limit}`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  },
  getAllTags: async (page=1, limit=20) => {
    try {
      return await axios({
        method: "get",
        url: `${process.env.NEXT_PUBLIC_API_URL}/tags?page=${page}&limit=${limit}`,
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
