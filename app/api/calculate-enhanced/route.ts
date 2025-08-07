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
  
  // Calculate base chance (same as main page)
  const baseChance = Math.min(95, Math.max(1, 
    baseRate * (baseWeightedScore / 50) * 1.5
  ));
  
  // Calculate enhanced chance using enhanced weighted score
  const enhancedChance = Math.min(100, Math.max(1, 
    baseRate * (enhancedWeightedScore / 50) * 1.5
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
