import { FETCH_ALL, FETCH_POST, START_LOADING, END_LOADING, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionTypes';
import * as api from '../api';


export const getCampground = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchCampground(id);

        // console.log(data);
        dispatch({ type: FETCH_POST, payload: data });

        dispatch({ type: END_LOADING });
       } catch (error) {
        console.log(error);
    }
}

export const getCampgrounds = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchCampgrounds(page);

        dispatch({ type: FETCH_ALL, payload: data });

        dispatch({ type: END_LOADING });
       } catch (error) {
        console.log(error);
    }
}
export const getCampgroundsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data: { data } } = await api.fetchCampgroundsBySearch(searchQuery);
        
        dispatch({ type: FETCH_BY_SEARCH, payload: data });

        dispatch({ type: END_LOADING });
       } catch (error) {
        console.log(error);
    }
}
export const createCampground = (campground) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        // dispatch({ type: CREATE, payload: { ...campground, campground} });
        const { data } = await api.createCampground(campground);

        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}
export const updateCampground = (id, campground) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE, payload: { ...campground, id, campground} });

        const { data } = await api.updateCampground(id, campground);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}
export const deleteCampground = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE, payload: id });

        await api.deleteCampground(id);

    } catch (error) {
        console.log(error);
    }
}
export const likeCampground = (campground) => async (dispatch) => {
    try {
        // optical illusion
        dispatch({ type: LIKE, payload: { ...campground, likeCount: campground.likeCount + 1 } });

        const { data } = await api.likeCampground(campground._id);

        dispatch({ type: LIKE, payload: data });

    } catch (error) {
        console.log(error);
    }
}
export const commentCampground = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value, id);

        dispatch({ type: COMMENT, payload: data });

        return data.comments;
    } catch (error) {
        console.log(error);
    }
}