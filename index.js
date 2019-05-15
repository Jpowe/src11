import React from "react";
import ReactDOM from "react-dom";
//import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import App from "./App";
import "./styles.scss";
import "font-awesome/css/font-awesome.css";
import "flexboxgrid/css/flexboxgrid.css";

import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
//registerServiceWorker();
