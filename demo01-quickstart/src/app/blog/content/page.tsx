"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function () {
  useEffect(() => {
    console.log("content-page被挂载");
    return () => {
      console.log("content-page被卸载");
    };
  }, []);
  return (
    <>
      <h1>Blog Page Content</h1>
      <Link href={"/blog/users"}>ToUsers</Link>
      <Link href={"/blog"}>ToPage</Link>
    </>
  );
}
