import React from "react";
import Link from "next/link";
import DashboardLayout from "../../../components/layouts/dashboardLayout";
import AllTags from "../../../components/dashboard/tags/allTags";

export default function tags() {
  return (
    <DashboardLayout>
      <AllTags />
    </DashboardLayout>
  );
}
