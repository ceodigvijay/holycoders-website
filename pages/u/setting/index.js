import React, { useEffect, useState, useContext } from "react";
import Settings from "../../../components/user/settings/index";
import { getUserByUsername } from "../../../lib/index";
import GlobalContext from "../../../contexts/globalContext";
export default function setting() {
  const { user } = useContext(GlobalContext);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getUserByUsername(user.username);
        const u = response.data.user;
        setUserSettings({
          ...user,
          id: u._id,
          name: u.name,
          username: u.username,
          email: u.email,
          password: "",
          projects: u.projects,
          skills: u.skills,
          profileImage: u.profile_image,
          coverImage: u.cover_image,
          bio: u.bio,
          currentWork: u.current_work,
          social: u.social,
          private: u.private,
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      getData();
    }
  }, [user]);
  const [userSettings, setUserSettings] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    oldPassword: "",
    password: "",
    projects: [],
    skills: [],
    profileImage: "",
    coverImage: "",
    bio: "",
    currentWork: "",
    social: {
      facebook: "",
      stackoverflow: "",
      github: "",
      website: "",
    },
    private: false,
    emailVerificationCode: "",
  });
  return <Settings user={userSettings} setUser={setUserSettings} />;
}
