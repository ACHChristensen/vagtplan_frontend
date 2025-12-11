import { Box, Text } from "@chakra-ui/react";
import DashboardLayout from "../components/DashboardLayout";

import PersonalInfoCard from "../components/dashboard/PersonalInfoCard";
import RoutesList from "../components/dashboard/RoutesList";
import WorkHoursChart from "../components/dashboard/WorkHoursChart";
import ShiftsTable from "../components/dashboard/ShiftsTable";
import ClockInOutSection from "../components/dashboard/ClockInOutSection";
import WeatherSection from "../components/dashboard/WeatherSection";


const AdminDashboard = () => {
  return (
    <DashboardLayout title="Admin Dashboard">
      <Box>
        <Text fontSize="xl" mb={4}>
          Welcome, Admin! Here you can manage users and view reports.
        </Text>
        {/* Additional admin-specific components go here */}
      </Box>
    </DashboardLayout>
  );
};

export default AdminDashboard;
