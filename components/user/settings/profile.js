import {
  faCheckCircle,
  faTimesCircle,
  faUpload,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useContext } from "react";
import { searchTags } from "../../../lib/index";
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
  return (
    <div>
      {/* Profile Image */}
      <div className="file is-centered is-boxed is-rounded">
        <label className="file-label">
          <input className="file-input" type="file" name="resume" />
          <span className="file-cta">
            <span className="file-icon">
              <FontAwesomeIcon icon={faUpload} />
            </span>
            <span className="file-label">Change your Profile Image</span>
          </span>
        </label>
      </div>
      {/* Cover Image */}
      <div className="file is-centered is-boxed is-rounded my-4">
        <label className="file-label">
          <input className="file-input" type="file" name="resume" />
          <span className="file-cta">
            <span className="file-icon">
              <FontAwesomeIcon icon={faUpload} />
            </span>
            <span className="file-label">Change your Cover Image</span>
          </span>
        </label>
      </div>

      <div className="basic-details px-2 py-2 my-6">
        <h2 className="title is-4 has-text-centered">Basic Details</h2>
        {/* Name */}
        <div className="field my-4">
          <label htmlFor="name" className="label">
            Name
          </label>
          <div className="control">
            <input
              id="name"
              className="input"
              type="text"
              placeholder="e.g Digvijay Singh"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
        </div>
        {/* Username */}
        <label htmlFor="username" className="label">
          Username
        </label>
        <div className="control has-icons-left has-icons-right ">
          <input
            id="username"
            className="input"
            type="text"
            onChange={(e) => {
              checkUsernameAvailability(e.target.value);
              setUser({ ...user, username: e.target.value });
            }}
            value={user.username}
            name="username"
            placeholder="Username"
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faUser} />
          </span>
          {dataValidation.startedTypingUsername &&
          dataValidation.usernameValid ? (
            <span className="icon is-small is-right">
              <FontAwesomeIcon icon={faCheckCircle} color="#36a666" />
            </span>
          ) : (
            ""
          )}
        </div>
        {/* Skills */}
        <label className="label my-2">Skills</label>
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

        {/* Email */}
        <div className="field my-4">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              type="email"
              placeholder="e.g. diggi1234@somemail.com"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
        </div>
        {/* Bio */}
        <div className="field my-4">
          <label className="label">Bio</label>
          <div className="control">
            <textarea
              className="textarea"
              placeholder="About yourself :)"
              value={user.bio}
              onChange={(e) => setUser({ ...user, bio: e.target.value })}
            />
          </div>
        </div>
        {/* Current Work */}
        <div className="field my-4">
          <label className="label">Current Work</label>
          <div className="control">
            <textarea
              className="textarea"
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
      <div
        className="project-section my-5 px-2"
        style={{ border: "1px solid #d2d2d2", borderRadius: "5px" }}
      >
        <h2 className="title is-4 has-text-centered my-2">Projects</h2>
        {user.projects.map((el, index) => {
          return (
            <div key={el.title} className="my-6 has-text-centered">
              <h2 className="title is-4 my-2 has-text-grey-dark">
                {el.title}
                <button
                  className="delete is-danger mx-4 has-background-danger"
                  onClick={() => deleteProject(index)}
                >
                  Delete
                </button>
              </h2>
              <div>
                <span className="mr-3">Link to the Project:</span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`${el.demo}`}
                >
                  {el.demo}
                </a>
              </div>

              <div>{el.description}</div>
            </div>
          );
        })}
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="e.g TODO List"
              onChange={(e) =>
                setProject({ ...project, title: e.target.value })
              }
              value={project.title}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Demo Link</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="e.g https://amazingsite.com/user/project"
              value={project.demo}
              onChange={(e) => setProject({ ...project, demo: e.target.value })}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea
              className="textarea"
              placeholder="Some details about your project."
              value={project.description}
              onChange={(e) =>
                setProject({ ...project, description: e.target.value })
              }
            />
          </div>
        </div>
        <div className="has-text-centered">
          <button
            className="button my-2 is-primary is-light"
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
            Add
          </button>
        </div>
      </div>

      {/* Social */}
      {/* Website */}
      <div className="social my-6 px-2">
        <h2 className="title is-4 has-text-centered mt-4">Social</h2>
        <div className="field my-4">
          <label className="label">Website</label>
          <div className="control">
            <input
              className="input"
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
        <div className="field my-4">
          <label className="label">Facebook</label>
          <div className="control">
            <input
              className="input"
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
        <div className="field my-4">
          <label className="label">Twitter</label>
          <div className="control">
            <input
              className="input"
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
        <div className="field my-4">
          <label className="label">GitHub</label>
          <div className="control">
            <input
              className="input"
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
        <div className="field my-4">
          <label className="label">Stack Overflow</label>
          <div className="control">
            <input
              className="input"
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
      <div className="has-text-centered">
        <button
          className="button is-primary is-medium is-centered is-2x"
          onClick={() => saveUpdates()}
        >
          Save Settings
        </button>
      </div>

      <style jsx>{`
        .label {
          color: hsl(0, 0%, 60%);
          font-weight: 600;
        }
        .social,
        .basic-details {
          border: 1px solid #d2d2d2;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
}
