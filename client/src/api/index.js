import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req) => {
    //Sending back the token to the backend to very if the user is actually logged in
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

export const fetchCampground = (id) => API.get(`/campgrounds/${id}`);
export const fetchCampgrounds = (page) => API.get(`/campgrounds?page=${page}`);
export const fetchCampgroundsBySearch = (searchQuery) => API.get(`/campgrounds/search?searchQuery=${searchQuery.search || 'none'}`);
export const createCampground = (newCampground) => API.post('/campgrounds', newCampground);
export const updateCampground = (id, updatedCampground) => API.patch(`/campgrounds/${id}`, updatedCampground);
export const deleteCampground = (id) => API.delete(`/campgrounds/${id}`);
export const likeCampground = (id) => API.patch(`/campgrounds/${id}/likeCampground`);
export const comment = (value, id) => API.post(`/campgrounds/${id}/commentCampground`, { value });

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const googleAuth = (googleAuthData) => API.post('/user/google-auth', googleAuthData);