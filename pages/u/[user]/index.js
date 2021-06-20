import {
  faFacebookSquare,
  faGithubSquare,
  faStackOverflow,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import { faExternalLinkAlt, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useContext } from "react";
import Layout from "../../../components/layouts/global/index";
import { Tag } from "../../../components/index";
import { getUserByUsername, followUser } from "../../../lib/index";
import GlobalContext from "../../../contexts/globalContext";
import PageSEO from "../../../components/seo/page";
import Image from "next/image";
import ProgressBar from "../../../components/utils/progress";

function user({ user, meta, error }) {
  const { addNotification } = useContext(GlobalContext);

  const [isfollowing, setIsFollowing] = useState(false);
  const handleFollowUser = async () => {
    try {
      const res = await followUser(user._id, isfollowing);
      if (res.data.ok) {
        setIsFollowing(!isfollowing);
      }
    } catch (error) {
      if (error.response.status) {
        addNotification({
          message: error.response.data.message
            ? error.response.data.message
            : "Not allowed.",
          type: "Error",
        });
      }
    }
  };
  return (
    <Layout>
      {error ? (
        error
      ) : (
        <div>
          <PageSEO
            slug={`u/${user.username}`}
            title={`${user.name} - User at HolyCoders`}
            description={`${user.bio}`}
          />

          <section className="text-gray-600 body-font grid gap-6 grid-cols-12 my-6">
            {/* Mini Profile Sidebar */}
            <div className="container mx-2 col-span-4 bg-gray-50 p-4 text-center">
              <div className="sticky top-0 left-0">
                <div className="mb-8 font-semibold text-lg flex items-center space-x-2">
                  <div>Level 54</div>
                  <div className="flex-1">
                    <ProgressBar completed={50} bgcolor={"#FFC048"} />
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>

                <Image
                  width="150"
                  height="150"
                  className="object-cover object-center rounded-full"
                  alt={user.name ? user.name : "user"}
                  src={user.profile_image}
                />
                <h1 className="title-font sm:text-4xl text-3xl mb-1 mt-2 font-bold text-gray-800 dark:text-gray-50">
                  {user.name}
                </h1>
                <h2 className="mb-6 text-lg text-gray-500">
                  {user.current_work}
                </h2>
                <p className="mb-6 leading-relaxed dark:text-gray-400">
                  {user.bio}
                </p>
                {/* FeatureBox */}
                <div className="flex flex-row flex-wrap align-middle justify-center text-center mb-6">
                  {[
                    { label: "Followers", value: meta?.userFollowerCount },
                    { label: "Following", value: meta?.userFollowingCount },
                    { label: "Posts", value: meta?.userPostCount },
                  ].map((item) => {
                    return (
                      <div className="flex flex-col items-center border-r-2 border-gray-200 px-8">
                        <p className="font-extrabold text-black text-lg">
                          {item.value}
                        </p>
                        <p className="text-sm text-gray-500">{item.label}</p>
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={handleFollowUser}
                  className="bg-primary-500 py-3 px-28 rounded-full text-white font-bold text-md"
                >
                  Follow
                </button>
              </div>
            </div>
            {/* Top Right */}
            <div className="col-span-8 text-gray-600 mx-2 body-font">
              {/* Skills */}
              <section>
                <h2 className="text-center my-4 sm:text-3xl text-2xl font-medium title-font text-gray-900  dark:text-gray-50">
                  Skills
                </h2>
                <div className="flex items-center flex-wrap space-x-4 space-y-4 justify-center">
                  {user.skills.map((element) => {
                    return (
                      <div className="mx-2">
                        <Tag
                          icon={element.featured_image}
                          name={element.name}
                          slug={element.slug}
                          color={element.hex_color}
                        />
                      </div>
                    );
                  })}
                </div>
              </section>
              {/* Skills End */}

              {/* Projects */}
              <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                  <div className="flex flex-col text-center w-full mb-20">
                    <h2 className="text-xs text-primary-600 tracking-widest font-medium title-font mb-1">
                      PROJECTS ON PROUD
                    </h2>
                    <h2 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 dark:text-gray-50">
                      Best Projects Worth For a Shoutout
                    </h2>
                  </div>
                  <div className="grid grid-cols-12">
                    {user.projects.map((project) => {
                      return (
                        <div className="p-2 col-span-6">
                          <div className="flex rounded-lg h-full bg-gray-100 dark:bg-gray-700 p-8 flex-col">
                            <div className="flex items-center mb-3">
                              <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-primary-600 text-white flex-shrink-0">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                  />
                                </svg>
                              </div>
                              <h2 className="text-gray-900 dark:text-gray-50 text-lg title-font font-medium">
                                {project.title}
                              </h2>
                            </div>
                            <div className="flex-grow">
                              <p className="leading-relaxed text-base dark:text-gray-400">
                                {project.description}
                              </p>
                              <a
                                className="mt-3 text-primary-600 inline-flex items-center"
                                target="_blank"
                                rel="norefferer noopener"
                                href={project.demo}
                              >
                                View Demo
                                <svg
                                  fill="none"
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  className="w-4 h-4 ml-2"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
              {/* Projects End */}

              {/* Social Start */}
              <section>
                <div className="flex items-center justify-center pb-8">
                  {user.social.website ? (
                    <a
                      href={user.social.website}
                      className="mx-2"
                      rel="norefferer noopener"
                      target="_blank"
                    >
                      <FontAwesomeIcon icon={faGlobe} color="#666" size="3x" />
                    </a>
                  ) : (
                    ""
                  )}
                  {user.social.facebook ? (
                    <a
                      href={user.social.facebook}
                      className="mx-2"
                      rel="norefferer noopener"
                      target="_blank"
                    >
                      <FontAwesomeIcon
                        icon={faFacebookSquare}
                        color="#3b5998"
                        size="3x"
                      />
                    </a>
                  ) : (
                    ""
                  )}
                  {user.social.twitter ? (
                    <a
                      href={user.social.twitter}
                      className="mx-2"
                      rel="norefferer noopener"
                      target="_blank"
                    >
                      <FontAwesomeIcon
                        icon={faTwitterSquare}
                        color="#00acee"
                        size="3x"
                      />
                    </a>
                  ) : (
                    ""
                  )}
                  {user.social.github ? (
                    <a
                      href={user.social.github}
                      className="mx-2"
                      rel="norefferer noopener"
                      target="_blank"
                    >
                      <FontAwesomeIcon
                        icon={faGithubSquare}
                        color="#211f1f"
                        size="3x"
                      />
                    </a>
                  ) : (
                    ""
                  )}
                  {user.social.stackoverflow ? (
                    <a
                      href={user.social.stackoverflow}
                      className="mx-2"
                      rel="norefferer noopener"
                      target="_blank"
                    >
                      <FontAwesomeIcon
                        icon={faStackOverflow}
                        color="#f48024"
                        size="3x"
                      />
                    </a>
                  ) : (
                    ""
                  )}
                </div>
              </section>
              {/* Social End */}
            </div>
            {/* Top Right End */}
          </section>
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const queryUser = context.query.user;
  let data = null;
  let error = null;
  try {
    // const res = await getUserByUsername(queryUser);
    const res = await getUserByUsername(queryUser);
    data = res.data;
  } catch (e) {
    if (e.response.data && e.response.data.message) {
      error = e.response.data.message;
    } else {
      error = "Some error Occured";
    }
  }
  return { props: { user: data.user, meta: data.meta, error: error } };
}

export default user;
