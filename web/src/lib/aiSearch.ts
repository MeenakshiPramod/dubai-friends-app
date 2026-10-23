import { UserProfile } from '@dubai-friends/shared';

export interface AISearchResult {
  user: UserProfile;
  relevanceScore: number;
  matchHighlights: string[];
  suggestedAction: string;
  warmIntroText: string;
}

export const SUGGESTED_AI_PROMPTS = [
  '🌴 Find Malayali AI students attending GITEX',
  '🚀 Who can give me an engineering referral at Careem?',
  '🤖 University students building autonomous LLM agents',
  '☕ Founders & mentors in Downtown or Business Bay',
  '🎓 Study group partners for fresh grads in Al Barsha'
];

/**
 * Happenstance-style Natural Language Semantic People Search Engine
 */
export function executeNaturalLanguageSearch(
  query: string,
  allUsers: UserProfile[],
  currentUser: UserProfile
): AISearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    return allUsers.map((u) => ({
      user: u,
      relevanceScore: u.ai_match_score || 85,
      matchHighlights: u.ai_match_reasons || ['Active Dubai community member'],
      suggestedAction: u.can_refer ? 'Request Warm Referral' : 'Send Connection Request',
      warmIntroText: u.warm_intro_path ? `Via ${u.warm_intro_path.bridgePerson}` : 'Direct connection'
    }));
  }

  // Tokens & keywords
  const isMalayaliQuery = q.includes('malayali') || q.includes('kerala') || q.includes('mallu') || q.includes('malayalam');
  const isAIQuery = q.includes('ai') || q.includes('llm') || q.includes('robotics') || q.includes('data');
  const isCareemQuery = q.includes('careem') || q.includes('referral') || q.includes('refer');
  const isGitexQuery = q.includes('gitex') || q.includes('expo') || q.includes('fair') || q.includes('career');
  const isStudentQuery = q.includes('student') || q.includes('college') || q.includes('university') || q.includes('middlesex') || q.includes('wollongong');
  const isFounderQuery = q.includes('founder') || q.includes('mentor') || q.includes('investor') || q.includes('startup') || q.includes('hub71');
  const isMarinaQuery = q.includes('marina') || q.includes('downtown') || q.includes('barsha') || q.includes('business bay');

  const scoredList = allUsers.map((user) => {
    let score = 50;
    const highlights: string[] = [];

    // Region match
    if (isMalayaliQuery && user.region === 'kerala') {
      score += 35;
      highlights.push('Malayali heritage match');
    }

    // AI & Tech match
    if (isAIQuery && (user.field_of_study?.toLowerCase().includes('ai') || user.interests.includes('ai_ml'))) {
      score += 35;
      highlights.push('AI & Machine Learning focus');
    }

    // Careem / Referral match
    if (isCareemQuery && (user.company?.toLowerCase().includes('careem') || user.can_refer)) {
      score += 40;
      highlights.push(`Verified employee referral at ${user.referral_company || user.company}`);
    }

    // Event match (GITEX)
    if (isGitexQuery && user.shared_events?.some(e => e.toLowerCase().includes('gitex'))) {
      score += 30;
      highlights.push('Attending GITEX Career Fair');
    }

    // Student role match
    if (isStudentQuery && user.user_status === 'student') {
      score += 25;
      highlights.push(`Student at ${user.university || 'Dubai University'}`);
    }

    // Founder / Mentor match
    if (isFounderQuery && (user.user_status === 'entrepreneur' || user.company?.includes('Hub71'))) {
      score += 30;
      highlights.push('Founder & active Dubai mentor');
    }

    // Location / Area match
    if (isMarinaQuery && q.includes(user.dubai_area?.toLowerCase() || '')) {
      score += 20;
      highlights.push(`Located in ${user.dubai_area}`);
    }

    // Free text substring matches
    const fullText = `${user.first_name} ${user.last_name} ${user.bio} ${user.field_of_study} ${user.occupation} ${user.dubai_area} ${user.interests.join(' ')}`.toLowerCase();
    const queryWords = q.split(/\s+/).filter(w => w.length > 2);
    let matchedWords = 0;
    queryWords.forEach(word => {
      if (fullText.includes(word)) {
        matchedWords++;
        score += 8;
      }
    });

    if (matchedWords > 0 && highlights.length === 0) {
      highlights.push(`Matches search terms: "${queryWords.slice(0, 2).join(', ')}"`);
    }

    // Boost if user has warm introduction path
    if (user.warm_intro_path) {
      score += 10;
    }

    const finalScore = Math.min(Math.max(score, 45), 99);

    return {
      user,
      relevanceScore: finalScore,
      matchHighlights: highlights.length > 0 ? highlights : user.ai_match_reasons || ['Relevance to your Dubai profile'],
      suggestedAction: user.can_refer ? 'Request Employee Referral' : 'Request Warm Introduction',
      warmIntroText: user.warm_intro_path 
        ? `Warm path: ${user.warm_intro_path.bridgePerson} (${user.warm_intro_path.relationship})`
        : 'Direct 1-on-1 connect'
    };
  });

  // Sort by highest relevance score
  return scoredList.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

