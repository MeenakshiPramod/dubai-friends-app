export const EVENT_CATEGORIES = [
  { id: 'job_fair', label: 'Job Fair & Career Expo', isJobEvent: true, badgeColor: 'bg-emerald-500' },
  { id: 'tech_hackathon', label: 'Tech Meetup & Hackathon', isJobEvent: false, badgeColor: 'bg-indigo-500' },
  { id: 'networking', label: 'Business & Professional Networking', isJobEvent: false, badgeColor: 'bg-blue-500' },
  { id: 'student_mixer', label: 'Student Community Mixer', isJobEvent: false, badgeColor: 'bg-amber-500' },
  { id: 'social_hangout', label: 'Social & Cultural Hangout', isJobEvent: false, badgeColor: 'bg-pink-500' },
  { id: 'workshop', label: 'Skill Building Workshop', isJobEvent: false, badgeColor: 'bg-purple-500' }
] as const;

export const JOB_TYPES = [
  { id: 'full_time', label: 'Full Time' },
  { id: 'part_time', label: 'Part Time' },
  { id: 'internship', label: 'Internship / Graduate Trainee' },
  { id: 'contract', label: 'Contract / Freelance' }
] as const;
