import { connect } from "react-redux";
import { CLASS_NAME } from "../../constants/sudoku";
import { dividerLine } from "../../redux/helpers";
import SInput from "./SInput";

export default connect((state) => state, null)(SGrid);

function SGrid({ sudoku }) {
    return (
        <div className={CLASS_NAME + "__grid"}>
            {sudoku.grid.map((row, y) => (
                <div key={y} data-divider={dividerLine(y)} className={CLASS_NAME + "__row"}>
                    {row.map((_, x) => (
                        <div key={x} data-divider={dividerLine(x)} className={CLASS_NAME + "__cell"}>
                            <SInput pos={{ y, x }} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
