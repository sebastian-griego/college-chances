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

PRIMARY EVALUATION CRITERIA (in order of importance):
1. PASSION & AUTHENTICITY - Does the student genuinely care about their topic? Is their passion authentic and compelling?
2. PERSONAL VOICE - Does the essay sound like a real person wrote it, not a template?
3. SPECIFICITY & DETAIL - Does it show concrete experiences, not vague statements?
4. GROWTH & REFLECTION - Does it demonstrate learning, maturity, or personal development?
5. WRITING QUALITY - Is it well-written, engaging, and free of major errors?

COLLEGE ADMISSIONS INSIGHTS:
- Top colleges prioritize PASSION above all else
- They want to see genuine interest, not resume-padding activities
- Authentic voice matters more than perfect grammar
- Specific, personal stories beat generic achievements
- Colleges can spot insincere passion from a mile away

SCORING GUIDELINES:
90-100: Exceptional passion, authentic voice, compelling personal story
80-89: Strong passion, genuine voice, good personal insight
70-79: Some passion, mostly authentic, competent writing
60-69: Limited passion, generic voice, surface-level content
50-59: Little passion, artificial voice, clichéd content
Below 50: No passion, fake voice, poor quality

Be extremely critical about passion and authenticity. Most essays lack genuine passion.`;

  const userPrompt = `Please evaluate this college application essay:

${essay}

Provide:
1. A numerical score (0-100)
2. 2-3 specific, honest feedback points (each on a new line)
3. Brief explanation of the score

