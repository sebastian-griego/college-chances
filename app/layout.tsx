import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "College Admission Chances Calculator | Free & AI-Powered Analysis",
  description: "Calculate your admission chances at top colleges with our free calculator. Get AI-powered analysis of your essay, extracurriculars, and academic profile for more accurate predictions.",
  keywords: "college admission calculator, admission chances, college application, SAT scores, GPA calculator, college essay analysis, extracurricular evaluation, university admission odds",
  authors: [{ name: "College Chances Calculator" }],
  creator: "College Chances Calculator",
  publisher: "College Chances Calculator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://college-chances.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "College Admission Chances Calculator | Free & AI-Powered Analysis",
    description: "Calculate your admission chances at top colleges with our free calculator. Get AI-powered analysis of your essay, extracurriculars, and academic profile for more accurate predictions.",
    url: 'https://college-chances.vercel.app',
    siteName: 'College Chances Calculator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'College Admission Chances Calculator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "College Admission Chances Calculator | Free & AI-Powered Analysis",
    description: "Calculate your admission chances at top colleges with our free calculator. Get AI-powered analysis of your essay, extracurriculars, and academic profile for more accurate predictions.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "College Admission Chances Calculator",
              "description": "Calculate your admission chances at top colleges with our free calculator. Get AI-powered analysis of your essay, extracurriculars, and academic profile for more accurate predictions.",
              "url": "https://college-chances.vercel.app",
              "applicationCategory": "EducationalApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "description": "Free basic admission calculator"
              },
              "author": {
                "@type": "Organization",
                "name": "College Chances Calculator"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "150"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
