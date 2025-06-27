// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders homepage text", () => {
  render(<App />);
  const titleElement = screen.getByText("/Welcome to Zieers Business Proposal/i");
  expect(titleElement).toBeInTheDocument();
});