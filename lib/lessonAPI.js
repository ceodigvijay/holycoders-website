import axios from "axios";

module.exports = {
  getLessonWithId: async (lessonId) => {
    try {
      return await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/lesson/${lessonId}`,
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
  addLesson: async (title, sequence, courseId) => {
    try {
      return await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/lesson/`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: { title: title, sequence: sequence, course_id: courseId },
      });
    } catch (error) {
      throw error;
    }
  },
  updateLesson: async (lesson) => {
    try {
      return await axios({
        method: "PUT",
        url: `${process.env.NEXT_PUBLIC_API_URL}/lesson/${lesson._id}`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: { ...lesson },
      });
    } catch (error) {
      throw error;
    }
  },
  deleteLesson: async (lessonId) => {
    try {
      return await axios({
        method: "DELETE",
        url: `${process.env.NEXT_PUBLIC_API_URL}/lesson/${lessonId}`,
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
