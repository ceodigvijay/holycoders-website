import {
  faFacebookSquare,
  faGithubSquare,
  faStackOverflow,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import { faComment, faGlobe, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useContext } from "react";
import Layout from "../../../components/layouts/layout";
import { Tag } from "../../../components/index";
import { getUserByUsername, followUser } from "../../../lib/index";
import GlobalContext from "../../../contexts/globalContext";
import PageSEO from "../../../components/seo/page";
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
        <div className="columns">
          <PageSEO
            slug={`u/${user.username}`}
            title={`${user.name} - User at HolyCoders`}
            description={`${user.bio}`}
          />
          <div className="column is-two-fifths ">
            <div className="mx-4 my-4 profile-card">
              <div className="has-text-centered block">
                <figure className="image is-128x128 my-2 has-image-centered">
                  <img className="is-rounded" src={user.profile_image} />
                </figure>
                <div className="my-4">
                  <h2 className="title is-4">{user.name}</h2>
                  <p className="subtitle is-5">@{user.username}</p>
                </div>
              </div>
              {/* Follow and Message Button */}
              <div className="has-text-centered block">
                <button
                  className={` mx-4 is-medium button ${
                    isfollowing
                      ? "has-background-success"
                      : "has-background-primary"
                  }  has-text-white`}
                  onClick={handleFollowUser}
                >
                  <span className="icon">
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                  <span>Follow</span>
                </button>
                <button className="button is-medium">
                  <span className="icon">
                    <FontAwesomeIcon icon={faComment} />
                  </span>
                  <span>Message</span>
                </button>
              </div>
              {/* Bio */}
              <div className="subtitle is-6 mx-4">{user.bio}</div>
              {/* Status */}
              <div className="has-text-centered mx-4 my-6 subtitle is-5">
                {user.current_work}
              </div>
              {/* Social */}
              <div className="block has-text-centered my-2">
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
                  <a
                    href={user.social.stackoverflow}
                    className="button is-white"
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
            </div>
          </div>
          <div className="column">
            <div className="mx-4 my-4 info-card">
              <nav className="level mx-1 my-4">
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Posts</p>
                    <p className="title">{meta.userPostCount}</p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Following</p>
                    <p className="title">{meta.userFollowingCount}</p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Followers</p>
                    <p className="title">{meta.userFollowerCount}</p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Likes</p>
                    <p className="title">789</p>
                  </div>
                </div>
              </nav>
              {/* Skills */}
              <div className="field is-grouped is-grouped-multiline my-6 mx-4">
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
              {/* Best Projects */}
              <div className="my-6 mx-4">
                <div className="title is-4 has-text-centered">
                  Projects on Proud
                </div>
                {user.projects.map((element) => {
                  return (
                    <div className="block">
                      <div className="title is-6 has-text-centered">
                        {element.title}
                        <a href={element.demo}>Demo Link</a>
                      </div>
                      <div className="subtitle is-6">{element.description}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        figure {
          border: 3px solid #333;
          border-radius: 50%;
          padding: 2px;
        }
        .profile-card,
        .info-card {
          border: 2px solid #d5d5d5;
          border-radius: 10px;
        }
      `}</style>
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
