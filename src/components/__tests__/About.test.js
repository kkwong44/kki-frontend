// 
// Tests on About Page
// 
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import AboutPage from "../../pages/abouts/AboutPage";

test("renders About", async () => {
  render(
    <Router>
      <AboutPage />
    </Router>
  );

  const title = await screen.findByText("About KK Images");
  expect(title).toBeInTheDocument();
});
