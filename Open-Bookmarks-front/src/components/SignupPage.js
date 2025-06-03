import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api';

const SignupPage = ({ onSignup }) => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = userData;

    if (!username || !password) {
      setError('사용자 이름과 비밀번호를 입력해주세요.');
      return;
    }

    if (username.length < 3) {
      setError('사용자 이름은 3자 이상이어야 합니다.');
      return;
    }

    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    try {
      console.log('회원가입 요청:', { username }); // 디버깅
      const response = await register(userData);
      console.log('회원가입 응답:', response.data); // 디버깅
      onSignup({ username });
      navigate('/');
    } catch (err) {
      console.error('회원가입 오류:', err.status, err);
      if (err.status === 400) {
        setError(err || '이미 존재하는 사용자 이름입니다.');
      } else {
        setError(err || '회원가입에 실패했습니다.');
      }
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">회원가입</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="사용자 이름"
          value={userData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={userData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          회원가입
        </button>
      </form>
      <p className="mt-4 text-center">
        이미 계정이 있으신가요?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          로그인
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;