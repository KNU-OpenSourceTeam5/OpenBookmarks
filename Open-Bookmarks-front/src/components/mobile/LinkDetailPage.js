import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLinkById, getComments, addComment, toggleLike } from '../../services/api';

function MobileLinkDetailPage() {
    const { linkId } = useParams();
    const [link, setLink] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchLinkAndComments = async () => {
            try {
                const linkData = await getLinkById(linkId);
                setLink(linkData.data);
                const commentsData = await getComments(linkId);
                setComments(commentsData.data);
            } catch (error) {
                console.error("Error fetching link and comments", error);
            }
        };
        fetchLinkAndComments();
    }, [linkId]);

    const handleAddComment = async (e) => {
        e.preventDefault();
        try {
            const res = await addComment(linkId, { content: newComment });
            setComments([...comments, res.data]);
            setNewComment('');
        } catch (error) {
            console.error("Error adding comment", error);
        }
    };

    const handleLike = async () => {
        try {
            const res = await toggleLike(linkId);
            setLink(res.data);
        } catch (error) {
            console.error("Error toggling like", error);
        }
    };

    if (!link) {
        return <div className="p-4 text-center">Loading...</div>;
    }

    return (
        <div className="p-4">
            <div className="bg-white shadow-lg rounded-lg p-4">
                <h1 className="text-2xl font-bold mb-2">{link.title}</h1>
                <p className="text-gray-700 text-sm mb-3">{link.description}</p>
                <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all text-sm"
                >
                    {link.url}
                </a>
                <div className="flex justify-between items-center text-gray-500 mt-4 text-xs">
                    <span>Views: {link.viewCount}</span>
                    <button
                        onClick={handleLike}
                        className="px-3 py-1.5 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition"
                    >
                        Like ({link.likeCount})
                    </button>
                </div>
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-bold mb-3">Comments</h2>
                <form onSubmit={handleAddComment} className="bg-white shadow-lg rounded-lg p-4 mb-4">
                    <textarea
                        className="w-full p-2 border rounded text-sm"
                        rows="3"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                    <button
                        type="submit"
                        className="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </form>

                <div className="space-y-3">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.id} className="bg-white shadow-lg rounded-lg p-3">
                                <p className="text-sm">{comment.content}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">No comments yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MobileLinkDetailPage;