// app/utils/auth.server.ts
import { Authenticator } from "remix-auth";
import { Auth0Strategy } from "remix-auth-auth0";
import { sessionStorage } from "../services/session.server";

// Create an instance of the authenticator, pass a generic with what your
// strategies will return and will be stored in the session
export const authenticator = new Authenticator<string>(sessionStorage);

const auth0Strategy = new Auth0Strategy(
  {
    callbackURL: "http://localhost:3000/auth/callback",
    clientID: process.env.CLIENT_ID || "",
    clientSecret: process.env.CLIENT_SECRET || "",
    domain: process.env.DOMAIN || "",
    audience: process.env.AUDIENCE,
  },
  async ({ accessToken, profile }) => {
    // Confirm if we have a user, if not, create one.
    const checkProfileRequest = await fetch(
      "http://localhost:4000/dev/auth/check-profile",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    if (checkProfileRequest.status === 404) {
      await fetch("http://localhost:4000/dev/auth/create-profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          email: profile.emails![0].value,
        }),
      });
    }

    return accessToken;
  },
);

authenticator.use(auth0Strategy);
