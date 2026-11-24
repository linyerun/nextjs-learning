"use client";
import { useSession } from "@/lib/auth-client";

export default function () {
  const session = useSession();
  return (
    <>
      <div>首页</div>
      <div>session: {JSON.stringify(session.data?.session)}</div>
      <hr />
      <div>user: {JSON.stringify(session.data?.user)}</div>
    </>
  );
}
