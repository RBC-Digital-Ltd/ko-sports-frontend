// app/routes/auth/auth0.tsx
import { ActionFunctionArgs, redirect } from "@remix-run/node";

import { authenticator } from "../../utils/auth.server";

export const loader = () => redirect("/login");

export const action = ({ request }: ActionFunctionArgs) => {
  return authenticator.authenticate("auth0", request);
};
