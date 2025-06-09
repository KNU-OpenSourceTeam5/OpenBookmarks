import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({
  categories,
  toggleSidebar,
  isSidebarOpen,
  isLoggedIn,
  onLogin,
  onLogout,
  onSearch,
  currentUser,
}) => {
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    navigate(category ? `/category/${category}` : "/");
    toggleSidebar();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    onSearch(query);
    navigate("/search");
  };

  return (
    <>
      <nav className="bg-blue-600 text-white p-4 shadow-md w-full z-20">
        <div className="container mx-auto flex flex-col justify-between items-center space-y-4">
          <div className="flex items-center space-x-4 text-xs">
            <Link to="/" className="text-2xl font-bold hover:text-gray-200">
              Open Bookmarks
            </Link>
            <div className="flex space-x-2">
              <Link
                to="/add"
                className="px-3 py-4 rounded-md bg-blue-800 hover:bg-blue-700 whitespace-nowrap"
              >
                링크 추가
              </Link>
              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center px-3 py-2 rounded-md bg-gray-600 hover:bg-gray-700 whitespace-nowrap flex items-center justify-center"
                  >
                    <span className="mr-2">👤</span>
                    {currentUser}
                  </Link>
                  <button
                    onClick={onLogout}
                    className="px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 whitespace-nowrap flex items-center justify-center"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-3 py-2 rounded-md bg-green-600 hover:bg-green-700 whitespace-nowrap flex items-center justify-center"
                  >
                    로그인
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 py-2 rounded-md bg-purple-600 hover:bg-purple-700 whitespace-nowrap flex items-center justify-center"
                  >
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4 w-full px-2">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center w-full"
            >
              <input
                type="search"
                name="search"
                placeholder="링크 검색..."
                className="p-2 rounded-l-md text-gray-800 focus:outline-none flex-1"
              />
              <button
                type="submit"
                className="p-2 bg-blue-800 rounded-r-md hover:bg-blue-700"
              >
                🔍
              </button>
            </form>
            <button
              onClick={toggleSidebar}
              className="text-2xl focus:outline-none"
            >
              {isSidebarOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-30 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">카테고리</h2>
          <button
            onClick={() => handleCategorySelect(null)}
            className={`w-full text-left px-4 py-2 mb-2 rounded-md ${
              !window.location.pathname.includes("/category")
                ? "bg-blue-100 text-blue-800"
                : "hover:bg-gray-100"
            } flex items-center`}
          >
            <span className="mr-2">📑</span> 소개
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`w-full text-left px-4 py-2 mb-2 rounded-md ${
                window.location.pathname === `/category/${category}`
                  ? "bg-blue-100 text-blue-800"
                  : "hover:bg-gray-100"
              } flex items-center`}
            >
              <span className="mr-2">
                {category === "기술" && "💻"}
                {category === "교육" && "📚"}
                {category === "기타" && "🌐"}
                {category === "좋아요" && "❤️"}
              </span>
              {category}
            </button>
          ))}
        </div>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Navbar;
