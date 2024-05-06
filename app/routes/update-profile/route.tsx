import { ActionFunctionArgs, json } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";

export default function UpdateProfile() {
  return (
    <div>
      <h1>Update Profile</h1>
      <form method="post">
        <label>
          First Name
          <input name="firstName" type="text" />
        </label>
        <label>
          Last Name
          <input name="lastName" type="text" />
        </label>
        <button type="submit">Complete Profile</button>
      </form>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  console.log("action");
  const token = await authenticator.isAuthenticated(request);
  const formData = await request.formData();

  await fetch("http://localhost:4000/dev/auth/update-profile", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
    }),
  });

  return json({ ok: true });
}
