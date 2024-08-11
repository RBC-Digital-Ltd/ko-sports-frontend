import { act, render, screen, waitFor } from "~/test-utils";
import Navigation from ".";
import { expect, test } from "vitest";

import { createRemixStub } from "@remix-run/testing";
import { json } from "@remix-run/react";

const LoggedOutRemixStub = createRemixStub([
  {
    path: "/",
    Component: () => <Navigation user={null} />,
    loader() {
      return json({ user: null });
    },
  },
]);

const LoggedInRemixStub = createRemixStub([
  {
    path: "/",
    Component: () => (
      <Navigation
        user={{
          accessToken: "accessToken",
          profile: {
            emails: [{ value: "test@test.com" }],
            displayName: "test@test.com",
            photos: [{ value: "test.jpg" }],
            provider: "auth0",
          },
        }}
      />
    ),
  },
]);

test("renders when logged out", async () => {
  render(<LoggedOutRemixStub />);
  await waitFor(() => screen.findByText("KO Sports"));
  expect(screen.getByText("KO Sports")).toBeInTheDocument();
  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Home")).toHaveAttribute("href", "/");
  expect(screen.getByText("Log in")).toBeInTheDocument();
  expect(screen.getByText("Sign up")).toBeInTheDocument();
  expect(screen.queryByText("test@test.com")).not.toBeInTheDocument();
});

test("renders when logged in", async () => {
  render(<LoggedInRemixStub />);
  await waitFor(() => screen.findByText("KO Sports"));
  expect(screen.getByText("KO Sports")).toBeInTheDocument();
  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Home")).toHaveAttribute("href", "/");
  expect(screen.getByText("test@test.com")).toBeInTheDocument();
  expect(screen.queryByText("Log in")).not.toBeInTheDocument();
  expect(screen.queryByText("Sign up")).not.toBeInTheDocument();
});

test("renders when logged in and user menu is opened", async () => {
  render(<LoggedInRemixStub />);
  await waitFor(() => screen.findByText("KO Sports"));
  expect(screen.getByText("KO Sports")).toBeInTheDocument();
  expect(screen.getByText("test@test.com")).toBeInTheDocument();
  await act(async () => {
    screen.getByTestId("MenuOpen").click();
  });
  await waitFor(() => screen.findByText("Your Profile"));
  expect(screen.getByText("Your Profile")).toBeInTheDocument();
  expect(screen.getByText("Log out")).toBeInTheDocument();
});
