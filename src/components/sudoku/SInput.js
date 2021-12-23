import { connect } from "react-redux";
import { GRID_MIN, GRID_MAIN, CLASS_NAME } from "../../constants/sudoku";
import {
    cellFocusCallback,
    cellInputHandler,
    cellKeyDownHandler,
    isActiveSegment,
    cellInputValue,
    repeatInSegment,
    repeatInX,
    repeatInY,
} from "../../redux/helpers";

export default connect((state) => state, null)(SInput);

function SInput({ pos, sudoku }) {
    return (
        <div
            className={CLASS_NAME + "__input"}
            data-color={sudoku.color}
            data-y={pos.y === sudoku.focus.y}
            data-x={pos.x === sudoku.focus.x}
            data-cluster={isActiveSegment(pos)}
            data-err-y={repeatInY(pos)}
            data-err-x={repeatInX(pos)}
            data-err-cluster={repeatInSegment(pos)}
        >
            <input
                type="number"
                min={GRID_MIN}
                max={GRID_MAIN}
                value={cellInputValue(pos, "value")}
                readOnly={cellInputValue(pos, "prefill")}
                onFocus={cellFocusCallback(pos)}
                onBlur={cellFocusCallback({})}
                onKeyDown={cellKeyDownHandler}
                onInput={cellInputHandler}
            />
        </div>
    );
}
