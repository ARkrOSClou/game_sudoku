import "./styles.scss";
import { CLASS_NAME } from "../../constants/sudoku";
import SColor from "./SColor";
import SGrid from "./SGrid";
import SNew from "./SNew";
import SDifficulty from "./SDifficulty";

export default function Sudoku() {
    return (
        <div className={CLASS_NAME}>
            <SColor />
            <SGrid />
            <SNew />
            <SDifficulty />
        </div>
    );
}
