import "./styles.css";
import React, { StrictMode } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";

const app = (
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
);

render(app, document.getElementById("root"));
