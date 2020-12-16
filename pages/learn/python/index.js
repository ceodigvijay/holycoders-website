import React from "react";
import importAll from "../../../utils/getAllPosts";
import CourseLayout from "../../../components/layouts/course/courseLayout.js";

export default function Layout({ children, meta }) {
  const pythonChapters = importAll(require.context(`./`, true, /\.mdx$/));
  const courseDetails = {
    author: {
      name: "Digvijay Singh",
      profile: "https://holycoders.com/u/digvijay1/",
    },
    dateCreated: "03/11/2020",
    courseName: "python",
    courseTitle: "Python for Beginners - The Ultimate Guide"
  };
  return (
    <CourseLayout meta={meta} allChapters={pythonChapters} courseDetails={courseDetails}>
      {children ? children : "Click On Chapters to start learning"}
    </CourseLayout>
  );
}
