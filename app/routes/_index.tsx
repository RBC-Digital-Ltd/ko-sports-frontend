import { json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  return json({ KO_VERSION: process.env.KO_VERSION });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <div className="px-3">
        <h1 className="prose-2xl">Welcome to Remix</h1>
        <p>
          KO Sports Version: <strong>{data.KO_VERSION}</strong>
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
            <Link to="/auth/logout">
              <button>Log out</button>
            </Link>
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
