import React from "react";
import ReactDOM from "react-dom";

import App from "./App"

import registerServiceWorker from "./registerServiceWorker";

import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import "bootstrap/dist/js/bootstrap.js";
import "jquery/dist/jquery.js";
import "popper.js/dist/popper.js";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
