import { ReactNode } from "react";
import Link from "next/link";

interface Props {
  header: ReactNode;
  children: ReactNode;
  footer: ReactNode;
}

/**
 * 只能在layout组件中引入平行路由组件进行渲染
 * */

export default function ({ header, children, footer }: Props) {
  return (
    <>
      {header}
      {children}
      {footer}
      <Link className="text-blue-500 block" href="/parallel/setting">
        Setting
      </Link>
    </>
  );
}
