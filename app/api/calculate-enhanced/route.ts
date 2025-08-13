import { NextRequest, NextResponse } from 'next/server';

interface UserData {
  essayScore?: number;
  ecScore?: number;
  academicRigorScore?: number;
  lastUpdated?: string;
}

// In-memory storage for production (will be replaced with database later)
const userDataStore: { [userId: string]: UserData } = {};

// Helper function to calculate dynamic GPA range based on average GPA and admission rate
// This matches the logic in the main page
const calculateGPARange = (avgGPA: number, admissionRate: number) => {
  // Determine base spread based on admission rate tiers
  let baseSpread: number;
  if (admissionRate < 10) {
    baseSpread = 0.20; // Top-tier schools
  } else if (admissionRate < 25) {
    baseSpread = 0.30; // Upper-tier schools
  } else if (admissionRate < 50) {
    baseSpread = 0.40; // Mid-tier schools
  } else {
    baseSpread = 0.50; // General-tier schools
  }
  
  // Calculate the distance from average GPA to 4.0
  const distanceToMax = 4.0 - avgGPA;
  
  // Use the minimum of the tiered spread and twice the distance to 4.0
  // This ensures we don't exceed 4.0 and gives realistic ranges for high-average schools
  const effectiveSpread = Math.min(baseSpread, distanceToMax * 2);
  
  // Calculate 25th and 75th percentiles
  const gpa75th = avgGPA + (effectiveSpread / 2);
  const gpa25th = avgGPA - (effectiveSpread / 2);
  
  return { gpa25th, gpa75th };
};

// Enhanced calculation that includes AI scores
function calculateEnhancedChance(
  gpa: number,
  satScore: number,
  college: any,
  essayScore: number = 50,
  ecScore: number = 50,
  academicRigorScore: number = 50
): number {
  // Calculate dynamic GPA range (same as main page)
  const { gpa25th, gpa75th } = calculateGPARange(college.avgGPA, college.admissionRate);
  
  // Use the same base calculation as the main page
  const gpaPercentile = Math.min(100, Math.max(0, ((gpa - gpa25th) / (gpa75th - gpa25th)) * 100));
  const satPercentile = Math.min(100, Math.max(0, ((satScore - college.sat25th) / (college.sat75th - college.sat25th)) * 100));
  
  // Base weighted score (same as main page)
  const baseWeightedScore = (gpaPercentile * 0.6) + (satPercentile * 0.4);
  
  // Enhanced weighted score with AI components
  const enhancedWeightedScore = (
    (gpaPercentile * 0.25) +           // GPA: 25%
    (satPercentile * 0.20) +           // SAT: 20%
    (essayScore * 0.25) +              // Essay: 25%
    (ecScore * 0.20) +                 // Extracurriculars: 20%
    (academicRigorScore * 0.10)        // Academic Rigor: 10%
  );
  
  // Base admission rate adjustment (same as main page)
  const baseRate = college.admissionRate;
  
  // Calculate AI bonus multiplier based on average AI score
  const avgAIScore = (essayScore + ecScore + academicRigorScore) / 3;
  let aiMultiplier = 1.0;
  
  if (avgAIScore >= 95) {
    aiMultiplier = 3.5; // Exceptional candidates
  } else if (avgAIScore >= 90) {
    aiMultiplier = 3.0; // Outstanding candidates
  } else if (avgAIScore >= 85) {
    aiMultiplier = 2.5; // Excellent candidates
  } else if (avgAIScore >= 80) {
    aiMultiplier = 2.0; // Very good candidates
  } else if (avgAIScore >= 75) {
    aiMultiplier = 1.5; // Good candidates
  } else if (avgAIScore >= 70) {
    aiMultiplier = 1.2; // Average candidates
  } else if (avgAIScore >= 60) {
    aiMultiplier = 0.9; // Below average candidates
  } else {
    aiMultiplier = 0.7; // Poor candidates
  }
  
  // Calculate enhanced chance using enhanced weighted score with AI multiplier
  const enhancedChance = Math.min(100, Math.max(1, 
    baseRate * (enhancedWeightedScore / 50) * 1.5 * aiMultiplier
  ));
  
  // Debug logging
  console.log('Enhanced calculation debug:', {
    gpaPercentile,
    satPercentile,
    essayScore,
    ecScore,
    academicRigorScore,
    enhancedWeightedScore,
    avgAIScore,
    aiMultiplier,
    baseRate,
    enhancedChance
  });
  
  return Math.round(enhancedChance * 100) / 100;
}

export async function POST(request: NextRequest) {
  try {
    const { gpa, satScore, college, userId, aiScores } = await request.json();
    
    if (!gpa || !satScore || !college || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Use AI scores from request or fallback to memory store
    const essayScore = aiScores?.essayScore || userDataStore[userId]?.essayScore || 50;
    const ecScore = aiScores?.ecScore || userDataStore[userId]?.ecScore || 50;
    const academicRigorScore = aiScores?.academicRigorScore || userDataStore[userId]?.academicRigorScore || 50;
    
    // Calculate enhanced chance
    const enhancedChance = calculateEnhancedChance(
      parseFloat(gpa),
      parseInt(satScore),
      college,
      essayScore,
      ecScore,
      academicRigorScore
    );
    
    return NextResponse.json({
      success: true,
      enhancedChance,
      scores: {
        essayScore,
        ecScore,
        academicRigorScore
      }
    });
    
  } catch (error) {
    console.error('Enhanced calculation error:', error);
    return NextResponse.json({ error: 'Calculation failed' }, { status: 500 });
  }
}
