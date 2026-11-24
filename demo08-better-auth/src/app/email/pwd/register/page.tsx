"use client";
import { signUp } from "@/lib/auth-client";
import { useState } from "react";

export default function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const handleSignUp = async () => {
    const { data, error } = await signUp.email({
      email,
      password,
      name,
    });
    if (error) {
      console.log(error.message);
    } else {
      console.log(data);
    }
  };
  return (
    <>
      <h1>注册</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="button" onClick={() => handleSignUp()}>
        Sign Up
      </button>
    </>
  );
}
