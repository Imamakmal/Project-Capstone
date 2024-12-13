import { Outlet } from "react-router-dom";

export default function LoginLayout() {
  return (
    <div className="auth-layout bg-Blue min-h-screen flex items-center justify-center">
      <Outlet />
    </div>
  );
}
