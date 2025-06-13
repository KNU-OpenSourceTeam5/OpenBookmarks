import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLinkById, updateLink } from "../../services/api";

const CATEGORIES = ["기술", "교육", "기타"];

const EditLinkPage = () => {
    const { linkId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        url: "",
        contents: "",
        category: "",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchLink = async () => {
            try {
                const res = await getLinkById(linkId);
                const data = res.data;

                setFormData({
                    title: data.title ?? "",
                    url: data.url ?? "",
                    contents: data.contents ?? "",
                    category: data.category ?? "",
                });
            } catch (err) {
                alert("링크 정보를 불러오는 데 실패했습니다.");
                navigate(-1);
            } finally {
                setLoading(false);
            }
        };
        fetchLink();
    }, [linkId, navigate]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await updateLink(linkId, formData);
            alert("링크가 수정되었습니다.");
            navigate(`/category/내글`);
        } catch (err) {
            alert("수정에 실패했습니다.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-4">불러오는 중...</div>;

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">링크 수정</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="제목"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded"
                    required
                />
                <input
                    type="url"
                    name="url"
                    placeholder="URL"
                    value={formData.url}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded"
                    required
                />
                <textarea
                    name="contents"
                    placeholder="설명"
                    value={formData.contents}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded"
                    rows={4}
                />
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 rounded"
                    required
                >
                    <option value="">카테고리 선택</option>
                    {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    disabled={saving}
                    className={`px-4 py-2 rounded text-white ${
                        saving ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    {saving ? "수정 중..." : "수정 완료"}
                </button>
            </form>
        </div>
    );
};

export default EditLinkPage;
