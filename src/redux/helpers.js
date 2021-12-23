import store from "./store";
import { DIFFICULTY, GRID_MAIN, GRID_SUB } from "../constants/sudoku";
import { setSudokuState } from "./sudoku";

function segmentLine(line) {
    return Math.floor(line / GRID_SUB);
}

function random(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function range(min = 0, max = GRID_MAIN) {
    return [...Array(min + max).keys()].slice(min, min + max);
}

function shuffleRange(min = 0) {
    return shuffle(range(min));
}

function randomPos(min, max) {
    return shuffleRange().slice(0, random(min, max));
}

function repeatInLine({ y, x }, line) {
    return !!line.flat().find((f) => parseInt(f.value) === store.getState().sudoku.grid[y][x].value);
}

function excludeValueGrid(pos) {
    return store.getState().sudoku.grid.map((row, y) => {
        return pos.y === y ? row.map((cell, x) => (pos.x === x ? {} : cell)) : row;
    });
}

function activeSegment(pos) {
    const slice = (line, key) => line.filter((_, index) => segmentLine(pos[key]) === segmentLine(index));
    return slice(excludeValueGrid(pos), "y").map((row) => slice(row, "x"));
}

export function isActiveSegment(pos) {
    const compare = (key) => segmentLine(pos[key]) === segmentLine(store.getState().sudoku.focus[key]);
    return compare("x") && compare("y");
}

export function repeatInY(pos) {
    return repeatInLine(
        pos,
        excludeValueGrid(pos).map((row) => row.filter((_, x) => pos.x === x))
    );
}

export function repeatInX(pos) {
    return repeatInLine(
        pos,
        excludeValueGrid(pos).filter((row, y) => pos.y === y)
    );
}

export function repeatInSegment(pos) {
    return repeatInLine(pos, activeSegment(pos));
}

export function dividerLine(line) {
    return (line + 1) % GRID_SUB === 0;
}

export function cellFocusCallback(pos) {
    return () => {
        store.dispatch(
            setSudokuState({
                focus: pos,
            })
        );
    };
}

export function setSudokuInput(args) {
    const { sudoku } = store.getState();
    let clone = [...sudoku.grid];
    const { y, x } = sudoku.focus;
    clone[y][x] = {
        ...clone[y][x],
        ...args,
    };
    return clone;
}

export function cellKeyDownHandler(event) {
    // prevent symbols
    ["0", "+", "-", ",", "."].forEach((key) => key === event.key && event.preventDefault());
    // remove previous value
    if (parseInt(event.key)) {
        store.dispatch(
            setSudokuState(
                setSudokuInput({
                    value: null,
                })
            )
        );
    }
}

export function cellInputHandler({ target }) {
    store.dispatch(
        setSudokuState(
            setSudokuInput({
                value: parseInt(target.value),
            })
        )
    );
}

export function colorChangeHandler(event) {
    store.dispatch(
        setSudokuState({
            color: event.target.checked,
        })
    );
}

export function cellInputValue({ y, x }, key) {
    const cell = store.getState().sudoku.grid[y][x];
    return cell && cell[key] ? cell[key] : "";
}

export function setDifficulty(index) {
    if (DIFFICULTY[index]) {
        store.dispatch(
            setSudokuState({
                fillRange: { ...DIFFICULTY[index] },
            })
        );
    }
}
export function newClickHandler() {
    generateGrid();
}

function generateGrid() {
    const fillRange = store.getState().sudoku.fillRange;
    const fillGrid = () => {
        let base = range().map((_, n) => {
            const rangeNum = range(1);
            const rowShift = (n * GRID_SUB + (Math.floor(n / GRID_SUB) % GRID_SUB)) % GRID_MAIN;
            return [...rangeNum.slice(rowShift), ...rangeNum.slice(0, rowShift)];
        });
        const transpose = () => {
            base = base[0].map((_, i) => base.map((row) => row[i]));
        };
        const shuffleGrid = () => {
            const shuffleRange = () =>
                shuffle(range(0, 3))
                    .map((n) => shuffle([...Array(n * GRID_SUB + GRID_SUB).keys()].slice(n * GRID_SUB, n * GRID_SUB + GRID_SUB)))
                    .flat();
            const shuffleRows = shuffleRange()
                .map((key) => base[key])
                .reverse();
            const cellRange = shuffleRange();
            base = shuffleRows.map((row) => {
                return cellRange.map((key) => row[key]);
            });
        };

        for (let i = 0; i < 10; i++) {
            shuffleGrid();
            transpose();
            shuffleGrid();
        }

        const mask = store
            .getState()
            .sudoku.grid.map(() => randomPos(fillRange.min, fillRange.max))
            .map((row, y) =>
                row.map((x) => ({
                    y: Math.floor(y / GRID_SUB) * GRID_SUB + Math.floor(x / GRID_SUB),
                    x: (y % GRID_SUB) * GRID_SUB + (x % GRID_SUB),
                }))
            );
        return base.map((row, y) => {
            return row.map((value, x) => {
                const prefill = !!mask.flat().find((f) => f.y === y && f.x === x);
                return {
                    prefill,
                    value: prefill && value,
                };
            });
        });
    };
    store.dispatch(
        setSudokuState({
            grid: fillGrid(),
        })
    );
}
