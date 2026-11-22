"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function () {
  const router = useRouter();
  return (
    <>
      <Link
        href={"/routers/about/xxx/yyy/zzz"}
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        ToAbout
      </Link>
      <button
        onClick={() => router.push("/routers/home?name=lyr&age=25")}
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        ToHome
      </button>
      <Link
        href="/routers/redirect/temporary"
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        ToRedirectTemporary
      </Link>
      <Link
        href="/routers/redirect/permanent"
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        ToRedirectPermanent
      </Link>
    </>
  );
}
