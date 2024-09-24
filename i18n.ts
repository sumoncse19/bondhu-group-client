import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

import { locales } from "./services/config";
import { getUserLocale } from "./services/locale";

export default getRequestConfig(async () => {
  const locale = await getUserLocale();
  if (!locales.includes(locale as any)) notFound();
  return {
    locale,
    messages: (await import(`./src/locales/${locale}.json`)).default,
  };
});
