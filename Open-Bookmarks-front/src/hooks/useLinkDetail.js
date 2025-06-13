// LinkDetailPage에서 링크 상세 정보와 댓글을 관리하는 커스텀 훅 - PC와 모바일 컴포넌트에서 동일한 로직을 공유하도록 리팩토링

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../services/api';

    /*
    LinkDetailPage에서 사용되는 모든 데이터와 로직을 관리하는 커스텀 훅
    이 훅은 PC와 모바일 컴포넌트를 동일한 로직을 공유하도록 하고 UI 렌더링에 집중할 수 있도록 하는 근간이 됩니다.
    */
export function useLinkDetail() {
  const { linkId } = useParams(); // URL로부터 linkId를 가져옴
  const [link, setLink] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 서버로부터 링크 상세 데이터와 댓글 목록을 가져오는 함수
  // useCallback으로 묶어 linkId가 변경될 때만 함수가 재생성되도록 최적화
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      // 링크 상세 정보와 댓글 목록을 동시에 요청
      const [linkData, commentsData] = await Promise.all([
        api.getLinkById(linkId),
        api.getComments(linkId),
      ]);
      setLink(linkData);
      setComments(commentsData);
      setError(null); // 이전 에러가 있었다면 초기화
    } catch (err) {
      console.error('Failed to fetch link details or comments:', err);
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [linkId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 댓글 추가(현재는 댓글 기능 자체에 약간에 오류가 있는 것 같음)
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }
    try {
      // API를 호출하여 서버에 댓글을 추가
      const addedComment = await api.addComment(linkId, { content: newComment });
      // 상태를 업데이트하여 화면에 즉시 반영
      setComments((prevComments) => [...prevComments, addedComment]);
      setNewComment(''); // 입력창 초기화
    } catch (err) {
      console.error('Failed to add comment:', err);
      alert('댓글 작성에 실패했습니다.');
    }
  };

  // 좋아요 하트 토글을 처리하는 함수
  const handleLike = async () => {
    if (!link) return;
    try {
      // API를 호출하여 좋아요 상태를 변경
      const updatedLink = await api.toggleLike(linkId);
      // 상태를 업데이트하여 화면에 즉시 반영
      setLink(updatedLink);
    } catch (err) {
      console.error('Failed to toggle like:', err);
      alert('좋아요 처리에 실패했습니다.');
    }
  };

  // 컴포넌트에서 사용할 상태와 함수들을 객체 형태로 반환(필수)
  return {
    link,
    comments,
    newComment,
    isLoading,
    error,
    setNewComment,
    handleAddComment,
    handleLike,
  };
}