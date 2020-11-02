import React from "react";

export default function authBenefit() {
  return (
    <div className="auth-benefit">
      <h2>Login or Signup to unlock benefits 🎉</h2>
      <button className="button is-light">Login</button>
      <button className="button primary">Signup</button>
      <style jsx>{`
          .auth-benefit{
              background-color: #34495e;
              color: #f5f5f5;
              text-align:center;
              padding: 50px;
              margin: 50px 0;
          }
          h2{
              font-size: 2.5rem;
              padding: 10px;
              margin: 10px 0;
          }
          button{
              margin-left: 20px;
              font-weight: bolder;
          }
          .primary{
              background-color: #36a666;
              color: #fff;
              border: none;
          }
          `}</style>
    </div>
  );
}
