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

function App() {
  const [links, setLinks] = useState({
    기술: [
      { id: '1', title: 'React 공식 문서', url: 'https://reactjs.org', description: 'React 라이브러리 공식 문서', views: 100, likes: 10, createdAt: new Date('2025-05-01'), likedBy: [], uploadedBy: 'user1' },
      { id: '2', title: 'Tailwind CSS', url: 'https://tailwindcss.com', description: '유틸리티 기반 CSS 프레임워크', views: 80, likes: 5, createdAt: new Date('2025-05-02'), likedBy: [], uploadedBy: 'user2' },
      { id: '5', title: 'Node.js 문서', url: 'https://nodejs.org', description: '서버사이드 JavaScript 런타임', views: 90, likes: 8, createdAt: new Date('2025-04-28'), likedBy: [], uploadedBy: 'user1' },
      { id: '6', title: 'Express.js 가이드', url: 'https://expressjs.com', description: 'Node.js 웹 프레임워크', views: 70, likes: 6, createdAt: new Date('2025-04-27'), likedBy: [], uploadedBy: 'user2' },
      { id: '7', title: 'MongoDB 튜토리얼', url: 'https://mongodb.com', description: 'NoSQL 데이터베이스 가이드', views: 85, likes: 7, createdAt: new Date('2025-04-26'), likedBy: [], uploadedBy: 'user1' },
      { id: '8', title: 'Docker 공식 문서', url: 'https://docs.docker.com', description: '컨테이너화 플랫폼 설명', views: 95, likes: 9, createdAt: new Date('2025-04-25'), likedBy: [], uploadedBy: 'user2' },
      { id: '9', title: 'TypeScript 핸드북', url: 'https://typescriptlang.org', description: 'JavaScript 타입 확장', views: 60, likes: 4, createdAt: new Date('2025-04-24'), likedBy: [], uploadedBy: 'user1' },
      { id: '10', title: 'Vue.js 가이드', url: 'https://vuejs.org', description: '프로그레시브 JavaScript 프레임워크', views: 75, likes: 5, createdAt: new Date('2025-04-23'), likedBy: [], uploadedBy: 'user2' },
      { id: '11', title: 'AWS 문서', url: 'https://aws.amazon.com', description: '클라우드 컴퓨팅 서비스', views: 88, likes: 6, createdAt: new Date('2025-04-22'), likedBy: [], uploadedBy: 'user1' },
      { id: '12', title: 'GraphQL 공식 사이트', url: 'https://graphql.org', description: 'API 쿼리 언어', views: 82, likes: 7, createdAt: new Date('2025-04-21'), likedBy: [], uploadedBy: 'user2' },
      { id: '13', title: 'Jest 테스트 프레임워크', url: 'https://jestjs.io', description: 'JavaScript 테스트 도구', views: 65, likes: 3, createdAt: new Date('2025-04-20'), likedBy: [], uploadedBy: 'user1' },
      { id: '14', title: 'Webpack 가이드', url: 'https://webpack.js.org', description: '모듈 번들러 문서', views: 78, likes: 5, createdAt: new Date('2025-04-19'), likedBy: [], uploadedBy: 'user2' },
    ],
    교육: [
      { id: '3', title: 'Khan Academy', url: 'https://www.khanacademy.org', description: '무료 온라인 교육 플랫폼', views: 120, likes: 15, createdAt: new Date('2025-05-03'), likedBy: [], uploadedBy: 'user1' },
      { id: '15', title: 'Coursera', url: 'https://coursera.org', description: '온라인 강의 플랫폼', views: 110, likes: 12, createdAt: new Date('2025-04-18'), likedBy: [], uploadedBy: 'user2' },
      { id: '16', title: 'edX', url: 'https://edx.org', description: '대학 수준 온라인 강의', views: 105, likes: 10, createdAt: new Date('2025-04-17'), likedBy: [], uploadedBy: 'user1' },
      { id: '17', title: 'Udemy', url: 'https://udemy.com', description: '다양한 주제의 강의 제공', views: 98, likes: 8, createdAt: new Date('2025-04-16'), likedBy: [], uploadedBy: 'user2' },
      { id: '18', title: 'Duolingo', url: 'https://duolingo.com', description: '언어 학습 앱', views: 115, likes: 14, createdAt: new Date('2025-04-15'), likedBy: [], uploadedBy: 'user1' },
      { id: '19', title: 'TED-Ed', url: 'https://ed.ted.com', description: '교육용 동영상 플랫폼', views: 92, likes: 7, createdAt: new Date('2025-04-14'), likedBy: [], uploadedBy: 'user2' },
      { id: '20', title: 'Code.org', url: 'https://code.org', description: '코딩 교육 플랫폼', views: 87, likes: 6, createdAt: new Date('2025-04-13'), likedBy: [], uploadedBy: 'user1' },
      { id: '21', title: 'FutureLearn', url: 'https://futurelearn.com', description: '온라인 학습 사이트', views: 80, likes: 5, createdAt: new Date('2025-04-12'), likedBy: [], uploadedBy: 'user2' },
      { id: '22', title: 'Quizlet', url: 'https://quizlet.com', description: '플래시카드 학습 도구', views: 100, likes: 9, createdAt: new Date('2025-04-11'), likedBy: [], uploadedBy: 'user1' },
      { id: '23', title: 'Skillshare', url: 'https://skillshare.com', description: '창의적 스킬 학습', views: 93, likes: 7, createdAt: new Date('2025-04-10'), likedBy: [], uploadedBy: 'user2' },
      { id: '24', title: 'OpenLearn', url: 'https://open.edu/openlearn', description: '무료 학습 리소스', views: 85, likes: 6, createdAt: new Date('2025-04-09'), likedBy: [], uploadedBy: 'user1' },
    ],
    기타: [
      { id: '4', title: 'GitHub', url: 'https://github.com', description: '코드 호스팅 및 협업 플랫폼', views: 90, likes: 8, createdAt: new Date('2025-05-04'), likedBy: [], uploadedBy: 'user2' },
      { id: '25', title: 'Stack Overflow', url: 'https://stackoverflow.com', description: '개발자 Q&A 플랫폼', views: 130, likes: 20, createdAt: new Date('2025-04-08'), likedBy: [], uploadedBy: 'user1' },
      { id: '26', title: 'Notion', url: 'https://notion.so', description: '생산성 및諾트 앱', views: 95, likes: 10, createdAt: new Date('2025-04-07'), likedBy: [], uploadedBy: 'user2' },
      { id: '27', title: 'Trello', url: 'https://trello.com', description: '프로젝트 관리 도구', views: 88, likes: 7, createdAt: new Date('2025-04-06'), likedBy: [], uploadedBy: 'user1' },
      { id: '28', title: 'Slack', url: 'https://slack.com', description: '팀 커뮤니케이션 플랫폼', views: 92, likes: 8, createdAt: new Date('2025-04-05'), likedBy: [], uploadedBy: 'user2' },
      { id: '29', title: 'Figma', url: 'https://figma.com', description: 'UI/UX 디자인 툴', views: 100, likes: 12, createdAt: new Date('2025-04-04'), likedBy: [], uploadedBy: 'user1' },
      { id: '30', title: 'Canva', url: 'https://canva.com', description: '그래픽 디자인 플랫폼', views: 97, likes: 9, createdAt: new Date('2025-04-03'), likedBy: [], uploadedBy: 'user2' },
      { id: '31', title: 'Zapier', url: 'https://zapier.com', description: '자동화 워크플로우 도구', views: 85, likes: 6, createdAt: new Date('2025-04-02'), likedBy: [], uploadedBy: 'user1' },
      { id: '32', title: 'Miro', url: 'https://miro.com', description: '온라인 화이트보드', views: 90, likes: 7, createdAt: new Date('2025-04-01'), likedBy: [], uploadedBy: 'user2' },
      { id: '33', title: 'Airtable', url: 'https://airtable.com', description: '스프레드시트 기반 관리', views: 88, likes: 6, createdAt: new Date('2025-03-31'), likedBy: [], uploadedBy: 'user1' },
      { id: '34', title: 'Asana', url: 'https://asana.com', description: '작업 관리 플랫폼', views: 93, likes: 8, createdAt: new Date('2025-03-30'), likedBy: [], uploadedBy: 'user2' },
    ],
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [comments, setComments] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const addLink = (newLink) => {
    const newId = Date.now().toString();
    setLinks((prev) => ({
      ...prev,
      [newLink.category]: [
        ...(prev[newLink.category] || []),
        { ...newLink, id: newId, views: 0, likes: 0, createdAt: new Date(), likedBy: [], uploadedBy: currentUser || 'anonymous' },
      ],
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setCurrentUser(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSearchQuery('');
  };

  const handleSignup = (username) => {
    setIsLoggedIn(true);
    setCurrentUser(username);
  };

  const handleLike = (category, linkId) => {
    if (!isLoggedIn) {
      alert('로그인 후 좋아요를 누를 수 있습니다.');
      return;
    }
    setLinks((prev) => ({
      ...prev,
      [category]: prev[category].map((link) =>
        link.id === linkId
          ? {
              ...link,
              likes: link.likedBy.includes(currentUser)
                ? link.likes - 1
                : link.likes + 1,
              likedBy: link.likedBy.includes(currentUser)
                ? link.likedBy.filter((user) => user !== currentUser)
                : [...link.likedBy, currentUser],
            }
          : link
      ),
    }));
  };

  const handleView = (category, linkId) => {
    setLinks((prev) => ({
      ...prev,
      [category]: prev[category].map((link) =>
        link.id === linkId ? { ...link, views: link.views + 1 } : link
      ),
    }));
  };

  const addComment = (linkId, comment) => {
    setComments((prev) => ({
      ...prev,
      [linkId]: [
        ...(prev[linkId] || []),
        { id: Date.now().toString(), user: currentUser, text: comment, createdAt: new Date() },
      ],
    }));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

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
                onLike={handleLike}
                onView={handleView}
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
              <LinkForm onAddLink={addLink} />
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
          path="/link/:linkId"
          element={
            <div className="container mx-auto p-4 pt-20">
              <LinkDetailPage
                links={links}
                comments={comments}
                onLike={handleLike}
                onView={handleView}
                addComment={addComment}
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
                onLike={handleLike}
                onView={handleView}
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
              <ProfilePage
                links={links}
                comments={comments}
                currentUser={currentUser}
              />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;