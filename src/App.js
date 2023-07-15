import { CssBaseline } from "@mui/material";
import HomePage from "./components/home/HomePage";
import { Route, Routes } from "react-router-dom";
import CategoryPage from "./components/category/CategoryPage";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/tag" element={<HomePage />} />
        <Route path="/about" element={<HomePage />} />
        <Route path="/*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
