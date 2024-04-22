// app/routes/auth/auth0/callback.tsx
import type { LoaderFunctionArgs } from "@remix-run/node";

import { authenticator } from "../../utils/auth.server";

export const loader = ({ request }: LoaderFunctionArgs) => {
  return authenticator.authenticate("auth0", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
};