import { json, LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import Navigation from "~/components/Navigation";
import { authenticator } from "~/utils/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request);
  return json({ KO_VERSION: process.env.KO_VERSION, user });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <Navigation user={data.user} />
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
