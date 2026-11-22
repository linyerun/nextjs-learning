"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function () {
  useEffect(() => {
    console.log("default-page被挂载");
    return () => {
      console.log("default-page被卸载");
    };
  });
  return (
    <>
      <h1>Blog Page Default</h1>
      <Link href={"/blog/content"}>ToContent</Link>
      <Link href={"/blog/users"}>ToUsers</Link>
    </>
  );
}
