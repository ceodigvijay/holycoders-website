import React, { useEffect, useState } from "react";
import AllPosts from "../../../components/dashboard/posts/allPosts";
import DashboardLayout from "../../../components/layouts/dashboardLayout";
export default function index() {
  return (
    <DashboardLayout>
      <AllPosts />
    </DashboardLayout>
  );
}
