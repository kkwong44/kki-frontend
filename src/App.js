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
import Code404 from "./components/Code404";
import ContactPage from "./pages/contacts/ContactPage";
import ContactEditForm from "./pages/contacts/ContactEditForm";

const App = () => {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  // Set all the routing paths for the application
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          {/* Home page */}
          <Route
            exact
            path="/"
            render={() => (
              <AlbumListPage message="No results found. Adjust the search keyword." />
            )}
          />
          {/* Liked Page */}
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
          {/* Sign in, Sign up, About and Contact Page */}
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/about" render={() => <AboutPage />} />
          <Route exact path="/contacts" render={() => <ContactPage />} />
          {/* Contact Edit Form */}
          <Route
            exact
            path="/contacts/edit"
            render={() => <ContactEditForm />}
          />
          {/* Create Album Form */}
          <Route
            exact
            path="/albums/create"
            render={() => <AlbumCreateForm />}
          />
          {/* Album Detail Page */}
          <Route exact path="/albums/:id" render={() => <AlbumPage />} />
          <Route
            exact
            path="/albums/:id/edit"
            render={() => <AlbumEditForm />}
          />
          {/* Album Comments Page */}
          <Route
            exact
            path="/albums/:id/comments"
            render={() => <AlbumCommentsPage />}
          />
          {/* User Profile Page */}
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          {/* User Profile Change Username Form */}
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          {/* User Profile Change Password Form */}
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          {/* User Profile Edit Form */}
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          {/* Page not Found */}
          <Route render={() => <Code404 />} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
