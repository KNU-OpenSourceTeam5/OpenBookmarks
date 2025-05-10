import React from 'react';
import { Link } from 'react-router-dom';

const LinkCard = ({ link, onLike, onView, category, currentUser }) => {
  const handleClick = () => {
    onView(category, link.id);
  };

  const handleLike = () => {
    onLike(category, link.id);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition flex flex-col">
      <Link
        to={`/link/${link.id}`}
        className="text-lg font-semibold text-gray-800 hover:text-blue-600 mb-2"
      >
        {link.title}
      </Link>
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline mb-2"
        onClick={handleClick}
      >
        {link.url}
      </a>
      <p className="text-gray-600 mt-2 flex-grow">{link.description}</p>
      <div className="mt-2 flex items-center justify-between">
        <button
          onClick={handleLike}
          className="flex items-center text-red-500 hover:text-red-600"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill={link.likedBy.includes(currentUser) ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          {link.likes}
        </button>
        <span className="text-gray-500">조회수: {link.views}</span>
      </div>
    </div>
  );
};

export default LinkCard;