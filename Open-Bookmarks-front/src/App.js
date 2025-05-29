import React, { useState, useEffect } from 'react';
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
import { getLinks } from './services/api';

function App() {
  const [links, setLinks] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await getLinks();
        // API 응답을 카테고리별로 그룹화
        const groupedLinks = response.data.content.reduce((acc, link) => {
          const category = link.category || '기타';
          acc[category] = acc[category] || [];
          acc[category].push(link);
          return acc;
        }, {});
        setLinks(groupedLinks);
        setLoading(false);
      } catch (err) {
        setError('링크를 불러오는데 실패했습니다.');
        setLoading(false);
      }
    };
    fetchLinks();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogin = (user, token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    setCurrentUser(user.username);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSearchQuery('');
  };

  const handleSignup = (user, token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    setCurrentUser(user.username);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  if (loading) return <div className="text-center p-4">로딩 중...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        categories={Object.keys(links)}
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
              <CategorySection
                links={links}
                currentUser={currentUser}
                searchQuery=""
              />
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
          path="/signup"
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
              <LinkDetailPage
                links={links}
                currentUser={currentUser}
              />
            </div>
          }
        />
        <Route
          path="/search"
          element={
            <div className="container mx-auto p-4 pt-20">
              <SearchPage
                links={links}
                currentUser={currentUser}
                searchQuery={searchQuery}
              />
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