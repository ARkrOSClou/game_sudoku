import { connect } from "react-redux";
import { CLASS_NAME, GRID_SUB } from "../../constants/sudoku";
import { colorChangeHandler } from "../../redux/helpers";

export default connect((state) => state, null)(SColor);

function SColor({ sudoku }) {
    const list = {
        y_color: "vertical",
        x_color: "horizontal",
        segment: "sub-grid " + GRID_SUB + "x" + GRID_SUB,
    };

    return (
        <div className={CLASS_NAME + "__color"}>
            <label>
                <input type="checkbox" checked={sudoku.color} onChange={colorChangeHandler} />
                <span>Color coding</span>
            </label>
            <ul data-color={sudoku.color}>
                {Object.keys(list).map((key) => (
                    <li key={key} data-key={key}>
                        {list[key]}
                    </li>
                ))}
            </ul>
        </div>
    );
}
