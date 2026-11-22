/*
当我们使用硬导航浏览器页面刷新,此时layout.tsx的@footer 和 children 已经失活，
因为它的底层原理其实是同时匹配@header@footer，children 目录下面的setting 页面，
但是只有@header有这个页面，其他两个没有，所以导致404。

解决方案：使用default.tsx来进行兜底，确保不会404。在@footer、parallel目录下加default.tsx
* */

export default function () {
  return <>Setting</>;
}
