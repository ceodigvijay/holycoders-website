import axios from "axios";

module.exports = {
  getAllQuestions: async ({
    page,
    limit,
    authorOnly,
    status,
    filterString,
  }) => {
    try {
      return await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/question?page=${
          page ? page : 1
        }&limit=${limit}${
          authorOnly ? "&author=true" : ""
        }&status=${status}${filterString}`,
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
  getQuestionWithId: async (questionId) => {
    try {
      return await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/question/${questionId}`,
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
  getQuestionWithSlug: async (slug) => {
    try {
      return await axios({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_API_URL}/question/slug/${slug}`,
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

  runCode: async (questionId, language, untrustedCode) => {
    try {
      return await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/run/${questionId}`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: { code: untrustedCode, lang: language },
      });
    } catch (error) {
      throw error;
    }
  },
  runUntrustedCode: async (language, untrustedCode, payload) => {
    try {
      return await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/run/`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: { code: untrustedCode, lang: language, payload },
      });
    } catch (error) {
      throw error;
    }
  },
  submitCode: async (questionId, language, untrustedCode) => {
    try {
      return await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/submit/${questionId}`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: { code: untrustedCode, lang: language },
      });
    } catch (error) {
      throw error;
    }
  },
  addQuestion: async (title) => {
    try {
      return await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_API_URL}/question/`,
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
  updateQuestion: async (question) => {
    try {
      return await axios({
        method: "PUT",
        url: `${process.env.NEXT_PUBLIC_API_URL}/question/${question._id}`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: { ...question },
      });
    } catch (error) {
      throw error;
    }
  },
  deleteQuestion: async (id) => {
    try {
      return await axios({
        method: "delete",
        url: `${process.env.NEXT_PUBLIC_API_URL}/question/` + id,
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
