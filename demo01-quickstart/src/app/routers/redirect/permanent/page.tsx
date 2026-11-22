import { permanentRedirect } from "next/navigation";

export default function () {
  permanentRedirect("/routers/about/temporary"); // 永久重定向, 状态码308
}
