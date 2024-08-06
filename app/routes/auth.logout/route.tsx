// app/routes/auth/logout.ts
import type { LoaderFunctionArgs } from "@remix-run/node";

import { redirect } from "@remix-run/node";

import { destroySession, getSession } from "../../services/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const logoutURL = new URL(`https://${process.env.DOMAIN}/v2/logout`);

  logoutURL.searchParams.set("client_id", process.env.CLIENT_ID || "");
  logoutURL.searchParams.set("returnTo", "http://localhost:3000");

  return redirect(logoutURL.toString(), {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
