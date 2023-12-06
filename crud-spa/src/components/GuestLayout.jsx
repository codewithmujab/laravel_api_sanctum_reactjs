import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function GuestLayout() {
  // eslint-disable-next-line no-unused-vars
  const { token } = useStateContext();

  //jika user sudah login, maka redirect ke halaman dashboard
  if (token) {
    return <Navigate to="/" />;
  }

  return (
    // mirip seperti slot
    <div>
      <Outlet />
    </div>
  );
}
