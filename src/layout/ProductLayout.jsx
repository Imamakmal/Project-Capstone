import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function ProductLayout() {
  return (
    <div className="main-layout min-h-screen flex flex-col pt-16">
      <Navbar />
      <Outlet />
    </div>
  );
}
