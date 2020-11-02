import axios from "axios";
module.exports = {
  loginWithGoogle: async (tokenId) => {
    try {
      return await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/google-login`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: {
          tokenId: tokenId,
        },
      });
    } catch (error) {
      throw error;
    }
  },
  loginWithUsername: async (username, password) => {
    try {
      return await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/login`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: {
          username: username,
          password: password,
        },
      });
    } catch (error) {
      throw error;
    }
  },
  preRegisterWithEmail: async (email) => {
    try {
      return await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/pre-register`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: {
          email: email,
        },
      });
    } catch (error) {
      throw error;
    }
  },
  registerWithEmail: async (token, name, username, password) => {
    try {
      return await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/register`,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: {
          token: token,
          name: name,
          username: username,
          password: password,
        },
      });
    } catch (error) {
      throw error;
    }
  },
  verifyToken: async (token) => {
    try {
      return await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/verify-token`,
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
