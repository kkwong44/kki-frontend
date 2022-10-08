//
// Tests on NavBar component
//
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import NavBar from "../NavBar";

test("renders NavBar", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  const signInLink = screen.getByRole("link", { name: "Sign in" });
  expect(signInLink).toBeInTheDocument();
});

test("renders link to the user profile for logged in user", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const profileAvatar = await screen.findByText("Profile");
  expect(profileAvatar).toBeInTheDocument();
});

test("renders Sign in and Sign up buttons again on log out", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const signOutLink = await screen.findByRole("link", { name: "Sign out" });
  fireEvent.click(signOutLink);

  const signInLink = await screen.findByRole("link", { name: "Sign in" });
  const signUpLink = await screen.findByRole("link", { name: "Sign up" });

  expect(signInLink).toBeInTheDocument();
  expect(signUpLink).toBeInTheDocument();
});

test("renders to the user liked albums for logged in user", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const likedAlbums = await screen.findByText("Liked");
  expect(likedAlbums).toBeInTheDocument();
});

test("renders links to create album, about and contact", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const createAlbumLink = await screen.findByRole("link", { name: "Album" });
  const aboutLink = await screen.findByRole("link", { name: "About" });
  const contactLink = await screen.findByRole("link", { name: "Contact" });

  expect(createAlbumLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(contactLink).toBeInTheDocument();
});
