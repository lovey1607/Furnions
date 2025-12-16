import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import AnimationsProvider from "@/components/providers/AnimationsProvider";
import { Montserrat, Open_Sans } from "next/font/google";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-heading',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: "Furnions | Quiet Luxury Furniture",
  description: "Discover timeless furniture crafted with care for those who appreciate the art of understated luxury. Experience the perfect blend of comfort and sophistication.",
  keywords: "furniture, luxury, home decor, chairs, tables, sofas, Furnions",
  authors: [{ name: "Furnions Design Team" }],
  openGraph: {
    title: "Furnions | Quiet Luxury Furniture",
    description: "Discover timeless furniture crafted with care for those who appreciate the art of understated luxury.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script
              id="google-analytics-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
        
        <AnimationsProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </AnimationsProvider>
        
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="bece3f14-8521-47c6-be0c-3af9502d9188"
        />
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "Furnions", "version": "2.0.0", "greeting": "Welcome"}'
        />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}