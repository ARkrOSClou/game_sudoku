import { connect } from "react-redux";
import { CLASS_NAME } from "../../constants/sudoku";
import { newClickHandler } from "../../redux/helpers";

export default connect((state) => state, null)(SNew);

function SNew() {
    return (
        <button className={CLASS_NAME + "__new"} onClick={newClickHandler}>
            Create new puzzle
        </button>
    );
}
