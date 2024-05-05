import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";

export const loader = async (args: LoaderFunctionArgs) => {
  const token = await authenticator.isAuthenticated(args.request);
  const request = await fetch("http://localhost:4000/dev/auth/check-profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

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
