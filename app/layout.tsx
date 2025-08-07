import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "College Admission Chances Calculator | Free & AI-Powered Analysis",
  description: "Calculate your admission chances at top colleges with our free calculator. Get AI-powered analysis of your essay, extracurriculars, and academic profile for more accurate predictions. Answer questions like 'What are my chances of getting into Stanford?' or 'How likely am I to get accepted to Harvard?' with our comprehensive admission probability calculator.",
  keywords: "college admission calculator, admission chances, college application, SAT scores, GPA calculator, college essay analysis, extracurricular evaluation, university admission odds, what are my chances of getting into, admission probability, college acceptance rate, university admission calculator, how likely am I to get accepted, college admission predictor",
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
    description: "Calculate your admission chances at top colleges with our free calculator. Get AI-powered analysis of your essay, extracurriculars, and academic profile for more accurate predictions. Answer questions like 'What are my chances of getting into Stanford?' or 'How likely am I to get accepted to Harvard?' with our comprehensive admission probability calculator.",
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
    description: "Calculate your admission chances at top colleges with our free calculator. Get AI-powered analysis of your essay, extracurriculars, and academic profile for more accurate predictions. Answer questions like 'What are my chances of getting into Stanford?' or 'How likely am I to get accepted to Harvard?' with our comprehensive admission probability calculator.",
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
              "description": "Calculate your admission chances at top colleges with our free calculator. Get AI-powered analysis of your essay, extracurriculars, and academic profile for more accurate predictions. Answer questions like 'What are my chances of getting into Stanford?' or 'How likely am I to get accepted to Harvard?' with our comprehensive admission probability calculator.",
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
              },
              "potentialAction": {
                "@type": "UseAction",
                "target": "https://college-chances.vercel.app",
                "description": "Calculate college admission chances"
              },
              "mainEntity": {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What are my chances of getting into Stanford?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Use our free college admission calculator to determine your chances at Stanford University. Enter your GPA, SAT/ACT scores, and get an accurate admission probability based on official Common Data Set statistics."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How likely am I to get accepted to Harvard?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Calculate your Harvard admission chances with our free tool. Input your academic credentials and receive a probability estimate based on Harvard's official admission data and acceptance rates."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What are my admission chances for MIT?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Find out your MIT admission probability using our calculator. Enter your GPA, test scores, and get an estimate based on MIT's official admission statistics and acceptance rates."
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
