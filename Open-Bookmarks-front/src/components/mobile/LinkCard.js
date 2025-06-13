import React from "react";
import { Link } from "react-router-dom";
import { toggleLike, incrementView, deleteLink } from "../../services/api";

const LinkCard = ({ link, category, currentUser, onRefresh, showEditDelete = false }) => {
    const handleLike = async () => {
        if (!currentUser) {
            alert("로그인 후 좋아요를 누를 수 있습니다.");
            return;
        }
        try {
            await toggleLike(link.id);
        } catch (err) {
            alert("좋아요 처리에 실패했습니다.");
        }
    };

    const handleView = async () => {
        try {
            await incrementView(link.id);
        } catch (err) {
            console.error("조회수 증가 실패:", err);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        try {
            await deleteLink(link.id);
            onRefresh?.();
        } catch (err) {
            alert("삭제에 실패했습니다.");
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition flex flex-col">
            <Link
                to={`/links/${link.id}`}
                className="text-lg font-semibold text-gray-800 hover:text-blue-600 mb-2"
            >
                {link.title}
            </Link>
            <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mb-2 break-words max-w-full overflow-hidden"
                onClick={handleView}
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
                        fill={"currentColor"}
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

            {showEditDelete && currentUser?.trim() === link.uploadedBy?.trim() && (
                <div className="mt-2 flex space-x-2">
                    <Link
                        to={`/edit/${link.id}`}
                        className="text-sm px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                    >
                        수정
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        삭제
                    </button>
                </div>
            )}

        </div>
    );
};

export default LinkCard;
