import {
  faCheckCircle,
  faTimesCircle,
  faUpload,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useContext } from "react";
import { searchTags, handleImageUpload } from "../../../lib/index";
import ReactTags from "react-tag-autocomplete";
import { updateUser, checkUsername } from "../../../lib/index";
import GlobalContext from "../../../contexts/globalContext";

export default function profile({ user, setUser }) {
  const [userProjects, setUserProjects] = useState([]);
  const [showEmailVerify, setShowEmailVerify] = useState(false);
  const {
    addNotification,
    user: globalUserState,
    setUser: setGlobalUserState,
  } = useContext(GlobalContext);

  const [project, setProject] = useState({
    title: "",
    demo: "",
    description: "",
  });
  const [suggestions, setSuggestions] = useState([]);
  const [dataValidation, setDataValidation] = useState({
    startedTypingName: false,
    startedTypingUsername: false,
    usernameValid: false,
    startedTypingPassword: false,
    passwordValid: false,
  });
  const deleteProject = (index) => {
    var newUserProjects = [...user.projects];
    newUserProjects.splice(index, 1);
    setUser({ ...user, projects: newUserProjects });
  };
  const saveUpdates = async () => {
    try {
      const response = await updateUser(user);
      if (response.data.ok) {
        //Update Username in local storage
        if (typeof window !== "undefined" && localStorage.getItem("hc_user")) {
          const newLocalStorageData = JSON.parse(
            localStorage.getItem("hc_user")
          );
          await localStorage.setItem(
            "hc_user",
            JSON.stringify({
              ...newLocalStorageData,
              username: response.data.username,
            })
          );
          setGlobalUserState({
            ...globalUserState,
            username: response.data.username,
          });
        }
        addNotification({
          message: "Details Updated Successfully.",
          type: "Success",
        });
      }
    } catch (error) {
      let message = "Some error Occured in Updating the Details.";
      error && error.response && error.response.data.message
        ? (message = error.response.data.message)
        : "";
      addNotification({ message: message, type: "error" });
    }
  };
  async function checkUsernameAvailability(username) {
    try {
      var resData = await checkUsername(username);
      const available = resData.data.available;
      setDataValidation({
        ...dataValidation,
        startedTypingUsername: true,
        usernameValid: available,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function getTags(query) {
    try {
      const res = await searchTags(query, 5);
      var data = res.data;
      data.map((element) => {
        element.id = element._id;
        return element;
      });
      setSuggestions(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleProfileImageChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file && file.size >= 1000000) {
      addNotification({
        message: "Max File Size Limit is 1 MB",
        type: "error",
      });
    } else {
      try {
        const res = await handleImageUpload(e.target.files[0]);
        res.Location ? setUser({ ...user, profileImage: res.Location }) : "";
        addNotification({
          message: "Image uploaded. You must save the changes to reflect.",
          type: "warning",
        });
      } catch (error) {
        addNotification({
          message: "Some error occured. Please Contact us.",
          type: "error",
        });
      }
    }
  };
  return (
    <div>
      {/* Profile Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Photo</label>
        <div className="mt-2 flex items-center">
          <span className="inline-block h-16 w-16 rounded-full overflow-hidden bg-gray-100">
            <img src={user.profileImage} />
          </span>
          <label
            htmlFor="usersettingImg"
            className="ml-5 bg-white py-2 px-3 cursor-pointer border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Change
          </label>
          <input
            id="usersettingImg"
            onChange={handleProfileImageChange}
            className="hidden invisible"
            type="file"
          />
        </div>
      </div>

      <div className="basic-details px-2 py-2 my-8">
        {/* Name */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3 lg:col-span-1">
            <label htmlFor="name" className=" text-gray-500">
              Name
            </label>
            <div className="relative">
              {/* Name icon */}
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-400"
                >
                  <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path
                    fill="#fff"
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
              </span>
              <input
                id="name"
                className="setting-input pl-10"
                type="text"
                placeholder="e.g Digvijay Singh"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
          </div>
          <div className="col-span-3 lg:col-span-1">
            {/* Username */}
            <label htmlFor="username" className="text-gray-500">
              Username
            </label>
            <div className="relative">
              {/* UsernameIcon */}
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={`w-6 h-6 ${
                    dataValidation.startedTypingUsername &&
                    dataValidation.usernameValid
                      ? " text-green-400"
                      : " text-gray-400"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <input
                id="username"
                className="setting-input pl-10"
                type="text"
                onChange={(e) => {
                  checkUsernameAvailability(e.target.value);
                  setUser({ ...user, username: e.target.value });
                }}
                value={user.username}
                name="username"
                placeholder="Username"
              />
            </div>
          </div>
          <div className="col-span-3 lg:col-span-1">
            {/* Email */}
            <label className="text-gray-500">Email</label>
            <div className="relative">
              {/* Email icon */}
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
              <input
                className="setting-input pl-10"
                type="email"
                placeholder="e.g. diggi1234@somemail.com"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Skills */}
        <label className="text-gray-500 my-2">Skills</label>
        <ReactTags
          tags={user.skills}
          suggestions={suggestions}
          onInput={(e) => getTags(e)}
          onDelete={(i) => {
            const skills = user.skills.slice(0);
            skills.splice(i, 1);
            setUser({ ...user, skills });
          }}
          onAddition={(skill) => {
            const skills = [...user.skills, skill];
            setUser({ ...user, skills });
          }}
        />

        {/* Bio */}
        <div className="my-4">
          <label className="text-gray-500">Bio</label>
          <div className="control">
            <textarea
              className="shadow-sm  dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full border-gray-300 rounded-md"
              placeholder="About yourself :)"
              value={user.bio}
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
            />
          </div>
        </div>
        {/* Current Work */}
        <div className="field my-4">
          <label className="text-gray-500">Current Work</label>
          <div className="control">
            <textarea
              className="shadow-sm dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full border-gray-300 rounded-md"
              placeholder="Some details of what/where you are currently working."
              value={user.currentWork}
              onChange={(e) =>
                setUser({ ...user, currentWork: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      {/* Social */}
      {/* Website */}
      <div className="grid grid-cols-3 my-6 gap-4">
        <div className="col-span-3 lg:col-span-1">
          <label className="text-gray-500">Website</label>
          <div className="control">
            <input
              className="setting-input"
              type="text"
              placeholder="e.g https://holycoders.com"
              value={user.social.website}
              onChange={(e) =>
                setUser({
                  ...user,
                  social: { ...user.social, website: e.target.value },
                })
              }
            />
          </div>
        </div>
        {/* Facebook */}
        <div className="col-span-3 lg:col-span-1">
          <label className="text-gray-500">Facebook</label>
          <div className="control">
            <input
              className="setting-input"
              type="text"
              placeholder="e.g https://facebook.com/privacy-lover"
              value={user.social.facebook}
              onChange={(e) =>
                setUser({
                  ...user,
                  social: { ...user.social, facebook: e.target.value },
                })
              }
            />
          </div>
        </div>
        {/* Twitter */}
        <div className="col-span-3 lg:col-span-1">
          <label className="text-gray-500">Twitter</label>
          <div className="control">
            <input
              className="setting-input"
              type="text"
              placeholder="e.g https://twitter.com/username"
              value={user.social.twitter}
              onChange={(e) =>
                setUser({
                  ...user,
                  social: { ...user.social, twitter: e.target.value },
                })
              }
            />
          </div>
        </div>
        {/* GitHub */}
        <div className="col-span-3 lg:col-span-1">
          <label className="text-gray-500">GitHub</label>
          <div className="control">
            <input
              className="setting-input"
              type="text"
              placeholder="e.g https://github.com/username"
              value={user.social.github}
              onChange={(e) =>
                setUser({
                  ...user,
                  social: { ...user.social, github: e.target.value },
                })
              }
            />
          </div>
        </div>

        {/* StackOverflow */}
        <div className="col-span-3 lg:col-span-2">
          <label className="text-gray-500">Stack Overflow</label>
          <div className="control">
            <input
              className="setting-input"
              type="text"
              placeholder="e.g https://stackoverflow.com/username"
              value={user.social.stackoverflow}
              onChange={(e) =>
                setUser({
                  ...user,
                  social: { ...user.social, stackoverflow: e.target.value },
                })
              }
            />
          </div>
        </div>
      </div>

      {/* End Social */}

      {/* Projects */}
      <div className="mt-12">
        <h2 className="text-center text-lg font-semibold text-gray-600">
          Projects
        </h2>

        <div className="flex flex-wrap -m-4">
          {user.projects.map((project, index) => {
            return (
              <div className="p-4 md:w-1/3">
                <div className="flex rounded-lg h-full bg-gray-100 dark:bg-gray-700 p-8 flex-col">
                  <div className="flex items-center mb-3">
                    <button
                      className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-primary-500 text-white flex-shrink-0"
                      onClick={() => deleteProject(index)}
                    >
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <h2 className="text-gray-900 dark:text-gray-100 text-lg title-font font-medium">
                      {project.title}
                    </h2>
                  </div>
                  <div className="flex-grow">
                    <p className="leading-relaxed text-base  dark:text-gray-400">
                      {project.description}
                    </p>
                    <a
                      className="mt-3 text-primary-400 inline-flex items-center"
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

        <div className="grid grid-cols-2 gap-4 mt-6 mb-4">
          <div className="col-span-2 md:col-span-1">
            <div className="field">
              <label className="text-gray-500">Name</label>
              <div className="control">
                <input
                  className="setting-input"
                  type="text"
                  placeholder="e.g TODO List"
                  onChange={(e) =>
                    setProject({ ...project, title: e.target.value })
                  }
                  value={project.title}
                />
              </div>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="field">
              <label className="text-gray-500">Demo Link</label>
              <div className="control">
                <input
                  className="setting-input"
                  type="text"
                  placeholder="e.g https://amazingsite.com/user/project"
                  value={project.demo}
                  onChange={(e) =>
                    setProject({ ...project, demo: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="text-gray-500">Description</label>
          <div className="control">
            <textarea
              className="setting-input"
              placeholder="Some details about your project."
              value={project.description}
              onChange={(e) =>
                setProject({ ...project, description: e.target.value })
              }
            />
          </div>
        </div>
        <div className="text-center">
          <button
            className="px-4 py-2 m-2 rounded-lg bg-none text-gray-600 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-600"
            onClick={() => {
              var newUserProjects = [...user.projects];
              newUserProjects.push(project);
              setUser({ ...user, projects: newUserProjects });
              setProject({
                title: "",
                demo: "",
                description: "",
              });
            }}
          >
            Append Project
          </button>
        </div>
      </div>

      <div className="text-center my-10">
        <button
          className="px-6 py-4 bg-primary-500 hover:bg-primary-600 text-gray-100 text-lg font-semibold my-6 rounded-lg"
          onClick={() => saveUpdates()}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
