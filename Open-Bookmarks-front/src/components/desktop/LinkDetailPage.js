import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLinkById, getComments, addComment, toggleLike } from '../../services/api';

function DesktopLinkDetailPage() {
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
        return <div className="p-8 text-center text-lg">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-8">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-4">{link.title}</h1>
                <p className="text-gray-600 mb-4">{link.description}</p>
                <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline break-all"
                >
                    {link.url}
                </a>
                <div className="flex items-center text-gray-500 mt-4">
                    <span>Views: {link.viewCount}</span>
                    <button
                        onClick={handleLike}
                        className="ml-4 px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
                    >
                        Like ({link.likeCount})
                    </button>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Comments</h2>
                <form onSubmit={handleAddComment} className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <textarea
                        className="w-full p-2 border rounded"
                        rows="3"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                    <button
                        type="submit"
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Submit Comment
                    </button>
                </form>

                <div className="space-y-4">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.id} className="bg-white shadow-md rounded-lg p-4">
                                <p>{comment.content}</p>
                            </div>
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DesktopLinkDetailPage;