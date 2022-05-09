import "./styles/index.css";

import ReactDOM from "react-dom";

import App from "./components/App";

import { fixViewportUnits } from "./utils";

fixViewportUnits();
ReactDOM.render(<App />, document.getElementById("root"));
