import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const username = localStorage.getItem('username');
        if (username) {
            config.headers['X-User-Id'] = username;
        }
        if (process.env.NODE_ENV === 'development') {
            console.log('요청:', config.method.toUpperCase(), config.url, 'Params:', config.params, 'Data:', config.data, 'Cookies:', document.cookie);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => {
        if (process.env.NODE_ENV === 'development') {
            console.log('응답:', response.status, response.data, 'Headers:', response.headers);
        }
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
export const toggleLike = (linkId) => api.post(`/likes/toggle/${linkId}`);
export const incrementView = (linkId) => api.post(`/views/increment/${linkId}`);

export const getComments = (linkId) => api.get(`/comments/${linkId}`);
export const addComment = (comment) => api.post('/comments', comment);
export const getUserProfile = () => api.get('/users/me');

export const login = (credentials) => api.post('/users/login', credentials);
export const logout = () => api.post('/users/logout');
export const register = (data) => api.post('/users/register', data);
export const checkSession = () => api.get('/users/session');

export const getMyLinks = (username) => api.get(`/links/my/${username}`);

export const deleteLink = (linkId) => api.delete(`/links/${linkId}`);
export const updateLink = (linkId, updatedData) => api.put(`/links/${linkId}`, updatedData);
export const getLinkById = (linkId) => api.get(`/links/${linkId}`);


export default api;
