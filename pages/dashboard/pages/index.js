import React, { useEffect, useState } from "react";
import AllPages from "../../../components/dashboard/pages/allPages";
import DashboardLayout from "../../../components/layouts/dashboardLayout";
export default function index() {
  return (
    <DashboardLayout>
      <AllPages />
    </DashboardLayout>
  );
}
