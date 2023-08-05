import { CssBaseline, ThemeProvider } from "@mui/material";
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
import FavoritePage from "./components/user/FavoritePage";
import AboutPage from "./components/about/AboutPage";
import EditorPage from "./components/editor/EditorPage";
import PostEditor from "./components/editor/PostEditor";
import CategoryPostPage from "./components/category/CategoryPostPage";
import TagPage from "./components/tag/TagPage";
import TagPostPage from "./components/tag/TagPostPage";
import theme from "./components/styles/style";
import AuthService from "./app/services/auth.service";
import MusePage from "./components/muse/MusePage";

function App() {
  const user = AuthService.getUser();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route path="/category" element={<CategoryPage />} />
          <Route path="/category/:id" element={<CategoryPostPage />} />

          <Route path="/tag" element={<TagPage />} />
          <Route path="/tag/:id" element={<TagPostPage />} />

          <Route path="/about" element={<AboutPage />} />

          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/favorites" element={<FavoritePage />} />

          <Route path="/muse" element={<MusePage />} />

          {user && user.roles.includes("ROLE_ADMIN") && (
            <>
              <Route path="/editor" element={<EditorPage />} />
              <Route path="/posteditor" element={<PostEditor />} />
            </>
          )}

          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
