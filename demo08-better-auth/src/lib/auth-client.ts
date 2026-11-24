import { createAuthClient } from "better-auth/react";

export const baseURL = process.env.BETTER_AUTH_URL;

const authClient = createAuthClient({
  baseURL: baseURL,
});

export const { signIn, signUp, signOut, useSession } = authClient;
