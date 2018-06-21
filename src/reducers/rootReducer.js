import { combineReducers } from 'redux';
import user from './user';
import { fetch_branches, get_branch } from './branch';
import teachers from './teacher';

export default combineReducers({
  user,
  branches: fetch_branches,
  branch: get_branch,
  teachers
});
