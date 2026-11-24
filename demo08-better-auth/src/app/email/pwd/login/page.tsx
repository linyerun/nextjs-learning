"use client";
import { signIn } from "@/lib/auth-client";
import { useState } from "react";

export default function () {
  const [signEmail, setSignEmail] = useState("");
  const [signPassword, setSignPassword] = useState("");
  const handleSignIn = async () => {
    const { data, error } = await signIn.email({
      email: signEmail,
      password: signPassword,
      callbackURL: "http://localhost:3000",
    });
    if (error) {
      console.log(error.message);
    } else {
      console.log(data.user);
    }
  };

  return (
    <>
      <h1>登录</h1>
      <input
        value={signEmail}
        onChange={(e) => setSignEmail(e.target.value)}
        type="text"
        placeholder="Email"
      />
      <input
        value={signPassword}
        onChange={(e) => setSignPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <button type="button" onClick={() => handleSignIn()}>
        Sign In
      </button>
    </>
  );
}
