import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface UserData {
  users: {
    [userId: string]: {
      essayScore?: number;
      ecScore?: number;
      academicRigorScore?: number;
      lastUpdated?: string;
    };
  };
}

// Simple AI scoring function (we'll replace this with actual AI API)
async function analyzeEssay(essay: string): Promise<number> {
  // For now, using a simple heuristic-based scoring
  // This will be replaced with actual AI API call
  
  let score = 50; // Base score
  
  // Length analysis
  const wordCount = essay.split(' ').length;
  if (wordCount >= 500 && wordCount <= 650) score += 10;
  else if (wordCount < 400) score -= 15;
  else if (wordCount > 700) score -= 10;
  
  // Personal story indicators
  const personalIndicators = ['I', 'me', 'my', 'we', 'our', 'family', 'experience', 'learned', 'realized'];
  const personalCount = personalIndicators.filter(word => 
    essay.toLowerCase().includes(word.toLowerCase())
  ).length;
  score += Math.min(personalCount * 3, 15);
  
  // Specificity indicators
  const specificWords = ['because', 'when', 'where', 'how', 'why', 'specifically', 'specifically'];
  const specificCount = specificWords.filter(word => 
    essay.toLowerCase().includes(word.toLowerCase())
  ).length;
  score += Math.min(specificCount * 2, 10);
  
  // Grammar and structure (simple check)
  const sentences = essay.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgSentenceLength = sentences.reduce((sum, sentence) => 
    sum + sentence.split(' ').length, 0) / sentences.length;
  
  if (avgSentenceLength >= 10 && avgSentenceLength <= 25) score += 5;
  else if (avgSentenceLength < 5) score -= 10;
  else if (avgSentenceLength > 30) score -= 5;
  
  return Math.max(0, Math.min(100, score));
}

async function analyzeExtracurriculars(activities: string[]): Promise<number> {
  let score = 50;
  
  // Number of activities
  if (activities.length >= 5 && activities.length <= 10) score += 10;
  else if (activities.length < 3) score -= 15;
  else if (activities.length > 15) score -= 5;
  
  // Leadership indicators
  const leadershipWords = ['president', 'captain', 'leader', 'founder', 'director', 'chair', 'coordinator'];
  const leadershipCount = activities.filter(activity => 
    leadershipWords.some(word => activity.toLowerCase().includes(word))
  ).length;
  score += Math.min(leadershipCount * 8, 20);
  
  // Commitment indicators (hours, years)
  const commitmentPatterns = [/\d+\s*hours?/, /\d+\s*years?/, /weekly/, /monthly/];
  const commitmentCount = activities.filter(activity => 
    commitmentPatterns.some(pattern => pattern.test(activity))
  ).length;
  score += Math.min(commitmentCount * 5, 15);
  
  return Math.max(0, Math.min(100, score));
}

async function calculateAcademicRigor(apScores: number[], ibScores: number[], honorsClasses: number): Promise<number> {
  let score = 50;
  
  // AP scores (1-5 scale)
  const avgAPScore = apScores.length > 0 ? apScores.reduce((sum, score) => sum + score, 0) / apScores.length : 0;
  if (avgAPScore >= 4.0) score += 20;
  else if (avgAPScore >= 3.0) score += 10;
  else if (avgAPScore < 2.0) score -= 10;
  
  // IB scores (1-7 scale)
  const avgIBScore = ibScores.length > 0 ? ibScores.reduce((sum, score) => sum + score, 0) / ibScores.length : 0;
  if (avgIBScore >= 6.0) score += 15;
  else if (avgIBScore >= 5.0) score += 8;
  else if (avgIBScore < 4.0) score -= 8;
  
  // Honors/AP classes taken
  if (honorsClasses >= 8) score += 15;
  else if (honorsClasses >= 5) score += 10;
  else if (honorsClasses >= 3) score += 5;
  else if (honorsClasses < 1) score -= 10;
  
  return Math.max(0, Math.min(100, score));
}

export async function POST(request: NextRequest) {
  try {
    const { userId, essay, extracurriculars, apScores, ibScores, honorsClasses } = await request.json();
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }
    
    // Analyze each component
    const essayScore = await analyzeEssay(essay || '');
    const ecScore = await analyzeExtracurriculars(extracurriculars || []);
    const academicRigorScore = await calculateAcademicRigor(apScores || [], ibScores || [], honorsClasses || 0);
    
    // Load existing user data
    const dataPath = path.join(process.cwd(), 'data', 'users.json');
    let userData: UserData = { users: {} };
    
    if (fs.existsSync(dataPath)) {
      const fileContent = fs.readFileSync(dataPath, 'utf-8');
      userData = JSON.parse(fileContent);
    }
    
    // Update user data
    userData.users[userId] = {
      essayScore,
      ecScore,
      academicRigorScore,
      lastUpdated: new Date().toISOString()
    };
    
    // Save updated data
    fs.writeFileSync(dataPath, JSON.stringify(userData, null, 2));
    
    return NextResponse.json({
      success: true,
      scores: {
        essayScore,
        ecScore,
        academicRigorScore
      }
    });
    
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}
