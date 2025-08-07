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

// Kimi K2 AI analysis function
async function analyzeEssayWithAI(essay: string): Promise<{ score: number; feedback: string }> {
  const systemPrompt = `You are an expert college admissions evaluator with 20+ years of experience. Your job is to critically and objectively assess college application essays.

CRITICAL EVALUATION CRITERIA:
- Be extremely critical and honest. Only truly exceptional essays should score above 85.
- Average essays should score 50-70. Below average essays should score 30-50.
- Evaluate on: authenticity, uniqueness, personal growth, writing quality, and impact
- Avoid being sycophantic or overly positive. Be realistic and objective.
- Consider: Is this essay memorable? Does it show genuine character? Is it generic?

SCORING GUIDELINES:
90-100: Exceptional, memorable, truly unique perspective
80-89: Very strong, stands out significantly
70-79: Good quality, some strengths
60-69: Average, competent but not remarkable
50-59: Below average, generic or weak
Below 50: Poor quality, significant issues

Provide a numerical score (0-100) and 2-3 specific, honest feedback points. Be direct and critical.`;

  const userPrompt = `Please evaluate this college application essay:

${essay}

Provide:
1. A numerical score (0-100)
2. 2-3 specific, honest feedback points
3. Brief explanation of the score

Format your response as JSON:
{
  "score": number,
  "feedback": "string",
  "explanation": "string"
}`;

  try {
    const response = await fetch('https://inference.baseten.co/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BASETEN_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshotai/Kimi-K2-Instruct',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 500,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    // Parse the JSON response
    const parsed = JSON.parse(aiResponse);
    
    return {
      score: Math.max(0, Math.min(100, parsed.score)),
      feedback: parsed.feedback || 'No specific feedback provided.'
    };
  } catch (error) {
    console.error('AI analysis error:', error);
    // Fallback to heuristic scoring
    return await analyzeEssay(essay);
  }
}

// Enhanced extracurricular analysis with AI
async function analyzeExtracurricularsWithAI(activities: string[]): Promise<number> {
  const systemPrompt = `You are an expert college admissions evaluator. Assess extracurricular activities objectively and critically.

EVALUATION CRITERIA:
- Leadership roles (president, captain, founder, etc.)
- Commitment and duration (years, hours per week)
- Impact and achievement (awards, recognition, measurable results)
- Uniqueness and passion
- Depth vs breadth (fewer, deeper activities are better than many shallow ones)

SCORING:
90-100: Exceptional leadership, significant impact, unique achievements
80-89: Strong leadership, good commitment, notable achievements
70-79: Good involvement, some leadership, consistent commitment
60-69: Average involvement, limited leadership
50-59: Basic participation, minimal commitment
Below 50: Poor quality or very limited activities

Be critical and realistic. Most students have average extracurriculars.`;

  const userPrompt = `Evaluate these extracurricular activities:

${activities.join('\n')}

Provide only a numerical score (0-100) based on the criteria above. Be objective and critical.`;

  try {
    const response = await fetch('https://inference.baseten.co/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BASETEN_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshotai/Kimi-K2-Instruct',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.2,
        max_tokens: 50,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const score = parseInt(data.choices[0].message.content.trim());
    
    return Math.max(0, Math.min(100, score));
  } catch (error) {
    console.error('AI extracurricular analysis error:', error);
    return await analyzeExtracurriculars(activities);
  }
}

// Fallback heuristic functions (keep existing ones)
async function analyzeEssay(essay: string): Promise<{ score: number; feedback: string }> {
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
  const specificWords = ['because', 'when', 'where', 'how', 'why', 'specifically'];
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
  
  return {
    score: Math.max(0, Math.min(100, score)),
    feedback: 'Basic heuristic analysis performed. Consider upgrading for AI-powered evaluation.'
  };
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
    
    // Analyze each component with AI
    const essayAnalysis = await analyzeEssayWithAI(essay || '');
    const ecScore = await analyzeExtracurricularsWithAI(extracurriculars || []);
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
      essayScore: essayAnalysis.score,
      ecScore,
      academicRigorScore,
      lastUpdated: new Date().toISOString()
    };
    
    // Save updated data
    fs.writeFileSync(dataPath, JSON.stringify(userData, null, 2));
    
    return NextResponse.json({
      success: true,
      scores: {
        essayScore: essayAnalysis.score,
        ecScore,
        academicRigorScore
      },
      essayFeedback: essayAnalysis.feedback
    });
    
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}
