import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LinkCard from './LinkCard';

const ProfilePage = ({ links, comments, currentUser }) => {
  const [activeTab, setActiveTab] = useState('uploads');

  if (!currentUser) {
    return (
      <div className="text-center text-gray-600">
        프로필을 보려면 <Link to="/login" className="text-blue-600 hover:underline">로그인</Link>하세요.
      </div>
    );
  }

  const uploadedLinks = Object.entries(links)
    .flatMap(([category, linkList]) =>
      linkList
        .filter((link) => link.uploadedBy === currentUser)
        .map((link) => ({ ...link, category }))
    );

  const likedLinks = Object.entries(links)
    .flatMap(([category, linkList]) =>
      linkList
        .filter((link) => link.likedBy.includes(currentUser))
        .map((link) => ({ ...link, category }))
    );

  const userComments = Object.entries(comments)
    .flatMap(([linkId, commentList]) =>
      commentList
        .filter((comment) => comment.user === currentUser)
        .map((comment) => ({
          ...comment,
          linkId,
          linkTitle: Object.values(links)
            .flat()
            .find((link) => link.id === linkId)?.title || '알 수 없는 링크',
        }))
    );

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">프로필: {currentUser}</h1>
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('Uploads')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'Uploads'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            업로드한 링크
          </button>
          <button
            onClick={() => setActiveTab('Likes')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'Likes'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            좋아요한 링크
          </button>
          <button
            onClick={() => setActiveTab('Comments')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'Comments'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            작성한 댓글
          </button>
        </nav>
      </div>

      {activeTab === 'Uploads' && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">업로드한 링크</h2>
          {uploadedLinks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedLinks.map((link) => (
                <LinkCard
                  key={link.id}
                  link={link}
                  category={link.category}
                  onLike={() => {}}
                  onView={() => {}}
                  currentUser={currentUser}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">업로드한 링크가 없습니다.</p>
          )}
        </div>
      )}

      {activeTab === 'Likes' && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">좋아요한 링크</h2>
          {likedLinks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {likedLinks.map((link) => (
                <LinkCard
                  key={link.id}
                  link={link}
                  category={link.category}
                  onLike={() => {}}
                  onView={() => {}}
                  currentUser={currentUser}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">좋아요한 링크가 없습니다.</p>
          )}
        </div>
      )}

      {activeTab === 'Comments' && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">작성한 댓글</h2>
          {userComments.length > 0 ? (
            <div className="space-y-4">
              {userComments.map((comment) => (
                <div key={comment.id} className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <Link
                      to={`/link/${comment.linkId}`}
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      {comment.linkTitle}
                    </Link>
                    <span className="text-gray-500 text-sm">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-gray-600">{comment.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">작성한 댓글이 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;