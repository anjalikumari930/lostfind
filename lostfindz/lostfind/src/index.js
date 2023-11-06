import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

import App from "./App";
import { Toaster } from "react-hot-toast";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    
    <App />
    <Toaster
      position="top-center"
       reverseOrder={false}
     />
  </React.StrictMode>
);
