import React from "react";
import Link from "next/link";
import DashboardLayout from "../../../components/layouts/dashboardLayout";
import AllTags from "../../../components/dashboard/tags/allTags";

export default function tags() {
  return (
    <DashboardLayout>
      <nav className="">
        <p className="panel-heading">
          <span>Tags</span>
          <Link href="/dashboard/tags/[id]/" as="/dashboard/tags/new/">
            <a className="button is-primary">New Tag</a>
          </Link>
        </p>
      </nav>
      <AllTags />
    </DashboardLayout>
  );
}
