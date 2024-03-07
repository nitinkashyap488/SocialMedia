import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import StoryPage from "../../Components/StoryComponents/StoryPage";
import HomePage from "../HomePage/HomePage";
import Profile from "../Profile/Profile";
import Story from "../Story/Story";
import Auth from "../Auth/Auth";
import EditProfilePage from "../EditProfile/EditProfilePage";

const Router = () => {
  const location = useLocation();

  useEffect(() => {
    const isAuthenticated = checkAuthentication();
    const currentPath = location.pathname;
    if (
      !isAuthenticated &&
      !isAuthPage(currentPath) &&
      currentPath !== "/home"
    ) {
      window.location.href = "/login";
    }
  }, [location.pathname]);

  const checkAuthentication = () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    return !!token;
  };

  const isAuthPage = (path) => {
    return path === "/login" || path === "/signup";
  };

  return (
    <div>
      {/* {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <div className="flex">
          <div className="sidebarBox border border-l-slate-500 w-[20%]">
            <Sidebar />
          </div>
          <div className="w-[80%]">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/p/:postId" element={<HomePage />} />
              <Route path="/:username" element={<Profile />} />
              <Route path="/demo" element={<StoryPage />} />
              <Route path="/story/:userId" element={<Story />} />
              <Route path="/account/edit" element={<EditProfilePage />} />
            </Routes>
          </div>
        </div>
      )}
      {(location.pathname === "/login" || location.pathname === "/signup") && (
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
        </Routes>
      )} */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route
          path="/*"
          element={
            checkAuthentication() ? (
              <div className="flex">
                <div className="sidebarBox border border-l-slate-500 w-[20%]">
                  <Sidebar />
                </div>
                <div className="w-[80%]">
                  <Routes>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/p/:postId" element={<HomePage />} />
                    <Route path="/profile/:username" element={<Profile />} />
                    <Route path="/demo" element={<StoryPage />} />
                    <Route path="/story/:userId" element={<Story />} />
                    <Route path="/account/edit" element={<EditProfilePage />} />
                  </Routes>
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
};
export default Router;
