// app/routes/auth/logout.ts
import type { ActionFunctionArgs } from "@remix-run/node";

import { redirect } from "@remix-run/node";

import { destroySession, getSession } from "../../services/session.server";
import { getPublicEnv } from "../../public-env";

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  console.log(getPublicEnv("DOMAIN"));
  const logoutURL = new URL(`https://${getPublicEnv("DOMAIN")}/v2/logout`);

  logoutURL.searchParams.set("client_id", getPublicEnv("CLIENT_ID"));
  logoutURL.searchParams.set("returnTo", "http://localhost:3000");

  return redirect(logoutURL.toString(), {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
