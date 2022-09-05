import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, COMMENT, START_LOADING, END_LOADING } from '../constants/actionTypes';

const reducer = (state = { isLoading: true, campgrounds: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true}

        case END_LOADING:
            return { ...state, isLoading: false}

        case FETCH_ALL:
            return {
                ...state,
                campgrounds: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };

        case FETCH_BY_SEARCH:
            return { ...state, campgrounds: action.payload };

        case FETCH_POST:
            return { ...state, campground: action.payload };
            
        case CREATE:
            return { ...state, campgrounds: [ ...state.campgrounds, action.payload]}

        case UPDATE:
            return { ...state, campgrounds: state.campgrounds.map((campground) => campground._id === action.payload._id ? action.payload : campground)}

        case DELETE:
            return { ...state, campgrounds: state.campgrounds.filter((campground) => campground._id !== action.payload)}

        case LIKE:
            return { ...state, campgrounds: state.campgrounds.map((campground) => campground._id === action.payload._id ? action.payload : campground)}
        case COMMENT: 
            return { ...state, campgrounds: state.campgrounds.map((campground) => {
                //Change the post that just received a comment
                if(campground._id === action.payload._id) {
                    return action.payload;
                }
                //Return all the other posts normally
                return campground;
            })}
            
        default:
            return state;
    }
}

export default reducer;