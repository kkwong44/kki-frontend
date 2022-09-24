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
import AlbumPage from "./pages/albums/AlbumPage";


function App() {

  return (

        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={() => <h1>Home Page</h1>} />
              <Route exact path="/signin" render={() => <SignInForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route exact path="/albums/create" render={() => <AlbumCreateForm />} />
              <Route exact path="/albums/:id" render={() => <AlbumPage />} />
              <Route render={() => <h1>Page not found</h1>} />
            </Switch>
          </Container>
        </div>

  );
}

export default App;
