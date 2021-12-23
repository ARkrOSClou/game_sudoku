import { createStore } from "redux";
import { combineReducers } from "redux";
import { sudoku } from "./sudoku";

const store = createStore(
    combineReducers({
        sudoku,
    })
);

export default store;
