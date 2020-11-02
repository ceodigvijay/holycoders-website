import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
export default function githubLoginButton(props) {
  return (
    <>
      <button className="button github-login mt-2 px-6 py-4" {...props}>
        <span className="icon">
          <FontAwesomeIcon icon={faGithub} />
        </span>
        <span>Sign In with GitHub</span>
      </button>
      <style jsx>
        {`
          .github-login {
            background-color: #24292e;
            color: #fff;
            height: 50px;
            width: 100%;
          }
          .github-login:hover {
            background-color: #000;
          }
        `}
      </style>
    </>
  );
}
