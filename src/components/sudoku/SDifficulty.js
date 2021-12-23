import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { CLASS_NAME, DIFFICULTY } from "../../constants/sudoku";
import { newClickHandler, setDifficulty } from "../../redux/helpers";

export default connect((state) => state, null)(SDifficulty);

function SDifficulty() {
    const [state, setState] = useState(1);
    const [isShow, setShow] = useState(true);

    useEffect(() => {
        setDifficulty(state);
    }, [state]);

    const formTitle = "Choose Difficulty";

    return (
        <>
            <div className={CLASS_NAME + "__diff_trigger"}>
                <button
                    onClick={() => {
                        setShow(true);
                    }}
                >
                    {formTitle}
                </button>
            </div>
            <div
                aria-disabled={!isShow}
                className={CLASS_NAME + "__diff_form"}
                onClick={(event) => {
                    if (event.target.classList.contains(CLASS_NAME + "__diff_form")) {
                        setShow(false);
                    }
                }}
            >
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        newClickHandler();
                        setShow(false);
                    }}
                >
                    <h3>{formTitle}</h3>
                    <ul>
                        {DIFFICULTY.map(({ label, min, max }, index) => {
                            return (
                                <li key={index}>
                                    <label>
                                        <input
                                            type="radio"
                                            name="difficulty"
                                            value={index}
                                            checked={index === state}
                                            onChange={() => {
                                                setState(index);
                                            }}
                                        />
                                        {`${label}: ${min}-${max} prefilled numbers`}
                                    </label>
                                </li>
                            );
                        })}
                    </ul>

                    <input type="submit" value="Create" />
                </form>
            </div>
        </>
    );
}
