import axios from "axios";

module.exports = {
  getEnrolmentWithCourseId: async (page = 1, limit = 20) => {
    try {
      return await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/enrolment?page=${page}&limit=${limit}`,
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
  updateEnrolment: async ({
    courseId,
    finishDate,
    lessonId,
    isCourseFinished,
  }) => {
    try {
      return await axios({
        method: "PUT",
        url: `${process.env.NEXT_PUBLIC_API_URL}/enrolment/course/${courseId}${
          isCourseFinished ? "?coursefinished=true" : ""
        }`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: {
          course_id: courseId,
          finish_date: finishDate,
          lesson_id: lessonId,
        },
      });
    } catch (error) {
      throw error;
    }
  },
  deleteEnrolment: async (courseId) => {
    try {
      return await axios({
        method: "DELETE",
        url: `${process.env.NEXT_PUBLIC_API_URL}/enrolment/course/${courseId}`,
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
