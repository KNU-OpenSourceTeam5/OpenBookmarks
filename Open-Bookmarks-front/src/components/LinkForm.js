import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addLink } from '../services/api';

const LinkForm = () => {
  const [newLink, setNewLink] = useState({
    title: '',
    url: '',
    contents: '',
    category: '기술',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newLink.title && newLink.url) {
      try {
        await addLink(newLink);
        setNewLink({ title: '', url: '', contents: '', category: '기술' });
        navigate('/');
      } catch (err) {
        console.log(err)
        setError('링크 추가에 실패했습니다.');
      }
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg mb-8">
      <h2 className="text-xl font-semibold mb-4">새 링크 추가</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="제목"
          value={newLink.title}
          onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <input
          type="url"
          placeholder="URL"
          value={newLink.url}
          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="설명"
          value={newLink.contents}
          onChange={(e) => setNewLink({ ...newLink, contents: e.target.value })}
          className="w-full p-2 border rounded"
        ></textarea>
        <select
          value={newLink.category}
          onChange={(e) => setNewLink({ ...newLink, category: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="기술">기술</option>
          <option value="교육">교육</option>
          <option value="기타">기타</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          링크 추가
        </button>
      </form>
    </div>
  );
};

export default LinkForm;