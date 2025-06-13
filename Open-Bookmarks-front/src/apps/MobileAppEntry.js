import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import DesktopNavBar from "../components/desktop/Navbar";
import DesktopLinkForm from "../components/desktop/LinkForm";
import DesktopCategorySection from "../components/desktop/CategorySection";
import DesktopIntroPage from "../components/desktop/IntroPage";
import DesktopLoginPage from "../components/desktop/LoginPage";
import DesktopSignupPage from "../components/desktop/SignupPage";
import DesktopLinkDetailPage from "../components/desktop/LinkDetailPage";
import DesktopSearchPage from "../components/desktop/SearchPage";
import DesktopProfilePage from "../components/desktop/ProfilePage";
import DesktopEditPage from "../components/desktop/EditPage";
import { logout } from "../services/api";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("username")
  );
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("username")
  );
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogin = (user) => {
    localStorage.setItem("username", user.username);
    setIsLoggedIn(true);
    setCurrentUser(user.username);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("로그아웃 오류:", err);
    }
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSearchQuery("");
  };

  const handleSignup = (user) => {
    localStorage.setItem("username", user.username);
    setIsLoggedIn(true);
    setCurrentUser(user.username);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DesktopNavBar
        categories={["기술", "교육", "기타", "내글"]}
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onSearch={handleSearch}
        currentUser={currentUser}
      />
      <Routes>
        <Route
          path="/"
          element={
            <div className="container mx-auto p-4">
              <DesktopIntroPage />
            </div>
          }
        />
        <Route
          path="/category/:categoryName"
          element={
            <div className="container mx-auto p-4">
              <DesktopCategorySection
                currentUser={currentUser}
                searchQuery={searchQuery}
              />
            </div>
          }
        />
        <Route
          path="/add"
          element={
            <div className="container mx-auto p-4">
              <DesktopLinkForm />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className="container mx-auto p-4">
              <DesktopLoginPage onLogin={handleLogin} />
            </div>
          }
        />
        <Route
          path="/register"
          element={
            <div className="container mx-auto p-4">
              <DesktopSignupPage onSignup={handleSignup} />
            </div>
          }
        />
        <Route
          path="/links/:linkId"
          element={
            <div className="container mx-auto p-4">
              <DesktopLinkDetailPage currentUser={currentUser} />
            </div>
          }
        />
        <Route
          path="/search"
          element={
            <div className="container mx-auto p-4">
              <DesktopSearchPage
                currentUser={currentUser}
                searchQuery={searchQuery}
              />
            </div>
          }
        />
        <Route
          path="/profile"
          element={
            <div className="container mx-auto p-4">
              <DesktopProfilePage currentUser={currentUser} />
            </div>
          }
        />
      <Route
          path="/edit/:linkId"
          element={
              <div className="container mx-auto p-4">
                  <DesktopEditPage currentUser={currentUser} />
              </div>
          }
      />
      </Routes>
    </div>
  );
}

export default App;
