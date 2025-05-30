import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../services/api';

const SignupPage = ({ onSignup }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const response = await signup({
        username: credentials.username,
        password: credentials.password,
      });
      onSignup(response.data.user, response.data.token);
      navigate('/');
    } catch (err) {
      setError('회원가입에 실패했습니다. 사용자 이름을 확인하세요.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">회원가입</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="사용자 이름"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={credentials.confirmPassword}
          onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
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