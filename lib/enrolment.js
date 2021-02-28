import axios from "axios";

module.exports = {
  addEnrolment: async (courseId) => {
    try {
      return await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/enrolment/`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        credentials: "same-origin",
        data: { course_id: courseId },
      });
    } catch (error) {
      throw error;
    }
  },
  updateEnrolment: async ({ courseId, finishDate, lessonId }) => {
    try {
      return await axios({
        method: "PUT",
        url: `${process.env.NEXT_PUBLIC_API_URL}/enrolment/${courseId}`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: { course_id: courseId, finish_date: finishDate, lesson_id: lessonId },
      });
    } catch (error) {
      throw error;
    }
  },
  deleteEnrolment: async (courseId) => {
    try {
      return await axios({
        method: "DELETE",
        url: `${process.env.NEXT_PUBLIC_API_URL}/enrolment/${courseId}`,
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
