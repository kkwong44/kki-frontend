//
// Main JavaScriot for the App kkimage-frontend
//
import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import AlbumCreateForm from "./pages/albums/AlbumCreateForm";
import AlbumEditForm from "./pages/albums/AlbumEditForm";
import AlbumPage from "./pages/albums/AlbumPage";
import AlbumListPage from "./pages/albums/AlbumListPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import AlbumCommentsPage from "./pages/albums/AlbumCommentsPage";
import AboutPage from "./pages/abouts/AboutPage";
import Code404 from "./pages/Errors/Code404";
import ContactPage from "./pages/contacts/ContactPage";
import ContactEditForm from "./pages/contacts/ContactEditForm";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <AlbumListPage message="No results found. Adjust the search keyword." />
            )}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              <AlbumListPage
                message="No results found. Adjust the search keyword or like an album."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/about" render={() => <AboutPage />} />
          <Route exact path="/contacts" render={() => <ContactPage />} />
          <Route
            exact
            path="/contacts/edit"
            render={() => <ContactEditForm />}
          />
          <Route
            exact
            path="/albums/create"
            render={() => <AlbumCreateForm />}
          />
          <Route exact path="/albums/:id" render={() => <AlbumPage />} />
          <Route
            exact
            path="/albums/:id/edit"
            render={() => <AlbumEditForm />}
          />
          <Route
            exact
            path="/albums/:id/comments"
            render={() => <AlbumCommentsPage />}
          />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route render={() => <Code404 />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