/**
 * Happenstance-style Generative AI Warm Intro & Icebreaker Drafter
 */
export function generateWarmIntroDraft(
  targetUser: UserProfile,
  currentUser: UserProfile,
  tone: 'casual_malayali' | 'professional_referral' | 'event_buddy' = 'casual_malayali'
): { subject: string; message: string; keyTalkingPoints: string[] } {
  const isMalayaliMatch = targetUser.region === 'kerala' && currentUser.region === 'kerala';
  const sharedEvent = targetUser.shared_events?.[0] || 'GITEX Career Fair';
  const bridge = targetUser.warm_intro_path?.bridgePerson || 'our mutual friend';

  if (tone === 'professional_referral' || targetUser.can_refer) {
    return {
      subject: `Connecting regarding ${targetUser.referral_company || targetUser.company || 'Tech Roles'} in Dubai`,
      message: `Hi ${targetUser.first_name},\n\nI noticed through ${bridge} that you work at ${targetUser.company || 'Careem'}. I just relocated to Dubai and am completing my studies in ${currentUser.field_of_study || 'AI Engineering'}.\n\nI’m actively looking at junior engineering opportunities and would truly appreciate 5 minutes to learn about your experience and ask for advice on applying. Are you free for a quick chat over coffee or virtual call this week?\n\nBest regards,\n${currentUser.first_name} ${currentUser.last_name}`,
      keyTalkingPoints: [
        `Leveraged warm bridge via ${bridge}`,
        `Highlighted AI/Data background`,
        `Low friction call/coffee request in Dubai`
      ]
    };
  }

  if (tone === 'event_buddy') {
    return {
      subject: `Heading to ${sharedEvent} together?`,
      message: `Hey ${targetUser.first_name}!\n\nSaw you're planning to attend ${sharedEvent} too! A few of us students are meeting up around Dubai World Trade Centre / Metro station beforehand so we can explore the booths and interview sessions as a group.\n\nWould love for you to join our crew! Let me know if you want to sync up.`,
      keyTalkingPoints: [
        `Shared event attendance: ${sharedEvent}`,
        `Invites into group dynamic to eliminate social anxiety`,
        `Clear meeting location (DWTC Metro)`
      ]
    };
  }

  // Default: Friendly cultural / student match
  const greeting = isMalayaliMatch ? `Namaskaram ${targetUser.first_name}!` : `Hi ${targetUser.first_name}!`;
  return {
    subject: `Fellow newcomer in Dubai — Let's connect!`,
    message: `${greeting}\n\nI saw your profile on Dubai Friends — noticed you're also ${isMalayaliMatch ? 'from Kerala' : 'here in Dubai'} and passionate about ${targetUser.field_of_study || targetUser.interests[0] || 'tech'}!\n\nI recently moved to ${currentUser.dubai_area || 'Dubai'} to focus on ${currentUser.field_of_study || 'AI'}. Since we are both exploring the city and have mutual connections like ${bridge}, thought it would be great to say hello and connect!`,
    keyTalkingPoints: [
      isMalayaliMatch ? `Cultural bonding (Malayali in UAE)` : `Neighborhood connection`,
      `Mutual bridge: ${bridge}`,
      `Shared career enthusiasm (${targetUser.field_of_study})`
    ]
  };
}
