import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

/**
 * 从下面例子来看，平行组件也逃不过要被template组件包住的命运
 * */

export default function ({ children }: Props) {
  return (
    <>
      <h1>---</h1>
      {children}
      <h1>---</h1>
    </>
  );
}
