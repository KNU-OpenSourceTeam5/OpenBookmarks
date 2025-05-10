import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const LinkDetailPage = ({ links, comments, onLike, onView, addComment, currentUser }) => {
  const { linkId } = useParams();
  const link = Object.values(links)
    .flat()
    .find((l) => l.id === linkId);
  const category = Object.keys(links).find((cat) => links[cat].some((l) => l.id === linkId));
  const [commentText, setCommentText] = useState('');

  if (!link) {
    return <div className="text-center text-gray-600">링크를 찾을 수 없습니다.</div>;
  }

  const handleLike = () => {
    onLike(category, link.id);
  };

  const handleView = () => {
    onView(category, link.id);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('로그인 후 댓글을 작성할 수 있습니다.');
      return;
    }
    if (commentText.trim()) {
      addComment(link.id, commentText);
      setCommentText('');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Link
        to={`/category/${category}`}
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← {category}로 돌아가기
      </Link>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{link.title}</h1>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
          onClick={handleView}
        >
          {link.url}
        </a>
        <p className="text-gray-600 mt-2 mb-4">{link.description}</p>
        <div className="flex items-center justify-between mb-4">
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
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">댓글</h2>
        {currentUser ? (
          <form onSubmit={handleCommentSubmit} className="mb-4">
            <textarea
              placeholder="댓글을 입력하세요..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              rows="4"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              댓글 작성
            </button>
          </form>
        ) : (
          <p className="text-gray-600 mb-4">
            댓글을 작성하려면 <Link to="/login" className="text-blue-600 hover:underline">로그인</Link>하세요.
          </p>
        )}
        <div className="space-y-4">
          {(comments[link.id] || []).length > 0 ? (
            comments[link.id].map((comment) => (
              <div key={comment.id} className="bg-gray-100 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-800">{comment.user}</span>
                  <span className="text-gray-500 text-sm">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-600">{comment.text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">아직 댓글이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkDetailPage;