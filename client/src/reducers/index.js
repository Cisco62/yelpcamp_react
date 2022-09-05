import { combineReducers } from "redux";

import campgrounds from './campgrounds';
import auth from './auth';

export default combineReducers({ campgrounds, auth });