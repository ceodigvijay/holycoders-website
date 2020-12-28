import {
  faFacebookSquare,
  faGithubSquare,
  faStackOverflow,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import {
  faComment,
  faExternalLinkAlt,
  faGlobe,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useContext } from "react";
import Layout from "../../../components/layouts/layout";
import { Tag } from "../../../components/index";
import { getUserByUsername, followUser } from "../../../lib/index";
import GlobalContext from "../../../contexts/globalContext";
import PageSEO from "../../../components/seo/page";
import Image from "next/image";
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

          <section className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
              <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                <Image
                  width="720"
                  height="600"
                  className="object-cover object-center rounded-lg"
                  alt={user.name ? user.name : "user"}
                  src={user.profile_image}
                />
              </div>
              <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                <h1 className="title-font sm:text-4xl text-3xl mb-1 font-medium text-gray-900">
                  {user.name}
                </h1>
                <h2 className="mb-4 text-lg text-gray-500">@{user.username}</h2>
                <p className="mb-8 leading-relaxed">{user.bio}</p>
                <div className="flex justify-center">
                  <button
                    onClick={handleFollowUser}
                    className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Follow
                  </button>
                  <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                    Message
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-col text-center w-full mb-20">
                <h2 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                  Know Something about {user.name}
                </h2>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                  {user.current_work}
                </p>
              </div>
              <div className="flex flex-wrap -m-4 text-center">
                <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                  <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="text-indigo-500 w-12 h-12 mb-3 inline-block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>

                    <h2 className="title-font font-medium text-3xl text-gray-900">
                      {meta.userPostCount}
                    </h2>
                    <p className="leading-relaxed">
                      Post
                      {meta.userPostCount && meta.userPostCount < 2 ? "" : "'s"}
                    </p>
                  </div>
                </div>
                <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                  <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="text-indigo-500 w-12 h-12 mb-3 inline-block"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx={9} cy={7} r={4} />
                      <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75" />
                    </svg>
                    <h2 className="title-font font-medium text-3xl text-gray-900">
                      {meta.userFollowingCount}
                    </h2>
                    <p className="leading-relaxed">Following</p>
                  </div>
                </div>
                <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                  <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="text-indigo-500 w-12 h-12 mb-3 inline-block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>

                    <h2 className="title-font font-medium text-3xl text-gray-900">
                      {meta.userFollowerCount}
                    </h2>
                    <p className="leading-relaxed">Followers</p>
                  </div>
                </div>
                <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                  <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="text-indigo-500 w-12 h-12 mb-3 inline-block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>

                    <h2 className="title-font font-medium text-3xl text-gray-900">
                      46
                    </h2>
                    <p className="leading-relaxed">Likes</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-col text-center w-full mb-20">
                <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
                  PROJECTS ON PROUD
                </h2>
                <h2 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
                  Best Projects Worth For a Shoutout
                </h2>
              </div>
              <div className="flex flex-wrap -m-4">
                {user.projects.map((project) => {
                  return (
                    <div className="p-4 md:w-1/3">
                      <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
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
                          <h2 className="text-gray-900 text-lg title-font font-medium">
                            {project.title}
                          </h2>
                        </div>
                        <div className="flex-grow">
                          <p className="leading-relaxed text-base">
                            {project.description}
                          </p>
                          <a
                            className="mt-3 text-indigo-500 inline-flex items-center"
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

          <div>
            {user.social.website ? (
              <a href={user.social.website} className="button is-white">
                <FontAwesomeIcon icon={faGlobe} color="#666" size="3x" />
              </a>
            ) : (
              ""
            )}
            {user.social.facebook ? (
              <a href={user.social.facebook} className="button is-white">
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
              <a href={user.social.twitter} className="button is-white">
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
              <a href={user.social.github} className="button is-white">
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
              <a href={user.social.stackoverflow} className="button is-white">
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

          <div>
            {user.skills.map((element) => {
              return (
                <Tag
                  icon={element.featured_image}
                  name={element.name}
                  slug={element.slug}
                  color={element.hex_color}
                />
              );
            })}
          </div>
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
