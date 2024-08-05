import { type MetaFunction } from "@remix-run/node";
import { getPublicEnv } from "../public-env";
import { Form } from "@remix-run/react";
import Navigation from "~/components/Navigation";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <Navigation />
      <div className="px-3">
        <h1 className="prose-2xl">Welcome to Remix</h1>
        <p>
          KO Sports Version: <strong>{getPublicEnv("KO_VERSION")}</strong>
        </p>
        <button
          type="button"
          onClick={() => {
            throw new Error("Sentry Frontend Error");
          }}
        >
          Throw error
        </button>
        <ul>
          <li>Log In</li>
          <li>
            <Form action="/auth/logout" method="post">
              <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm">
                Logout
              </button>
            </Form>
          </li>
          <li>
            <a
              target="_blank"
              href="https://remix.run/tutorials/blog"
              rel="noreferrer"
            >
              15m Quickstart Blog Tutorial
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://remix.run/tutorials/jokes"
              rel="noreferrer"
            >
              Deep Dive Jokes App Tutorial
            </a>
          </li>
          <li>
            <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
              Remix Docs
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
