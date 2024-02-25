import { captureRemixErrorBoundaryError } from "@sentry/remix";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import styles from "./tailwind.css";
import { PublicEnv, getPublicEnv } from "./public-env";
import { getPublicKeys } from "./environment.server";
import { Auth0Provider } from "@auth0/auth0-react";

export const links: LinksFunction = () => [
  ...(cssBundleHref
    ? [
        { rel: "stylesheet", href: cssBundleHref },
        { rel: "stylesheet", href: styles },
      ]
    : [{ rel: "stylesheet", href: styles }]),
];

export const ErrorBoundary = () => {
  const error = useRouteError();
  captureRemixErrorBoundaryError(error);
  return <div>Something went wrong</div>;
};

export function loader() {
  return json(getPublicKeys());
}

function Application() {
  const { publicKeys } = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <PublicEnv {...publicKeys} />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Auth0Provider
      domain={getPublicEnv("DOMAIN")}
      clientId={getPublicEnv("CLIENT_ID")}
    >
      <Application />
    </Auth0Provider>
  );
}
