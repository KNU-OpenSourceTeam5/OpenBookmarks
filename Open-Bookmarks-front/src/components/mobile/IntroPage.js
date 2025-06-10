import React from 'react';

const IntroPage = () => (
  <div className="max-w-3xl mx-auto text-center">
    <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to Open Bookmarks</h1>
    <p className="text-lg text-gray-600 mb-4">
      Open Bookmarks는 당신이 좋아하는 웹사이트 링크를 저장하고, 카테고리별로 정리하여 쉽게 접근할 수 있도록 돕는 플랫폼입니다.
    </p>
    <p className="text-lg text-gray-600 mb-4">
      기술, 교육, 기타 다양한 주제의 링크를 추가하고, 사이드바를 통해 원하는 카테고리를 빠르게 탐색하세요.
    </p>
    <p className="text-lg text-gray-600">
      지금 바로 <a href="/add" className="text-blue-600 hover:underline">링크를 추가</a>하여 나만의 북마크 컬렉션을 시작하세요!
    </p>
  </div>
);

export default IntroPage;