import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import HomePage from "./components/home/HomePage";
import { Route, Routes } from "react-router-dom";
import CategoryPage from "./components/category/CategoryPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import PostPage from "./components/post/PostPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";

function App() {
  const defaultTheme = createTheme();
  return (
    <div className="App">
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <NavBar />
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path=':id' element={<PostPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

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
