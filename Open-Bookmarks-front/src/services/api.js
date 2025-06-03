import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const userId = localStorage.getItem('username');
    if (userId) {
      config.headers['X-User-Id'] = userId;
    }
    console.log('요청:', config.method.toUpperCase(), config.url, 'Params:', config.params, 'Data:', config.data, 'Cookies:', document.cookie); // 디버깅
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    console.log('응답:', response.status, response.data, 'Headers:', response.headers); // 디버깅
    return response;
  },
  (error) => {
    console.error('API 오류:', error.response?.status, error.message, error.config?.url, error.response?.data);
    return Promise.reject(error.response?.data || { error: 'Unknown error', status: error.response?.status });
  }
);

export const getLinks = (params) => api.get('/links', { params });
export const getLinksByTitle = (title) => api.get(`/links/${encodeURIComponent(title)}`);
export const addLink = (link) => api.post('/links', link);
export const toggleLike = (linkId) => api.put(`/links/${linkId}/like`);
export const incrementView = (linkId) => api.put(`/links/${linkId}/view`);
export const getComments = (linkId) => api.get(`/comments/${linkId}`);
export const addComment = (comment) => api.post('/comments', comment);
export const getUserProfile = () => api.get('/users/me');
export const login = (credentials) => api.post('users/login', credentials);
export const logout = (credentials) => api.post('users/logout', credentials);
export const register = (data) => api.post('/users/register', data);
export const checkSession = () => api.get('/users/session');
export default api;