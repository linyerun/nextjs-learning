import { redirect } from "next/navigation";

export default function () {
  redirect("/routers/about/temporary"); // 临时重定向, 状态码307
}
