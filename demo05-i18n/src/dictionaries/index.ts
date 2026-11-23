export type Dictionary = {
  title: string;
  description: string;
  keywords: string;
};

export const locales = ["en", "zh", "ja", "ko"]; // 支持的语言

export const defaultLocale = "zh"; // 默认的语言

export async function getDictionary(locale: string): Promise<Dictionary> {
  return await import(`./${locale}.json`);
}
