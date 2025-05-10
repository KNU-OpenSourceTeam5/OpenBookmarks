import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import LinkCard from './LinkCard';

const CategorySection = ({ links, onLike, onView, currentUser, searchQuery }) => {
  const { categoryName } = useParams();
  const [sortBy, setSortBy] = useState('latest');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const linksPerPage = 6;

  let displayLinks = [];
  if (categoryName === '좋아요') {
    displayLinks = Object.values(links)
      .flat()
      .filter((link) => link.likedBy.includes(currentUser));
  } else if (links[categoryName]) {
    displayLinks = [...links[categoryName]];
  } else {
    return <div className="text-center text-gray-600">카테고리를 찾을 수 없습니다.</div>;
  }

  // 검색어로 필터링
  if (searchQuery) {
    const lowerQuery = searchQuery.toLowerCase();
    displayLinks = displayLinks.filter(
      (link) =>
        link.title.toLowerCase().includes(lowerQuery) ||
        link.url.toLowerCase().includes(lowerQuery) ||
        link.description.toLowerCase().includes(lowerQuery) ||
        categoryName.toLowerCase().includes(lowerQuery)
    );
  }

  const sortedLinks = displayLinks.sort((a, b) => {
    if (sortBy === 'views') return b.views - a.views;
    if (sortBy === 'likes') return b.likes - a.likes;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const totalPages = Math.ceil(sortedLinks.length / linksPerPage);
  const indexOfLastLink = currentPage * linksPerPage;
  const indexOfFirstLink = indexOfLastLink - linksPerPage;
  const currentLinks = sortedLinks.slice(indexOfFirstLink, indexOfLastLink);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSort = (sortType) => {
    setSortBy(sortType);
    setIsDropdownOpen(false);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">
          {categoryName === '좋아요' ? '좋아요 표시한 링크' : categoryName}{' '}
          <span className="text-gray-500 text-lg">
            {categoryName === '기술' && '💻'}
            {categoryName === '교육' && '📚'}
            {categoryName === '기타' && '🌐'}
            {categoryName === '좋아요' && '❤️'}
          </span>
        </h2>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 6h18M3 12h18m-7 6h7"
              />
            </svg>
            정렬
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-10">
              <button
                onClick={() => handleSort('latest')}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  sortBy === 'latest' ? 'bg-blue-100 text-blue-800' : ''
                }`}
              >
                최신순
              </button>
              <button
                onClick={() => handleSort('views')}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  sortBy === 'views' ? 'bg-blue-100 text-blue-800' : ''
                }`}
              >
                조회순
              </button>
              <button
                onClick={() => handleSort('likes')}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  sortBy === 'likes' ? 'bg-blue-100 text-blue-800' : ''
                }`}
              >
                좋아요순
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentLinks.length > 0 ? (
          currentLinks.map((link) => (
            <LinkCard
              key={link.id}
              link={link}
              category={categoryName !== '좋아요' ? categoryName : Object.keys(links).find((cat) => links[cat].some((l) => l.id === link.id))}
              onLike={onLike}
              onView={onView}
              currentUser={currentUser}
            />
          ))
        ) : (
          <div className="text-center text-gray-600 col-span-full">링크가 없습니다.</div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${
              currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            이전
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-md ${
                currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

export default CategorySection;