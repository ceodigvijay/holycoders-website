import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useContext } from "react";
import { searchTags } from "../../../lib/index";
import ReactTags from "react-tag-autocomplete";
import { updateUser } from "../../../lib/index";
import GlobalContext from '../../../contexts/globalContext'
export default function profile({ user, setUser }) {
  const [userProjects, setUserProjects] = useState([]);
  const [showEmailVerify, setShowEmailVerify] = useState(false);
  const { addNotification } = useContext(GlobalContext);

  const [project, setProject] = useState({
    title: "",
    demo: "",
    description: "",
  });
  const [suggestions, setSuggestions] = useState([]);
  const deleteProject = (index) => {
    var newUserProjects = [...user.projects];
    newUserProjects.splice(index, 1);
    console.log(newUserProjects);
    setUser({ ...user, projects: newUserProjects });
  };
  const saveUpdates = async () => {
    try {
      const response = await updateUser(user);
      if(response.data.ok){
        addNotification({
          message: "Details Updated Successfully.",
          type: "Success"
        })
      }
    } catch (error) {
      console.log(error);
    }
  };
  async function getTags(query) {
    try {
      const res = await searchTags(query, 5);
      console.log(res);
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
      <div class="file is-centered is-boxed is-rounded">
        <label class="file-label">
          <input class="file-input" type="file" name="resume" />
          <span class="file-cta">
            <span class="file-icon">
              <FontAwesomeIcon icon={faUpload} />
            </span>
            <span class="file-label">Change your Profile Image</span>
          </span>
        </label>
      </div>
      {/* Cover Image */}
      <div class="file is-centered is-boxed is-rounded my-4">
        <label class="file-label">
          <input class="file-input" type="file" name="resume" />
          <span class="file-cta">
            <span class="file-icon">
              <FontAwesomeIcon icon={faUpload} />
            </span>
            <span class="file-label">Change your Cover Image</span>
          </span>
        </label>
      </div>
      {/* Name */}
      <div class="field my-4">
        <label class="label">Name</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="e.g Digvijay Singh"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
      </div>
      {/* Username */}
      <fieldset disabled>
        <div class="field">
          <label class="label">Username</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="e.g digvijay007"
              value={user.username}
            />
          </div>
        </div>
      </fieldset>
      {/* Skills */}
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
      {/* Projects */}
      {user.projects.map((el, index) => {
        return (
          <div key={el.title}>
            <div>{el.title}</div>
            <div>{el.demo}</div>
            <div>{el.description}</div>
            <button
              className="button is-danger"
              onClick={() => deleteProject(index)}
            >
              Delete
            </button>
          </div>
        );
      })}
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="e.g TODO List"
            onChange={(e) => setProject({ ...project, title: e.target.value })}
            value={project.title}
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Demo Link</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="e.g https://amazingsite.com/user/project"
            value={project.demo}
            onChange={(e) => setProject({ ...project, demo: e.target.value })}
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Description</label>
        <div class="control">
          <textarea
            class="textarea"
            placeholder="Some details about your project."
            value={project.description}
            onChange={(e) =>
              setProject({ ...project, description: e.target.value })
            }
          />
        </div>
      </div>
      <button
        className="button my-2 is-primary"
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

      {/* Bio */}
      <div class="field my-4">
        <label class="label">Bio</label>
        <div class="control">
          <textarea
            class="textarea"
            placeholder="About yourself :)"
            value={user.bio}
            onChange={(e) => setUser({ ...user, bio: e.target.value })}
          />
        </div>
      </div>
      {/* Current Work */}
      <div class="field my-4">
        <label class="label">Current Work</label>
        <div class="control">
          <textarea
            class="textarea"
            placeholder="Some details of what/where you are currently working."
            value={user.currentWork}
            onChange={(e) => setUser({ ...user, currentWork: e.target.value })}
          />
        </div>
      </div>
      {/* Email */}
      <div class="field my-4">
        <label class="label">Email</label>
        <div class="control">
          <input
            class="input"
            type="email"
            placeholder="e.g. diggi1234@somemail.com"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
      </div>
      {/* Password */}
      <div class="field">
        <label class="label">Change Password</label>
        <div class="control">
          <input
            class="input"
            type="password"
            placeholder="Current password"
            value={user.oldPassword}
            onChange={(e) => setUser({ ...user, oldPassword: e.target.value })}
          />
          <input
            class="input my-4"
            type="password"
            placeholder="New password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
      </div>
      {/* Social */}
      {/* Website */}
      <div class="field my-4">
        <label class="label">Website</label>
        <div class="control">
          <input
            class="input"
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
      <div class="field my-4">
        <label class="label">Facebook</label>
        <div class="control">
          <input
            class="input"
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
      <div class="field my-4">
        <label class="label">Twitter</label>
        <div class="control">
          <input
            class="input"
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
      <div class="field my-4">
        <label class="label">GitHub</label>
        <div class="control">
          <input
            class="input"
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
      <div class="field my-4">
        <label class="label">Stack Overflow</label>
        <div class="control">
          <input
            class="input"
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
      {/* End Social */}
      <button
        className="button is-primary is-centered is-2x"
        onClick={() => saveUpdates()}
      >
        Save
      </button>
    </div>
  );
}
