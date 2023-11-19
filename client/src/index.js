import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render (
   <React.StrictMode>
        <BrowserRouter>  
            <App />
        </BrowserRouter>
   </React.StrictMode>,
   document.getElementById("root")
);

//BrowserRouter keeps the UI in sync with the URL
// helps with transitions while switching components
// Will only reload/refresh the component that is changing instead of the whole page