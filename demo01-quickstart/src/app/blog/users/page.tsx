"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function () {
  useEffect(() => {
    console.log("content-page被挂载");
    return () => {
      console.log("content-page被卸载");
    };
  }, []);
  return (
    <>
      <h1>Blog Page Users</h1>
      <Link href={"/blog/content"}>ToContent</Link>
      <Link href={"/blog"}>ToPage</Link>
    </>
  );
}
