import logo from "./logo.svg";
// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Crud from "./Crud";
import Add from "./Add";
import Edit from "./Edit";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Crud />} />
          <Route path="/create" element={<Add />} />
          <Route path="/update/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
