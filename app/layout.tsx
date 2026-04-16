import type { Metadata } from "next";
import { DM_Sans, Noto_Sans_Myanmar, Playfair_Display } from "next/font/google";
import { cookies } from "next/headers";
import { LocaleProvider } from "@/lib/LocaleProvider";
import type { Locale } from "@/lib/useTranslation";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const notoSansMyanmar = Noto_Sans_Myanmar({
  subsets: ["myanmar"],
  weight: ["400", "700"],
  variable: "--font-myanmar",
});

export const metadata: Metadata = {
  title: "Rakhine Water Festival - Des Moines",
  description:
    "Celebrate Thingyan, the Burmese New Year water festival, with the Rakhine community of Des Moines, Iowa.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("NEXT_LOCALE")?.value ?? "en") as Locale;

  return (
    <html
      lang={locale}
      className={`${dmSans.variable} ${playfair.variable} ${notoSansMyanmar.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
