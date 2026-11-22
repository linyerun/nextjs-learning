"use client";
import { useSearchParams } from "next/navigation";

export default function () {
  const queryParams = useSearchParams();
  return (
    <>
      <h1>Home</h1>
      <div>
        <p>name:{queryParams.get("name")}</p>
        <p>age: {queryParams.get("age")}</p>
      </div>
    </>
  );
}