Format your response as JSON:
{
  "score": number,
  "feedback": "string with line breaks for each point",
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

EVALUATION CRITERIA (in order of importance):
1. PASSION & COMMITMENT - Does the student genuinely care about these activities? Years of involvement?
2. LEADERSHIP & IMPACT - Real leadership roles with measurable impact, not just titles
3. UNIQUENESS - Activities that stand out from typical high school activities
4. DEPTH OVER BREADTH - Fewer, deeper activities are better than many shallow ones
5. ACHIEVEMENTS - Awards, recognition, or measurable results

COLLEGE ADMISSIONS INSIGHTS:
- Students are limited to 10 activities on applications
- Quality matters much more than quantity
- Colleges see thousands of "president of science club" applications
- Authentic passion beats impressive titles
- Depth and commitment matter more than prestigious organizations
- Real impact beats superficial involvement

SCORING GUIDELINES:
90-100: Exceptional passion, significant leadership, unique impact (very rare)
80-89: Strong passion, good leadership, notable achievements
70-79: Some passion, some leadership, consistent commitment
60-69: Limited passion, basic involvement, minimal leadership
50-59: Little passion, superficial involvement, no real impact
Below 50: No passion, poor quality activities

Be extremely critical about passion and authenticity. Most students have average extracurriculars (60-75 range).`;

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
  if (wordCount >= 500 && wordCount <= 650) score += 5;
  else if (wordCount < 400) score -= 10;
  else if (wordCount > 700) score -= 5;
  
  // Passion indicators (more important)
  const passionWords = ['love', 'passion', 'excited', 'thrilled', 'amazing', 'incredible', 'fascinated', 'obsessed'];
  const passionCount = passionWords.filter(word => 
    essay.toLowerCase().includes(word.toLowerCase())
  ).length;
  score += Math.min(passionCount * 5, 20);
  
  // Personal story indicators
  const personalIndicators = ['I', 'me', 'my', 'we', 'our', 'family', 'experience', 'learned', 'realized'];
  const personalCount = personalIndicators.filter(word => 
    essay.toLowerCase().includes(word.toLowerCase())
  ).length;
  score += Math.min(personalCount * 2, 10);
  
  // Specificity indicators
  const specificWords = ['because', 'when', 'where', 'how', 'why', 'specifically'];
  const specificCount = specificWords.filter(word => 
    essay.toLowerCase().includes(word.toLowerCase())
  ).length;
  score += Math.min(specificCount * 2, 10);
  
  // Grammar and structure (less important)
  const sentences = essay.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgSentenceLength = sentences.reduce((sum, sentence) => 
    sum + sentence.split(' ').length, 0) / sentences.length;
  
  if (avgSentenceLength >= 10 && avgSentenceLength <= 25) score += 3;
  else if (avgSentenceLength < 5) score -= 5;
  else if (avgSentenceLength > 30) score -= 3;
  
  return {
    score: Math.max(0, Math.min(100, score)),
    feedback: 'Basic heuristic analysis performed. Consider upgrading for AI-powered evaluation focused on passion and authenticity.'
  };
}

async function analyzeExtracurriculars(activities: string[]): Promise<number> {
  let score = 50;
  
  // Number of activities (quality over quantity)
  if (activities.length >= 3 && activities.length <= 8) score += 5;
  else if (activities.length < 2) score -= 10;
  else if (activities.length > 10) score -= 5; // Penalize too many shallow activities
  
  // Passion indicators (more important)
  const passionWords = ['love', 'passion', 'excited', 'thrilled', 'amazing', 'incredible', 'fascinated'];
  const passionCount = activities.filter(activity => 
    passionWords.some(word => activity.toLowerCase().includes(word))
  ).length;
  score += Math.min(passionCount * 8, 20);
  
  // Leadership indicators (real leadership, not just titles)
  const leadershipWords = ['president', 'captain', 'leader', 'founder', 'director', 'chair', 'coordinator'];
  const leadershipCount = activities.filter(activity => 
    leadershipWords.some(word => activity.toLowerCase().includes(word))
  ).length;
  score += Math.min(leadershipCount * 5, 15);
  
  // Commitment indicators (years, hours - shows depth)
  const commitmentPatterns = [/\d+\s*years?/, /\d+\s*hours?/, /weekly/, /monthly/];
  const commitmentCount = activities.filter(activity => 
    commitmentPatterns.some(pattern => pattern.test(activity))
  ).length;
  score += Math.min(commitmentCount * 4, 12);
  
  // Uniqueness indicators (less common activities)
  const uniqueWords = ['founder', 'created', 'started', 'developed', 'organized', 'launched'];
  const uniqueCount = activities.filter(activity => 
    uniqueWords.some(word => activity.toLowerCase().includes(word))
  ).length;
  score += Math.min(uniqueCount * 6, 15);
  
  return Math.max(0, Math.min(100, score));
}

async function calculateAcademicRigor(apScores: number[], ibScores: number[], honorsClasses: number): Promise<number> {
  let score = 50;
  
  // AP scores - reward both quantity and quality
  const totalAPClasses = apScores.length;
  const avgAPScore = totalAPClasses > 0 ? apScores.reduce((sum, score) => sum + score, 0) / totalAPClasses : 0;
  
  // Quality component (average score)
  if (avgAPScore >= 4.0) score += 15;
  else if (avgAPScore >= 3.0) score += 8;
  else if (avgAPScore < 2.0) score -= 5;
  
  // Quantity component (number of AP classes)
  if (totalAPClasses >= 8) score += 15;
  else if (totalAPClasses >= 5) score += 10;
  else if (totalAPClasses >= 3) score += 5;
  else if (totalAPClasses < 1) score -= 5;
  
  // IB scores - similar approach
  const totalIBClasses = ibScores.length;
  const avgIBScore = totalIBClasses > 0 ? ibScores.reduce((sum, score) => sum + score, 0) / totalIBClasses : 0;
  
  // Quality component
  if (avgIBScore >= 6.0) score += 10;
  else if (avgIBScore >= 5.0) score += 6;
  else if (avgIBScore < 4.0) score -= 3;
  
  // Quantity component
  if (totalIBClasses >= 6) score += 10;
  else if (totalIBClasses >= 4) score += 7;
  else if (totalIBClasses >= 2) score += 3;
  
  // Honors/AP classes taken (separate from AP scores)
  if (honorsClasses >= 8) score += 10;
  else if (honorsClasses >= 5) score += 7;
  else if (honorsClasses >= 3) score += 3;
  else if (honorsClasses < 1) score -= 5;
  
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
