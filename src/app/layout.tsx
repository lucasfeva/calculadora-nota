import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Poppins } from "next/font/google";
import "katex/dist/katex.min.css";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Calcular Nota",
  description: "Calculadora de Nota Final",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.className} antialiased`}>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-N3XMG4JXTD"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-N3XMG4JXTD');
            `,
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
