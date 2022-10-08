//
// Tests on Album component
//
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import Album from "../../pages/albums/Album";

test("renders Album", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <Album />
      </CurrentUserProvider>
    </Router>
  );

  const lastUpdate = await screen.findByText("Last updated");
  const skill = await screen.findByText("Photos taken by Photographer");

  expect(lastUpdate).toBeInTheDocument();
  expect(skill).toBeInTheDocument();
});
