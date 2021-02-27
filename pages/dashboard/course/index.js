import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/layouts/dashboardLayout";
import AllCourses from '../../../components/dashboard/course/allCourse'
export default function index() {
  return (
    <DashboardLayout>
      <AllCourses />
    </DashboardLayout>
  );
}
