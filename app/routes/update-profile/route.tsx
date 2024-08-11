import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";

import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { authenticator } from "~/utils/auth.server";

export default function UpdateProfile() {
  const data = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      firstName: data.first_name,
      lastName: data.last_name,
    },
    validate: {
      firstName: (value) =>
        value.length < 2 ? "First Name must have at least 2 letters" : null,
    },
  });
  return (
    <Form
      onSubmit={form.onSubmit((_v, e) => submit(e!.currentTarget))}
      method="post"
    >
      <TextInput
        withAsterisk
        label="First Name"
        key={form.key("firstName")}
        autoComplete="given-name"
        name="firstName"
        {...form.getInputProps("firstName")}
      />
      <TextInput
        withAsterisk
        label="Last Name"
        key={form.key("lastName")}
        autoComplete="family-name"
        name="lastName"
        {...form.getInputProps("lastName")}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </Form>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { accessToken } = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const profileRequest = await fetch(
    `${process.env.API_BASE_URL}/auth/check-profile`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );

  const data = await profileRequest.json();

  return json(data);
}

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.formData();
  const updates = Object.fromEntries(data);
  const user = await authenticator.isAuthenticated(request);

  console.log(data);
  console.log(updates);

  const updateRequest = await fetch(
    `${process.env.API_BASE_URL}/auth/update-profile`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      body: JSON.stringify(updates),
    },
  );

  const json = await updateRequest.json();
  console.log(json);

  return redirect("/");
}
