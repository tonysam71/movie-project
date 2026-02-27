import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <div className="flex mt-20">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        {/* Topbar */}
       
        {/* Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
