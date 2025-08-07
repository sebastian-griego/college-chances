import { NextRequest, NextResponse } from 'next/server';

interface UserData {
  essayScore?: number;
  ecScore?: number;
  academicRigorScore?: number;
  lastUpdated?: string;
}

// In-memory storage for production (will be replaced with database later)
const userDataStore: { [userId: string]: UserData } = {};

// Kimi K2 AI analysis function
async function analyzeEssayWithAI(essay: string): Promise<{ score: number; feedback: string }> {
  const systemPrompt = `You are an expert college admissions evaluator with 20+ years of experience. Your job is to critically and objectively assess college application essays.

CRITICAL EVALUATION CRITERIA:
- Be extremely critical and honest. Only truly exceptional essays should score above 85.
- Average essays should score 50-70. Below average essays should score 30-50.
- Evaluate on: authenticity, passion, uniqueness, personal growth, writing quality, and impact
- Avoid being sycophantic or overly positive. Be realistic and objective.
- Consider: Is this essay memorable? Does it show genuine character? Is it generic?

COLLEGE ADMISSIONS INSIGHTS:
- Top colleges value authentic passion and genuine interest
- They want to see real people, not perfect templates
- Specific, personal stories beat generic achievements
- Authentic voice matters more than perfect grammar
- Colleges can spot insincere writing from a mile away

SCORING GUIDELINES:
90-100: Exceptional, memorable, passionate, truly unique perspective with authentic voice
80-89: Very strong, stands out significantly, genuine personal insight
70-79: Good quality, some strengths, mostly authentic
60-69: Average, competent but not remarkable, some generic elements
50-59: Below average, generic or weak, lacks authenticity
Below 50: Poor quality, significant issues, artificial voice

Be extremely critical and honest. Most essays lack genuine authenticity and personal voice.`;

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
    console.log('API Key available:', !!process.env.BASETEN_API_KEY);
    console.log('API Key length:', process.env.BASETEN_API_KEY?.length);
    
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
    console.error('Error details:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : 'Unknown'
    });
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
- Uniqueness and quality
- Depth vs breadth (fewer, deeper activities are better than many shallow ones)

COLLEGE ADMISSIONS INSIGHTS:
- Students are limited to 10 activities on applications
- Quality matters more than quantity, but both are valuable
- Colleges see thousands of "president of science club" applications
- Real impact beats superficial involvement
- Depth and commitment matter more than prestigious organizations

SCORING GUIDELINES:
90-100: Exceptional leadership, significant impact, unique achievements (very rare)
80-89: Strong leadership, good commitment, notable achievements
70-79: Good involvement, some leadership, consistent commitment
60-69: Average involvement, limited leadership
50-59: Basic participation, minimal commitment
Below 50: Poor quality or very limited activities

Be extremely critical and realistic. Most students have average extracurriculars (60-75 range). Only truly exceptional profiles should score above 85.`;

  const userPrompt = `Evaluate these extracurricular activities:

${activities.join('\n')}

Provide only a numerical score (0-100) based on the criteria above. Be objective and critical.`;

  try {
    console.log('EC API Key available:', !!process.env.BASETEN_API_KEY);
    console.log('EC API Key length:', process.env.BASETEN_API_KEY?.length);
    
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
      console.error('EC AI API response not ok:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('EC Error response:', errorText);
      throw new Error(`AI API error: ${response.status} - ${errorText}`);
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
  
  // Authenticity indicators
  const authenticityWords = ['love', 'passion', 'excited', 'thrilled', 'amazing', 'incredible', 'fascinated'];
  const authenticityCount = authenticityWords.filter(word => 
    essay.toLowerCase().includes(word.toLowerCase())
  ).length;
  score += Math.min(authenticityCount * 3, 15);
  
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
  
  // Quality indicators
  const qualityWords = ['founder', 'created', 'started', 'developed', 'organized', 'launched'];
  const qualityCount = activities.filter(activity => 
    qualityWords.some(word => activity.toLowerCase().includes(word))
  ).length;
  score += Math.min(qualityCount * 6, 18);
  
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
  const uniqueWords = ['founder', 'created', 'started', 'developed', 'organized', 'launched', 'unique', 'special'];
  const uniqueCount = activities.filter(activity => 
    uniqueWords.some(word => activity.toLowerCase().includes(word))
  ).length;
  score += Math.min(uniqueCount * 4, 12);
  
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
    
    // Store user data in memory (will be replaced with database later)
    userDataStore[userId] = {
      essayScore: essayAnalysis.score,
      ecScore,
      academicRigorScore,
      lastUpdated: new Date().toISOString()
    };
    
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
