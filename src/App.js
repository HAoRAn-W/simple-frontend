import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import HomePage from "./components/home/HomePage";
import { Route, Routes } from "react-router-dom";
import CategoryPage from "./components/category/CategoryPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

function App() {
  const defaultTheme = createTheme();
  return (
    <div className="App">
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/tag" element={<HomePage />} />
          <Route path="/about" element={<HomePage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
