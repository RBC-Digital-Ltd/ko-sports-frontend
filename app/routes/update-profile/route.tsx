import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/utils/auth.server";

export default function UpdateProfile() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Update Profile</h1>
      <Form method="post">
        <label>
          First Name
          <input name="firstName" type="text" defaultValue={data.first_name} />
        </label>
        <label>
          Last Name
          <input name="lastName" type="text" defaultValue={data.last_name} />
        </label>
        <button type="submit">Complete Profile</button>
      </Form>
    </div>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { accessToken } = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const profileRequest = await fetch(
    `http://${process.env.API_BASE_URL}/auth/check-profile`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );

  const data = await profileRequest.json();

  return json(data);
}

export async function action({ request }: ActionFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  await fetch(`http://${process.env.API_BASE_URL}/auth/update-profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
    body: JSON.stringify(updates),
  });

  return redirect("/");
}
