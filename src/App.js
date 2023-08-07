import { CssBaseline, ThemeProvider } from "@mui/material";
import HomePage from "./components/home/HomePage";
import { Route, Routes } from "react-router-dom";
import CategoryPage from "./components/category/CategoryPage";
import NotFound from "./components/template/NotFound";
import PostPage from "./components/post/PostPage";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import ProfilePage from "./components/user/ProfilePage";
import FavoritePage from "./components/user/FavoritePage";
import AboutPage from "./components/about/AboutPage";
import EditorPage from "./components/editor/EditorPage";
import PostEditor from "./components/editor/PostEditor";
import CategoryPostPage from "./components/category/CategoryPostPage";
import TagPage from "./components/tag/TagPage";
import TagPostPage from "./components/tag/TagPostPage";
import theme from "./styles/style";
import AuthService from "./app/services/auth.service";
import MusePage from "./components/muse/MusePage";
import Template from "./components/template/Template";

function App() {
  const user = AuthService.getUser();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Template />}>
            <Route index element={<HomePage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route path="/post/:id" element={<PostPage />} />
            

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
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
