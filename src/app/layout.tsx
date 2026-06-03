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
  metadataBase: new URL("https://calcularnota.com.br"),
  title: "Calcular Nota",
  description:
    "Descubra quanto você precisa tirar na A2 para passar na disciplina. Calcule sua nota final de forma rápida e simples.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Calcular Nota",
    description:
      "Descubra quanto você precisa tirar na A2 para passar na disciplina. Calcule sua nota final de forma rápida e simples.",
    url: "https://calcularnota.com.br",
    siteName: "Calcular Nota",
    images: [
      {
        url: "/og-image.png?v=2",
        width: 1200,
        height: 630,
        alt: "Calcular Nota",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calcular Nota",
    description:
      "Descubra quanto você precisa tirar na A2 para passar na disciplina. Calcule sua nota final de forma rápida e simples.",
    images: ["/og-image.png?v=2"],
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
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
