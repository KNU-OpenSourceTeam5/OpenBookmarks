import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MobileNavbar from "../components/mobile/Navbar";
import MobileLinkForm from "../components/mobile/LinkForm";
import MobileCategorySection from "../components/mobile/CategorySection";
import MobileIntroPage from "../components/mobile/IntroPage";
import MobileLoginPage from "../components/mobile/LoginPage";
import MobileSignupPage from "../components/mobile/SignupPage";
import MobileLinkDetailPage from "../components/mobile/LinkDetailPage";
import MobileSearchPage from "../components/mobile/SearchPage";
import MobileProfilePage from "../components/mobile/ProfilePage";
import MobileEditPage from "../components/mobile/EditPage";
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
      <MobileNavbar
        categories={["기술", "교육", "기타"]}
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
              <MobileIntroPage />
            </div>
          }
        />
        <Route
          path="/category/:categoryName"
          element={
            <div className="container mx-auto p-4">
              <MobileCategorySection
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
              <MobileLinkForm />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className="container mx-auto p-4">
              <MobileLoginPage onLogin={handleLogin} />
            </div>
          }
        />
        <Route
          path="/register"
          element={
            <div className="container mx-auto p-4">
              <MobileSignupPage onSignup={handleSignup} />
            </div>
          }
        />
        <Route
          path="/links/:linkId"
          element={
            <div className="container mx-auto p-4">
              <MobileLinkDetailPage currentUser={currentUser} />
            </div>
          }
        />
        <Route
          path="/search"
          element={
            <div className="container mx-auto p-4">
              <MobileSearchPage
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
              <MobileProfilePage currentUser={currentUser} />
            </div>
          }
        />
      </Routes>
      <Route
          path="/edit/:linkId"
          element={
              <div className="container mx-auto p-4">
                  <MobileEditPage currentUser={currentUser} />
              </div>
          }
      />
    </div>
  );
}

export default App;
