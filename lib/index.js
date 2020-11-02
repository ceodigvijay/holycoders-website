import {
  getAllPosts,
  getUserAllPosts,
  getUserPublishedPosts,
  getPostBySlug,
  getAdminPostById,
  publishPost,
  getPostReactions,
} from "./postAPI";
import {
  loginWithGoogle,
  loginWithUsername,
  preRegisterWithEmail,
  registerWithEmail,
  verifyToken,
} from "./authAPI";
import {
  reactOnPost,
  reactOnComment,
  getUserByUsername,
  followUser,
  checkUsername,
  updateUser,
  verifyEmail,
} from "./userAPI";
import { getAllAdminTags, searchTags, getAllTags } from "./tagAPI";
import { getCommentsWithContentId, addComment } from "./commentAPI";
module.exports = {
  getAllPosts,
  getUserAllPosts,
  getUserPublishedPosts,
  getPostBySlug,
  getAdminPostById,
  publishPost,
  getPostReactions,
  loginWithGoogle,
  loginWithUsername,
  preRegisterWithEmail,
  registerWithEmail,
  checkUsername,
  verifyToken,
  reactOnPost,
  reactOnComment,
  getUserByUsername,
  followUser,
  updateUser,
  verifyEmail,
  getAllAdminTags,
  searchTags,
  getAllTags,
  getCommentsWithContentId,
  addComment,
};
