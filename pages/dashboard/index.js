import React, { useState, useContext } from "react";
import Layout from "../../components/layouts/layout";
import { useUser } from "../../hooks/useUser";
import Link from "next/link";
import { useRouter } from "next/router";
import DashboardLayout from "../../components/layouts/dashboardLayout";
function dashboard() {
  // useUser();
  const router = useRouter();
  return (
    <DashboardLayout>
      {/* Display total posts, reactions */}
      {/* <div className="columns mt-6 is-multiline">
        <div className="column is-half">
          <div className="card">Total Posts</div>
        </div>
        <div className="column is-half">
          <div className="card">Reactions</div>
        </div>
        <div className="column is-half">
          <div className="card">Some stats</div>
        </div>
        <div className="column is-half">
          <div className="card">Some stats</div>
        </div>
      </div> */}
      <nav className="level my-6 px-4 py-4">
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Posts</p>
            <p className="title">3,456</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Following</p>
            <p className="title">123</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Followers</p>
            <p className="title">456K</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Reactions</p>
            <p className="title">78K</p>
          </div>
        </div>
      </nav>

      <style jsx>{`
        .card {
          padding: 50px;
          color: #333;
          text-align: center;
          border: 1px solid #f3f3f3;
        }
      `}</style>
    </DashboardLayout>
  );
}

export default dashboard;
