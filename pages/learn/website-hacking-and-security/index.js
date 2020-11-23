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
    dateCreated: "13/11/2020",
    courseName: "website-hacking-and-security",
    courseTitle: "Learn Website Hacking from Scratch and Ways to secure them.",
  };

  return (
    <CourseLayout
      meta={meta}
      allChapters={pythonChapters}
      courseDetails={courseDetails}
    >
      {children ? children : "Click On Chapters to start learning"}
    </CourseLayout>
  );
}






// <div className="container columns is-vcentered">
//         <div className="column  is-three-fifths px-5 py-6">
//           <h1 className="title is-1 has-text-grey-dark">
//             Website Hacking and Preventions - Security Best Practices.
//           </h1>
//           <button className="button is-primary is-large mx-2">
//             Start For Free
//           </button>
//           <button className="button is-large mx-2">View Details</button>
//         </div>
//         <div className="column px-4 py-2">
//           <Image
//             src="/content/images/course/websecurity/featured.svg"
//             width="600px"
//             height="600px"
//             alt="Website hacking and prevention"
//           />
//         </div>
//       </div>
      