"use client";
import { signIn } from "@/lib/auth-client";

export default function () {
  const handleGithubLogin = async () => {
    const { data, error } = await signIn.social({
      provider: "github",
      callbackURL: "http://localhost:3000",
    });
    if (error) {
      console.log(error.message);
    } else {
      console.log(data);
    }
  };
  return (
    <>
      <button type="button" onClick={() => handleGithubLogin()}>
        GitHub 登录
      </button>
    </>
  );
}
