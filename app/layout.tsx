import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Chance Me Calculator | Free College Admission Chances Calculator",
  description: "Free chance me calculator for college admissions. Calculate your chances of getting into Harvard, Stanford, MIT, and 40+ top universities. Get AI-powered analysis of your GPA, SAT/ACT scores, essays, and extracurriculars. Answer 'What are my chances?' with our accurate admission probability calculator.",
  keywords: "chance me calculator, chance me, college chances calculator, admission chances calculator, what are my chances of getting into college, college admission calculator, admission probability calculator, college acceptance calculator, chance me for college, university chances calculator, college admission predictor, chance calculator college, admission odds calculator",
  authors: [{ name: "College Chances Calculator" }],
  creator: "College Chances Calculator",
  publisher: "College Chances Calculator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://admissionchances.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Chance Me Calculator | Free College Admission Chances Calculator",
    description: "Free chance me calculator for college admissions. Calculate your chances of getting into Harvard, Stanford, MIT, and 40+ top universities. Get AI-powered analysis of your GPA, SAT/ACT scores, essays, and extracurriculars.",
    url: 'https://admissionchances.com',
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
    title: "Chance Me Calculator | Free College Admission Chances Calculator",
    description: "Free chance me calculator for college admissions. Calculate your chances of getting into Harvard, Stanford, MIT, and 40+ top universities. Get AI-powered analysis of your GPA, SAT/ACT scores, essays, and extracurriculars.",
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
              "name": "Chance Me Calculator - Free College Admission Chances Calculator",
              "alternateName": ["Chance Me Calculator", "College Chances Calculator", "Admission Probability Calculator"],
              "description": "Free chance me calculator for college admissions. Calculate your chances of getting into Harvard, Stanford, MIT, and 40+ top universities. Get AI-powered analysis of your GPA, SAT/ACT scores, essays, and extracurriculars. Answer 'What are my chances of getting into college?' with our accurate admission probability calculator.",
              "url": "https://admissionchances.com",
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
              "keywords": "chance me calculator, chance me, college chances calculator, admission chances calculator, what are my chances of getting into college, college admission calculator, admission probability calculator, college acceptance calculator, chance me for college, university chances calculator, college admission predictor, chance calculator college, admission odds calculator, college chance calculator",
              "category": "Education",
              "potentialAction": {
                "@type": "UseAction",
                "target": "https://admissionchances.com",
                "description": "Calculate college admission chances"
              },
              "mainEntity": {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What is a chance me calculator?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "A chance me calculator is a tool that estimates your probability of getting accepted to colleges based on your GPA, SAT/ACT scores, extracurriculars, and essays. Our free calculator uses official admission data from 40+ top universities."
                    }
                  },
                  {
                    "@type": "Question", 
                    "name": "How accurate is the chance me calculator?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Our chance me calculator uses official Common Data Set statistics and historical admission data for accurate probability estimates. However, actual admission decisions depend on many factors including essays, recommendations, and institutional priorities."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What are my chances of getting into Harvard?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Calculate your Harvard admission chances with our free chance me calculator. Enter your GPA, SAT/ACT scores, and get a probability estimate based on Harvard's official admission statistics and acceptance rates."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Can I calculate my chances for multiple colleges?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes! Our chance me calculator includes 40+ top universities including Harvard, Stanford, MIT, Yale, Princeton, and more. Calculate your admission chances for all your target schools."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What factors does the chance me calculator consider?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Our calculator considers GPA, SAT/ACT scores, and with premium features: essay quality, extracurricular activities, academic rigor (AP/IB), and leadership experience for more accurate predictions."
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
