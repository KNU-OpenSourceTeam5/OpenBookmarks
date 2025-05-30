import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // /api 제거
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: JWT 토큰 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getLinks = (params) => api.get('/links', { params });
export const addLink = (link) => api.post('/links', link);
export const toggleLike = (linkId) => api.put(`/links/${linkId}/like`);
export const incrementView = (linkId) => api.put(`/links/${linkId}/view`);
export const getComments = (linkId) => api.get(`/comments/${linkId}`);
export const addComment = (comment) => api.post('/comments', comment);
export const getUserProfile = () => api.get('/users/me');
export const login = (credentials) => api.post('/auth/login', credentials);
export const signup = (credentials) => api.post('/auth/signup', credentials);

export default api;