'use client'
import dynamic from "next/dynamic";

// Dynamically import the component with no server-side rendering
const DashboardNoSSR = dynamic(() => import("@/features/page/dashboard"), {
  ssr: false,
});

// Assign the component to a variable with a name
const DashboardPage = () => <DashboardNoSSR />;

// Optionally, add a displayName for debugging purposes
DashboardPage.displayName = "DashboardPage";

// Export the named component as the default export
export default DashboardPage;
