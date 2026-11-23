"use client";
import { locales } from "@dict/index";
import { usePathname, useRouter } from "next/navigation";

export default function SwitchI18n({ lang }: { lang: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    router.replace(newPath);
  };
  return (
    <div className="mb-4 flex items-center space-x-2">
      <label htmlFor="i18n-switch" className="text-gray-600 font-medium">
        🌐 语言:
      </label>
      <select
        id="i18n-switch"
        value={lang}
        onChange={handleChange}
        className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white text-gray-800 hover:border-blue-400 transition-all duration-150"
      >
        {locales.map((locale) => (
          <option key={locale} value={locale} className="text-base">
            {locale === "zh"
              ? "中文"
              : locale === "en"
                ? "English"
                : locale === "ja"
                  ? "日本語"
                  : locale === "ko"
                    ? "한국어"
                    : locale}
          </option>
        ))}
      </select>
    </div>
  );
}
