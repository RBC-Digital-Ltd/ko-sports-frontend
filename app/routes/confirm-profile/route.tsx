import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";

export const loader = async (args: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(args.request);
  const request = await fetch(
    `http://${process.env.API_BASE_URL}/auth/check-profile`,
    {
      headers: { Authorization: `Bearer ${user?.accessToken}` },
    },
  );

  if (request.status === 404) {
    return redirect("/update-profile");
  }

  const data = await request.json();
  console.log(data);

  if (data.profile_complete) {
    return redirect("/");
  }

  return redirect("/update-profile");
};
