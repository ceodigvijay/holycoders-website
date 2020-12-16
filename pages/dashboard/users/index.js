import React, { useState, useContext } from "react";
import DashboardLayout from "../../../components/layouts/dashboardLayout";
import { getUserByUsername } from "../../../lib/index";
import Image from "next/image";
import { adminUpdateUser, deleteUser } from "../../../lib/index";
import GlobalContext from "../../../contexts/globalContext";

export default function index() {
  const [userSearch, setUserSearch] = useState("");
  const [user, setUser] = useState(null);
  const { addNotification } = useContext(GlobalContext);

  const searchUser = async () => {
    console.log(userSearch);
    try {
      const res = await getUserByUsername(userSearch);
      setUser(res.data ? res.data.user : null);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const saveData = async () => {
    try {
      const res = await adminUpdateUser({
        id: user._id,
        status: user.status,
        role: user.role,
      });
      if (res.data.ok) {
        addNotification({
          message: "Updated the user.",
          type: "success",
        });
      }
    } catch (error) {
      addNotification({
        message: "Some error in saving the data",
        type: "error",
      });
    }
  };
  const userDeleteHandler = async () => {
    try {
      const usernameInput = prompt(
        "Enter Username again to confirm delete. All user's data including posts will be deleted."
      );
      if (usernameInput === user.username) {
        const res = await deleteUser(user._id);
        console.log(res);
        if (res.data.ok) {
          addNotification({
            message: "User Deleted Successfully.",
            type: "success",
          });
          setUser(null);
        }
      } else {
        addNotification({
          message: "Username not matched. Delete Operation Cancelled.",
          type: "warning",
        });
      }
    } catch (error) {
      addNotification({
        message: "Some error in deleting the user.",
        type: "error",
      });
    }
  };
  return (
    <DashboardLayout>
      {/* Admin can only edit status and role */}
      <nav className="has-text-centered">
        <p className="panel-heading">
          <span>Users</span>
        </p>
      </nav>
      <div className="mx-6 px-6 my-4 columns">
        <input
          className="input column"
          type="text"
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
        />
        <button className="button mx-6" onClick={() => searchUser()}>
          Search
        </button>
      </div>
      {user && (
        <div>
          <div className="columns my-4">
            <div className="column">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-48x48">
                    <Image
                      src={user.profile_image}
                      className="is-rounded"
                      width="48px"
                      height="48px"
                    />
                  </figure>
                </div>
                <div className="media-content">
                  <span className="mx-2">{user.username}</span>
                </div>
              </div>
            </div>
            <div className="column">
              {/* Status */}
              <div class="select mx-2">
                <select
                  value={user.status}
                  onChange={(e) => setUser({ ...user, status: e.target.value })}
                >
                  <option value="unverified">unverified</option>
                  <option value="verified">verified</option>
                  <option value="review">review</option>
                  <option value="disabled">disabled</option>
                  <option value="suspended">suspended</option>
                </select>
              </div>
              {/* Role */}
              <div class="select">
                <select
                  value={user.role}
                  onChange={(e) => setUser({ ...user, role: e.target.value })}
                >
                  <option value="admin">admin</option>
                  <option value="editor">editor</option>
                  <option value="author">author</option>
                  <option value="subscriber">subscriber</option>
                </select>
              </div>
            </div>
            <div className="column has-text-right mr-2">
              <div
                className="button is-primary mx-2"
                onClick={() => saveData()}
              >
                Save
              </div>
              {/* Delete after typing username */}
              <div
                className="button is-danger"
                onClick={() => userDeleteHandler()}
              >
                Delete
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
