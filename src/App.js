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
import ProfilePage from "./components/user/ProfilePage";
import FavoritePage from "./components/user/FavoritePage"
import AboutPage from "./components/about/AboutPage";

function App() {
  const defaultTheme = createTheme();
  return (
    <div className="App">
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path='/:id' element={<PostPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route path="/category" element={<CategoryPage />} />
          <Route path="/tag" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />

          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/favorites" element={<FavoritePage />} />

          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
