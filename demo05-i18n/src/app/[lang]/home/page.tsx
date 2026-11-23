import { Suspense } from "react";
import { getDictionary } from "@dict/index";
import SwitchI18n from "./switchI18n";

/*
// 修复error的方式一, 搞成静态组件, 所以要预先告知已有的path类型，静态导出SSG就会用到这种方式
import { locales } from "@dict/index";
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
*/

// 修复error的方式二, 改成动态组件, 然后使用Suspense标签包住这个组件或者加loading.tsx
async function HomeContent({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  return (
    <>
      <SwitchI18n lang={lang} />
      <h1 className="text-2xl font-bold text-center">{dictionary.title}</h1>
      <p className="text-gray-500 text-center">{dictionary.description}</p>
      <p className="text-gray-500">{dictionary.keywords}</p>
    </>
  );
}

export default function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return (
    <div className="p-4 flex flex-col items-center justify-center border-2 border-gray-300 rounded-md">
      <Suspense fallback={<p className="text-gray-400">Loading...</p>}>
        <HomeContent params={params} />
      </Suspense>
    </div>
  );
}
