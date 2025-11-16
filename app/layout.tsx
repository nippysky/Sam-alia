// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Cinzel, Poppins } from "next/font/google";
import Script from "next/script";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sam’Alia — Where Heritage Meets Modernity",
    template: "%s | Sam’Alia",
  },
  description:
    "Sam’Alia is a living design house from Northern Nigeria, where heritage meets modernity across fashion, culture, and lifestyle. Each collection is a dialogue between past and future, Africa and the world.",
  keywords: [
    "Sam'Alia",
    "Sam Alia",
    "Northern Nigeria fashion",
    "African luxury brand",
    "heritage fashion",
    "African lifestyle brand",
    "contemporary African design",
    "cultural fashion",
    "modern African aesthetics",
  ],
  applicationName: "Sam’Alia",
  authors: [{ name: "Sam’Alia" }],
  creator: "Sam’Alia",
  publisher: "Sam’Alia",
  category: "fashion",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sam’Alia — Where Heritage Meets Modernity",
    description:
      "A living design house from Northern Nigeria, blending heritage and modernity across fashion, culture, and lifestyle.",
    url: "https://samalia.yourdomain", // TODO: replace with real domain
    siteName: "Sam’Alia",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://samalia.yourdomain/og-samalia.jpg", // TODO: replace with real OG image
        width: 1200,
        height: 630,
        alt: "Sam’Alia — Heritage meets modernity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sam’Alia — Where Heritage Meets Modernity",
    description:
      "A living design house from Northern Nigeria, where fashion, culture, and lifestyle meet in timeless, modern forms.",
    creator: "@samalia_handle", // TODO: replace or remove
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sam'Alia",
  description:
    "Sam’Alia is a living design house from Northern Nigeria, where heritage meets modernity across fashion, culture, and lifestyle.",
  url: "https://samalia.yourdomain", // TODO: replace
  logo: "https://samalia.yourdomain/og-samalia.jpg",
  foundingLocation: "Northern Nigeria",
  sameAs: [
    "https://www.instagram.com/samalia",
    "https://www.twitter.com/samalia",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        {/* Structured data for SEO */}
        <Script
          id="samalia-org-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(orgJsonLd)}
        </Script>

        <div className="flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
