import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addLink, checkSession } from "../../services/api";

const LinkForm = () => {
  const [newLink, setNewLink] = useState({
    title: "",
    url: "",
    contents: "",
    category: "기술",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("username");

  useEffect(() => {
    const verifySession = async () => {
      if (!isLoggedIn) {
        setError("로그인이 필요합니다.");
        navigate("/login");
        return;
      }
      try {
        const response = await checkSession();
        console.log("세션 상태:", response.data); // 디버깅
      } catch (err) {
        console.error("세션 확인 오류:", err.status, err.error);
        setError("세션이 만료되었습니다. 다시 로그인해주세요.");
        localStorage.removeItem("username");
        navigate("/login");
      }
    };
    verifySession();
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, url, category } = newLink;

    if (!title || !url || !category) {
      setError("제목, URL, 카테고리는 필수 입력 항목입니다.");
      return;
    }

    const urlRegex =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!urlRegex.test(url)) {
      setError("유효한 URL을 입력해주세요.");
      return;
    }

    try {
      console.log("링크 추가 요청:", newLink);
      await addLink(newLink);
      setNewLink({ title: "", url: "", contents: "", category: "기술" });
      navigate("/");
    } catch (err) {
      console.error("링크 추가 오류:", err.status, err.error);
      if (err.status === 401) {
        setError("로그인이 필요합니다. 다시 로그인해주세요.");
        localStorage.removeItem("username");
        navigate("/login");
      } else {
        setError(err.error || "링크 추가에 실패했습니다.");
      }
    }
  };

  const handleChange = (e) => {
    setNewLink({ ...newLink, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg mb-8">
      <h2 className="text-xl font-semibold mb-4">새 링크 추가</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="제목"
          value={newLink.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="url"
          name="url"
          placeholder="URL"
          value={newLink.url}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="contents"
          placeholder="설명"
          value={newLink.contents}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        ></textarea>
        <select
          name="category"
          value={newLink.category}
          onChange={handleChange}
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
