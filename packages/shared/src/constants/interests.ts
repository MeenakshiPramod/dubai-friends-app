export interface InterestItem {
  id: string;
  name: string;
  category: 'Tech & AI' | 'Business & Finance' | 'Creative & Media' | 'Lifestyle & Sports' | 'Academics';
  icon: string;
}

export const INTEREST_ITEMS: InterestItem[] = [
  // Tech & AI
  { id: 'ai_ml', name: 'AI & Machine Learning', category: 'Tech & AI', icon: 'Bot' },
  { id: 'web_dev', name: 'Web & App Development', category: 'Tech & AI', icon: 'Code' },
  { id: 'cybersecurity', name: 'Cybersecurity', category: 'Tech & AI', icon: 'Shield' },
  { id: 'data_science', name: 'Data Science & Analytics', category: 'Tech & AI', icon: 'Database' },
  { id: 'robotics', name: 'Robotics & IoT', category: 'Tech & AI', icon: 'Cpu' },

  // Business & Finance
  { id: 'startups', name: 'Startups & Entrepreneurship', category: 'Business & Finance', icon: 'Rocket' },
  { id: 'crypto_fintech', name: 'Fintech & Web3', category: 'Business & Finance', icon: 'Coins' },
  { id: 'marketing', name: 'Digital Marketing & Growth', category: 'Business & Finance', icon: 'TrendingUp' },
  { id: 'real_estate', name: 'Dubai Real Estate & Investing', category: 'Business & Finance', icon: 'Building' },

  // Creative & Media
  { id: 'photography', name: 'Photography & Filmmaking', category: 'Creative & Media', icon: 'Camera' },
  { id: 'ui_ux', name: 'UI / UX Design', category: 'Creative & Media', icon: 'Palette' },
  { id: 'content_creation', name: 'Content Creation & Podcasting', category: 'Creative & Media', icon: 'Mic' },

  // Lifestyle & Sports
  { id: 'fitness', name: 'Gym, Crossfit & Fitness', category: 'Lifestyle & Sports', icon: 'Dumbbell' },
  { id: 'football_cricket', name: 'Football & Cricket', category: 'Lifestyle & Sports', icon: 'Trophy' },
  { id: 'foodies', name: 'Dubai Food Walks & Cafes', category: 'Lifestyle & Sports', icon: 'Utensils' },
  { id: 'travel', name: 'Desert Safari & Roadtrips', category: 'Lifestyle & Sports', icon: 'Compass' },

  // Academics
  { id: 'study_groups', name: 'University Study Groups', category: 'Academics', icon: 'GraduationCap' },
  { id: 'research', name: 'Academic Research & Papers', category: 'Academics', icon: 'BookOpen' }
];

export const USER_STATUS_OPTIONS = [
  { id: 'student', label: 'Student (University / College)' },
  { id: 'job_seeker', label: 'Job Seeker (Looking for opportunities in Dubai)' },
  { id: 'professional', label: 'Working Professional' },
  { id: 'entrepreneur', label: 'Founder / Business Owner' },
  { id: 'freelancer', label: 'Freelancer / Digital Nomad' }
] as const;
