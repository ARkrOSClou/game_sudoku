import { GRID_MAIN } from "../constants/sudoku";

const gridInit = (length, init = {}) => [...Array(length)].map(() => [...Array(length)].map(() => init));

const init = {
    focus: {},
    grid: gridInit(GRID_MAIN),
    color: false,
    fillRange: {},
};

export const sudoku = (state = init, action) => {
    switch (action.type) {
        case "SUDOKU/SET_STATE":
            return { ...state, ...action.update };
        default:
            return state;
    }
};

export function setSudokuState(update) {
    return {
        type: "SUDOKU/SET_STATE",
        update,
    };
}
