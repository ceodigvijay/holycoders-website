import axios from "axios";

module.exports = {
  getAllCourses: async ({ page, limit, authorOnly }) => {
    try {
      return await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/course?page=${
          page ? page : 1
        }&limit=${limit}${authorOnly ? "&author=true" : ""}`,
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
  getCourseWithId: async (courseId) => {
    try {
      return await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/course/${courseId}`,
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
  getCourseWithSlug: async (slug) => {
    try {
      return await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/course/slug/${slug}`,
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

  addCourse: async (title) => {
    try {
      return await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/course/`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: { title: title },
      });
    } catch (error) {
      throw error;
    }
  },
  updateCourse: async (course) => {
    try {
      return await axios({
        method: "PUT",
        url: `${process.env.NEXT_PUBLIC_API_URL}/course/${course._id}`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: { ...course },
      });
    } catch (error) {
      throw error;
    }
  },
};
