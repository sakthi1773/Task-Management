import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Layout from "./CommonComponents/Layout/Layout";
import { BrowserRouter} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
}

export default App;
