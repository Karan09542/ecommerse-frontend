import "./App.css";
import { useIsLoggedInStore } from "../store/authStore";
import Loading from "./components/comp_util/Loader/Loading";
import Home from "./components/pages/home/Home";
import AuthenticateModel from "./components/auth-model/login/AuthenticateModel";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { toast } from "react-toastify";
function App() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage);
      navigate(location.pathname, {
        replace: true,
        state: { ...location.state, toastMessage: null },
      });
    }
  }, [location]);

  const isLoggedIn = useIsLoggedInStore((state) => state.isLoggedIn);

  if (isLoggedIn === null) return <Loading className={"mt-2"} />;
  return (
    <>
      {isLoggedIn ? <Home /> : <AuthenticateModel />}
      <h1 className="text-4xl">हर हर महादेव</h1>
    </>
  );
}

export default App;
