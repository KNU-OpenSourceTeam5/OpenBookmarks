import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import LinkForm from './components/LinkForm';
import CategorySection from './components/CategorySection';
import IntroPage from './components/IntroPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import LinkDetailPage from './components/LinkDetailPage';
import SearchPage from './components/SearchPage';
import ProfilePage from './components/ProfilePage';
import { logout } from './services/api';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('username'));
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('username'));
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogin = (user) => {
    localStorage.setItem('username', user.username);
    setIsLoggedIn(true);
    setCurrentUser(user.username);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('로그아웃 오류:', err);
    }
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSearchQuery('');
  };

  const handleSignup = (user) => {
    localStorage.setItem('username', user.username);
    setIsLoggedIn(true);
    setCurrentUser(user.username);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        categories={['기술', '교육', '기타']}
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
            <div className="container mx-auto p-4 pt-20">
              <IntroPage />
            </div>
          }
        />
        <Route
          path="/category/:categoryName"
          element={
            <div className="container mx-auto p-4 pt-20">
              <CategorySection currentUser={currentUser} searchQuery={searchQuery} />
            </div>
          }
        />
        <Route
          path="/add"
          element={
            <div className="container mx-auto p-4 pt-20">
              <LinkForm />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className="container mx-auto p-4 pt-20">
              <LoginPage onLogin={handleLogin} />
            </div>
          }
        />
        <Route
          path="/register"
          element={
            <div className="container mx-auto p-4 pt-20">
              <SignupPage onSignup={handleSignup} />
            </div>
          }
        />
        <Route
          path="/links/:linkId"
          element={
            <div className="container mx-auto p-4 pt-20">
              <LinkDetailPage currentUser={currentUser} />
            </div>
          }
        />
        <Route
          path="/search"
          element={
            <div className="container mx-auto p-4 pt-20">
              <SearchPage currentUser={currentUser} searchQuery={searchQuery} />
            </div>
          }
        />
        <Route
          path="/profile"
          element={
            <div className="container mx-auto p-4 pt-20">
              <ProfilePage currentUser={currentUser} />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;