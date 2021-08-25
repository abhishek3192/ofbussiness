import { combineReducers } from "redux";
import {issueReducer} from './githubReducer'


const reducers = combineReducers({
    allGithubIssue: issueReducer
})

export default reducers;