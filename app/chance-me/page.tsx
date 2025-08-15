import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Chance Me | Free College Admission Calculator - What Are My Chances?',
  description: 'Free chance me calculator for college admissions. Calculate your chances of getting accepted to Harvard, Stanford, MIT, Yale, and 40+ top universities. Enter your GPA, SAT/ACT scores for instant results.',
  keywords: 'chance me, chance me calculator, what are my chances, college chance me, chance me for college, admission chances, college admission calculator, university chances',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/chance-me',
  }
};

export default function ChanceMe() {
  // Redirect to homepage since the calculator is there
  redirect('/');
}