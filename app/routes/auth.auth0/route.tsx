// app/routes/auth/auth0.tsx
import { LoaderFunctionArgs } from "@remix-run/node";

import { authenticator } from "../../utils/auth.server";

export const loader = ({ request }: LoaderFunctionArgs) => {
  return authenticator.authenticate("auth0", request);
};
