import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../components/layouts/dashboardLayout";
import AllQuestions from "../../../components/dashboard/question/allQuestion";
export default function index() {
  return (
    <DashboardLayout>
      <AllQuestions />
    </DashboardLayout>
  );
}
