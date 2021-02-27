import React, { useState, useEffect } from "react";
import CourseLayout from "../../../components/course/layout";
import { getCourseWithSlug } from "../../../lib/index";
import { useRouter } from "next/router";
import Lesson from "../../../components/course/lesson";

export default function course() {
  const router = useRouter();
  const { slug, lesson } = router.query;
  useEffect(() => {
    const getData = async () => {
      try {
        if (slug) {
          const res = await getCourseWithSlug(slug);
          setCourse(res.data);
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [slug]);
  const [course, setCourse] = useState(null);

  const [title, setTitle] = useState("");

  const addNewCourse = async () => {
    try {
      const res = await addCourse(title);
      router.replace(
        `/dashboard/course/[id]`,
        router.asPath.split("/").slice(0, -2).join("/") + "/" + res.data.id,
        undefined,
        { shallow: true }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  if (!course) {
    return "Loading";
  } else if (lesson) {
    return <Lesson course={course} setCourse={setCourse} />;
  } else {
    return (
      <CourseLayout
        isCourseInfoPage={true}
        course={course}
        setCourse={setCourse}
      >
        Course Intro will be here
      </CourseLayout>
    );
  }
}

// import Link from "next/link";
// import React from "react";
// import Layout from "../../components/layouts/layout";
// import Image from "next/image";
// import PageSEO from "../../components/seo/page";
// import { getAllCourses } from "../../lib/index";

// export default function index({ data }) {
//   const { courses, meta } = data;
//   console.log(data);
//   return (
//     <Layout>
//       <PageSEO
//         slug="learn"
//         title="Learn By Courses - HolyCoders"
//         description="Specially designed courses to learn new things easily. The courses contains chapters divided for learning complex things easily for both beginners and advanced programmers."
//       />
//       <section className="text-gray-700 body-font">
//         <div className="container px-5 py-6 mx-auto">
//           <h2 className="text-4xl font-bold mx-4 my-12 text-gray-600">
//             Explore Courses
//           </h2>
//           <div className="grid grid-cols-12 text-center">
//             {courses.map((course) => {
//               return (
//                 <>
//                   <div className="col-span-12 md:col-span-2 lg:col-span-4 mb-10 px-4">
//                     <div className="rounded-md overflow-hidden">
//                       <Image
//                         className="object-cover object-center h-full w-full"
//                         src="/course.png"
//                         width="640px"
//                         height="360px"
//                         alt="Website hacking and prevention"
//                       />
//                     </div>
//                     <Link href={`/learn/${course.slug}`}>
//                       <a className="title-font text-2xl font-bold text-gray-800 mt-6 mb-3 dark:text-gray-100">
//                         Python - Beginner to Advanced, Learn with Examples
//                         Course
//                       </a>
//                     </Link>
//                   </div>
//                 </>
//               );
//             })}
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// }

// export async function getStaticProps(ctx) {
//   let data;
//   try {
//     const res = await getAllCourses(1, 100);
//     data = await res.data;
//   } catch (error) {
//     console.log(error);
//   }
//   return {
//     props: {
//       data,
//     },
//     revalidate: 3600,
//   };
// }

// import Image from "next/image";
// import React, { useState } from "react";
// import Layout from "../../../components/layouts/layout";
// import { motion, AnimatePresence } from "framer-motion";

// export default function index() {
//   const [openIndex, setOpenIndex] = useState(0);
//   return (
//     <Layout>
//       <div className="min-h-screen">
//         <div className="grid grid-cols-12">
//           <div className="col-span-8 p-4">
//             {/* Course Title */}
//             <h1 className="text-center font-bold text-5xl mt-10 mb-4 text-gray-700">
//               Python Basics
//             </h1>

//             {/* Course Objective */}
//             <div className="text-center font-medium mb-10 text-lg text-gray-600">
//               Learn to build chatbots for any industry verticals using RASA-
//               Application of Artificial Intelligence and Data science
//             </div>

//             <div className="flex items-center justify-between px-2">
//               {/* Course Difficulty */}
//               <div className="flex items-center">
//                 <div className="flex items-center">
//                   {[1, 2, 3, 4, 5].map((d, index) => {
//                     return (
//                       <svg
//                         className={`w-5 h-5 ${
//                           index === 0 ? "text-blue-400" : "text-gray-200"
//                         }`}
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     );
//                   })}
//                 </div>
//                 <span className="mx-2 font-bold text-blue-400">Beginners</span>
//               </div>
//               {/* Course Rating */}
//               <div className="flex items-center">
//                 <span className="mx-2 text-yellow-400 font-bold">5.0</span>
//                 <div className="flex items-center">
//                   {[1, 2, 3, 4, 5].map((d) => {
//                     return (
//                       <svg
//                         className="w-5 h-5 text-yellow-400"
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                       >
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                       </svg>
//                     );
//                   })}
//                 </div>
//                 <span className="mx-2 text-gray-600">34 Ratings</span>
//               </div>
//             </div>

//             {/* Course Features */}
//             <section className="text-gray-600 body-font my-20">
//               <h2 className="text-2xl font-semibold my-4">
//                 What will you learn
//               </h2>
//               <div className="mx-auto">
//                 <div className="flex flex-wrap items-center">
//                   {[1, 2, 3, 4, 5, 6].map((f) => {
//                     return (
//                       <div className="p-2">
//                         <div className="bg-gray-100 rounded flex p-4 h-full items-center">
//                           <svg
//                             fill="none"
//                             stroke="currentColor"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={3}
//                             className="text-gray-500 w-6 h-6 flex-shrink-0 mr-4"
//                             viewBox="0 0 24 24"
//                           >
//                             <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
//                             <path d="M22 4L12 14.01l-3-3" />
//                           </svg>
//                           <span className="title-font font-medium">
//                             Authentic Cliche Forage
//                           </span>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </section>

//             {/* Course Timing and total sections */}
//             {/* Course Contents */}
//             <div className="my-10">
//               <h2 className="text-2xl font-semibold my-4">Course Contents</h2>
//               <div className="rounded-md p-4 mx-10">
//                 {[1, 2, 3, 4, 5].map((section, index) => {
//                   return (
//                     <>
//                       <motion.header
//                         initial={false}
//                         className="w-full p-5 rounded-sm flex justify-between items-center bg-gray-100"
//                         onClick={() =>
//                           openIndex === index
//                             ? setOpenIndex(-1)
//                             : setOpenIndex(index)
//                         }
//                       >
//                         <span>Section {index}</span>
//                         <motion.section
//                           key="content"
//                           initial="collapsed"
//                           animate={index === openIndex ? "open" : "collapsed"}
//                           exit="collapsed"
//                           variants={{
//                             open: { transform: "rotate(180deg)" },
//                             collapsed: { transform: "rotate(0deg)" },
//                           }}
//                           transition={{
//                             duration: 0.2,
//                             ease: [0.04, 0.62, 0.23, 0.98],
//                           }}
//                         >
//                           <svg
//                             className="w-6 h-6"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M19 9l-7 7-7-7"
//                             />
//                           </svg>
//                         </motion.section>
//                       </motion.header>
//                       <AnimatePresence initial={false}>
//                         {openIndex === index && (
//                           <motion.section
//                             className="overflow-hidden"
//                             key="content"
//                             initial="collapsed"
//                             animate="open"
//                             exit="collapsed"
//                             variants={{
//                               open: { opacity: 1, height: "auto" },
//                               collapsed: { opacity: 0, height: 0 },
//                             }}
//                             transition={{
//                               duration: 0.8,
//                               ease: [0.04, 0.62, 0.23, 0.98],
//                             }}
//                           >
//                             <div className="px-10">
//                               {[1, 2, 3, 4, 5].map((c, index) => {
//                                 return (
//                                   <div className="flex items-center justify-between my-4">
//                                     <div className="flex items-center font-semibold text-lg">
//                                       <span className="text-gray-400">0{index+1}</span>
//                                       <span className="mx-4 text-gray-600">Lesson Title</span>
//                                     </div>
//                                     <button>
//                                       <svg
//                                         className="w-10 h-10 text-secondary"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         viewBox="0 0 20 20"
//                                         fill="currentColor"
//                                       >
//                                         <path
//                                           fillRule="evenodd"
//                                           d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
//                                           clipRule="evenodd"
//                                         />
//                                       </svg>
//                                     </button>
//                                   </div>
//                                 );
//                               })}
//                             </div>
//                           </motion.section>
//                         )}
//                       </AnimatePresence>
//                     </>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Course Description with read more */}
//             <section className="my-10">
//               <h2 className="text-2xl font-semibold my-4">Description</h2>
//               <p>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//                 eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
//                 enim ad minim veniam, quis nostrud exercitation ullamco laboris
//                 nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
//                 in reprehenderit in voluptate velit esse cillum dolore eu fugiat
//                 nulla pariatur. Excepteur sint occaecat cupidatat non proident,
//                 sunt in culpa qui officia deserunt mollit anim id est laborum.
//               </p>
//             </section>
//             {/* Prerequisites */}
//             <div className="my-10">
//               <h2 className="text-2xl font-semibold my-4 flex items-center">
//                 Prerequisites
//               </h2>
//               <ul className="list-disc list-inside px-10">
//                 {[1, 2, 3, 4, 5].map((p) => {
//                   return <li>Prerequisite {p}</li>;
//                 })}
//               </ul>
//             </div>
//             {/* License */}
//             <section>
//               <h2 className="flex items-center text-2xl font-semibold my-4">
//                 <svg
//                   className="w-6 h-6"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
//                   />
//                 </svg>
//                 <span className="mx-2">License</span>
//               </h2>
//               <p>All Rights Reserved</p>
//             </section>
//             {/* Course Tags */}
//             <div className="flex flex-wrap items-center justify-center">
//               {[1, 2, 3, 4].map((t) => {
//                 return (
//                   <div className="m-2 bg-gray-100 px-5 py-1 rounded-full">
//                     Tag {t}
//                   </div>
//                 );
//               })}
//             </div>
//             {/* Author with Type person/organisation and coauthors */}
//             {/* Reviews */}
//             {/* Testimonials */}
//           </div>
//           {/* Buy Premium Section */}
//           <div className="col-span-4 p-6">
//             <div className="sticky bg-gray-50 top-10 right-0 shadow-lg rounded-md p-2">
//               {/* Course Featured Image */}
//               <div className="text-center">
//                 <Image
//                   src="/course.png"
//                   width="620"
//                   height="360"
//                   className="rounded-md"
//                 />
//               </div>
//               {/* Price of Plan */}
//               <div className="my-5">
//                 <div className="text-green-600">Early Bird Offer</div>
//                 <div className="flex items-center text-xl my-2">
//                   <span className="line-through mr-4">$9</span>
//                   <span className=" font-semibold text-3xl text-primary-600">
//                     $4
//                   </span>
//                 </div>
//               </div>
//               {/* Benefits of Plan */}
//               <div className="">
//                 {[
//                   "Unlimited Access to all Courses",
//                   "No Ads",
//                   "Premium Projects",
//                   "Premium Articles",
//                 ].map((b) => {
//                   return (
//                     <div className="flex items-center m-2">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                         className="w-6 h-6 mx-1 text-primary-600"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M5 13l4 4L19 7"
//                         />
//                       </svg>
//                       <span>{b}</span>
//                     </div>
//                   );
//                 })}
//               </div>

//               <div className="flex justify-between my-10">
//                 {/* Button to but the Plan */}

//                 <button className="text-center mx-2 my-2 bg-secondary rounded-full py-3 w-full px-10 text-white font-semibold">
//                   Upgrade to Pro
//                 </button>
//                 {/* Free button */}
//                 <button className="text-center mx-2 my-2 hover:bg-gray-300 bg-gray-200 rounded-full w-full py-3 font-semibold">
//                   View Details
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }
