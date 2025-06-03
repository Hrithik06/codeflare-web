import React from "react";
import { RootState } from "../utils/appStore";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { clearUser } from "../utils/userSlice";
import { clearFeed } from "../utils/feedSlice";
import { useNavigate } from "react-router";
import api from "../utils/axiosInstance";
import { Link } from "react-router";
import { clearConnections } from "../utils/connectionSlice";

const NavBar = (): React.ReactElement => {
  const userData = useAppSelector((store: RootState) => store.user.user);
  const isAuthenticated = useAppSelector(
    (store: RootState) => store.user.isAuthenticated
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.get("/logout", { withCredentials: true });
      dispatch(clearUser());
      dispatch(clearFeed());
      dispatch(clearConnections());
      navigate("/login");
    } catch {
      navigate("/error");
    }
  };
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-10 ">
      <div className="flex-1">
        <Link className="text-xl" to="/">
          CodeFlare
        </Link>
      </div>

      <>
        {isAuthenticated && userData ? (
          <div className="flex gap-2 items-center">
            <div>Hi 👋, {userData?.firstName} </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={
                      userData?.photoUrl
                        ? `${userData?.photoUrl}`
                        : "https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000"
                      // "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link className="justify-between" to="/profile">
                    Profile
                    <span className="badge badge-soft badge-primary">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                <li></li>
                <li>
                  <p onClick={handleLogout}>Logout</p>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <button
            // to={"/login"}
            onClick={handleLogin}
            className="btn btn-primary transition delay-300 duration-700 ease-in-out hover:rounded-full "
          >
            Login
          </button>
        )}
      </>
    </div>
  );
};

export default NavBar;
