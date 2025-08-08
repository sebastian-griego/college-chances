import { NextRequest, NextResponse } from 'next/server';

interface UserData {
  essayScore?: number;
  ecScore?: number;
  academicRigorScore?: number;
  lastUpdated?: string;
}

// In-memory storage for production (will be replaced with database later)
const userDataStore: { [userId: string]: UserData } = {};

// Enhanced calculation that includes AI scores
function calculateEnhancedChance(
  gpa: number,
  satScore: number,
  college: any,
  essayScore: number = 50,
  ecScore: number = 50,
  academicRigorScore: number = 50
): number {
  // Use the same base calculation as the main page
  const gpaPercentile = Math.min(100, Math.max(0, ((gpa - college.gpa25th) / (college.gpa75th - college.gpa25th)) * 100));
  const satPercentile = Math.min(100, Math.max(0, ((satScore - college.sat25th) / (college.sat75th - college.sat25th)) * 100));
  
  // Base weighted score (same as main page)
  const baseWeightedScore = (gpaPercentile * 0.6) + (satPercentile * 0.4);
  
  // Base admission rate adjustment (same as main page)
  const baseRate = college.admissionRate;
  
  // Calculate base chance (same as main page)
  const baseChance = Math.min(95, Math.max(1, 
    baseRate * (baseWeightedScore / 50) * 1.5
  ));
  
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
  
  // Calculate enhanced chance by applying AI multiplier to base chance
  const enhancedChance = Math.min(100, Math.max(1, 
    baseChance * aiMultiplier
  ));
  
  return Math.round(enhancedChance * 100) / 100;
}

export async function POST(request: NextRequest) {
  try {
    const { gpa, satScore, college, userId } = await request.json();
    
    if (!gpa || !satScore || !college || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Load user's AI scores from memory
    const userScores = userDataStore[userId] || {};
    const essayScore = userScores.essayScore || 50;
    const ecScore = userScores.ecScore || 50;
    const academicRigorScore = userScores.academicRigorScore || 50;
    
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
