import React, { useState, useContext } from "react";
import { handleImageUpload } from "../../../lib/index";
import { updateUser, checkUsername } from "../../../lib/index";
import GlobalContext from "../../../contexts/globalContext";
import { TagInput } from "../../index";
import Select from "react-select";

const avatarImages = [
  "/content/images/avatars/batman.svg",
  "/content/images/avatars/captain.svg",
  "/content/images/avatars/captain-america.svg",
  "/content/images/avatars/charlie-chaplin.svg",
  "/content/images/avatars/deadpool.svg",
  "/content/images/avatars/einstein.svg",
  "/content/images/avatars/geek.svg",
  "/content/images/avatars/female-artist.svg",
  "/content/images/avatars/harry-potter.svg",
  "/content/images/avatars/ironman.svg",
  "/content/images/avatars/jack-sparrow.svg",
  "/content/images/avatars/magneto-xmen.svg",
  "/content/images/avatars/pilot.svg",
  "/content/images/avatars/princess.svg",
  "/content/images/avatars/spiderman.svg",
  "/content/images/avatars/star-wars.svg",
  "/content/images/avatars/starwars.svg",
  "/content/images/avatars/stewardess.svg",
  "/content/images/avatars/student.svg",
  "/content/images/avatars/terminator.svg",
  "/content/images/avatars/v-for-vendetta.svg",
  "/content/images/avatars/wolverine.svg",
];

const options = avatarImages.map((image) => {
  return { value: image, label: <img src={image} /> };
});
const CustomOption = ({ children, innerProps, isDisabled }) =>
  !isDisabled ? (
    <div
      {...innerProps}
      className="flex items-center justify-center flex-wrap gap-6 w-16 h-16 cursor-pointer"
    >
      {children}
    </div>
  ) : null;
export default function profile({ user, setUser }) {
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
              profileImage: user.profileImage,
            })
          );
          setGlobalUserState({
            ...globalUserState,
            username: response.data.username,
            profileImage: user.profileImage,
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
          <div className="flex flex-col flex-1">
            <div className="my-2">
              <label
                htmlFor="usersettingImg"
                className="ml-5 bg-white py-2 px-3 cursor-pointer border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Upload New
              </label>
              <input
                id="usersettingImg"
                onChange={handleProfileImageChange}
                className="hidden invisible"
                type="file"
              />
            </div>
            <div className="my-2 mx-4">
              <Select
                placeholder="Choose Avatar"
                onChange={({ value }) =>
                  setUser({ ...user, profileImage: value })
                }
                styles={{
                  menuList: (provided, state) => ({
                    ...provided,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    padding: "5px",
                    justifyContent: "center",
                    alignItems: "center",
                  }),
                }}
                options={options}
                components={{ Option: CustomOption }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="basic-details px-2 py-2 my-8">
        {/* Name */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-6">
            <label htmlFor="name" className=" text-gray-500">
              Name
            </label>
            {/* Name icon */}
            <input
              id="name"
              className="setting-input"
              type="text"
              placeholder="e.g Digvijay Singh"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
          <div className="col-span-12 lg:col-span-6">
            {/* Username */}
            <label htmlFor="username" className="text-gray-500">
              Username
            </label>

            <input
              id="username"
              className="setting-input"
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

        {/* Email */}
        <div className="my-4">
          <label className="text-gray-500">Email</label>
          <input
            className="setting-input"
            type="email"
            placeholder="e.g. diggi1234@somemail.com"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        {/* Skills */}
        <div className="my-4">
          <label className="text-gray-500">Skills</label>
          <TagInput
            placeholder="Enter your skills"
            value={user.skills}
            onChange={(skills) => setUser({ ...user, skills })}
          />
        </div>

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

      {/* Projects */}

      {/* Divider */}
      <div className="relative my-14">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-lg leading-5">
          <span className="px-2 text-gray-500 font-bold bg-white">
            Projects
          </span>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex flex-wrap -m-4">
          {user.projects.map((project, index) => {
            return (
              <div className="relative" key={project.demo + project.title}>
                <button
                  className="w-8 h-8 mr-3 absolute -right-4 -top-2 inline-flex items-center justify-center rounded-full bg-red-400 text-white flex-shrink-0"
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
                <div className="flex rounded-lg h-full bg-gray-100 dark:bg-gray-700 p-8 flex-col">
                  <h2 className="text-gray-900 dark:text-gray-100 text-lg title-font font-medium">
                    {project.title}
                  </h2>
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

        <div className="grid grid-cols-2 gap-4 mt-16 mb-4">
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
        <div className="text-right">
          <button
            className="px-4 py-2 m-2 rounded-lg bg-none text-green-600 dark:text-green-200 hover:text-green-700 font-semibold border-2 border-green-600 dark:border-gray-600"
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
            Add Project
          </button>
        </div>
      </div>

      {/* Social */}

      {/* Divider */}
      <div className="relative my-12">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-lg leading-5">
          <span className="px-2 text-gray-500 font-bold bg-white">
            Social Links
          </span>
        </div>
      </div>

      {/* Website */}
      <div className="my-4">
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
      <div className="my-4">
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
      <div className="my-4">
        <label className="text-gray-500">Twitter</label>
        <div className="control">
          <input
            className="setting-input"
            type="text"
            placeholder="e.g https://twitter.com/username"
            value={user.social.twitter ? user.social.twitter : ""}
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
      <div className="my-4">
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
      <div className="my-4">
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

      {/* Dribble */}
      <div className="my-4">
        <label className="text-gray-500">Dribble</label>
        <div className="control">
          <input
            className="setting-input"
            type="text"
            placeholder="e.g https://dribble.com/username"
            value={user.social.dribble}
            onChange={(e) =>
              setUser({
                ...user,
                social: { ...user.social, dribble: e.target.value },
              })
            }
          />
        </div>
      </div>
      {/* Dev */}
      <div className="my-4">
        <label className="text-gray-500">Dev</label>
        <div className="control">
          <input
            className="setting-input"
            type="text"
            placeholder="e.g https://dev.to/username"
            value={user.social.dev}
            onChange={(e) =>
              setUser({
                ...user,
                social: { ...user.social, dev: e.target.value },
              })
            }
          />
        </div>
      </div>
      {/* Codepen */}
      <div className="my-4">
        <label className="text-gray-500">Codepen</label>
        <div className="control">
          <input
            className="setting-input"
            type="text"
            placeholder="e.g https://codepen.io/username"
            value={user.social.codepen}
            onChange={(e) =>
              setUser({
                ...user,
                social: { ...user.social, codepen: e.target.value },
              })
            }
          />
        </div>
      </div>

      {/* End Social */}

      <div className="text-center my-10">
        <button
          className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-gray-100 text-lg font-semibold my-6 rounded-full"
          onClick={() => saveUpdates()}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
