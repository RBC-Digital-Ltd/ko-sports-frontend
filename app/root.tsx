// Sentry provides a type for Remix v2 MetaFunction parameters
// so you can access `data.sentryTrace` and `data.sentryBaggage` alongside other data from loader.
import { captureRemixErrorBoundaryError, withSentry } from "@sentry/remix";

import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  useRouteLoaderData,
} from "@remix-run/react";
import styles from "./tailwind.css?url";
import { authenticator } from "./utils/auth.server";
import Navigation from "./components/Navigation";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const ErrorBoundary = () => {
  const error = useRouteError();
  captureRemixErrorBoundaryError(error);
  return <div>Something went wrong</div>;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);
  return json({ user });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData<typeof loader>("root");
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Navigation user={data ? data.user : null} />
        {/* children will be the root Component, ErrorBoundary, or HydrateFallback */}
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">{children}</div>

        <Scripts />
        <ScrollRestoration />
      </body>
    </html>
  );
}

function App() {
  return <Outlet />;
}

export default withSentry(App);
