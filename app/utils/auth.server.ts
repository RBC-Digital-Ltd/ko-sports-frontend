// app/utils/auth.server.ts
import { Authenticator } from "remix-auth";
import { Auth0Strategy } from "remix-auth-auth0";
import { getPublicEnv } from "../public-env";
import { sessionStorage } from "../services/session.server";

// Create an instance of the authenticator, pass a generic with what your
// strategies will return and will be stored in the session
export const authenticator = new Authenticator<string>(sessionStorage);

const auth0Strategy = new Auth0Strategy(
  {
    callbackURL: "http://localhost:3000/auth/callback",
    clientID: getPublicEnv("CLIENT_ID"),
    clientSecret: getPublicEnv("CLIENT_SECRET"),
    domain: getPublicEnv("DOMAIN"),
  },
  async ({ accessToken }) => {
    // Get the user data from your DB or API using the tokens and profile
    return accessToken;
  },
);

authenticator.use(auth0Strategy);
