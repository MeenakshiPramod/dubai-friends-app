import { UserProfile, EventItem, JobPosting, Conversation } from '@dubai-friends/shared';

export const MOCK_CURRENT_USER: UserProfile = {
  id: 'current-user-1',
  email: 'meenakshi@example.com',
  first_name: 'Meenakshi',
  last_name: 'Pramod',
  date_of_birth: '2001-08-14',
  role: 'user',
  status: 'active',
  region: 'kerala',
  user_status: 'student',
  field_of_study: 'AI & Data Science',
  dubai_area: 'Dubai Marina',
  bio: 'Just relocated to Dubai! AI engineering student passionate about LLMs, tech startups & weekend coffee walks.',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
  interests: ['ai_ml', 'web_dev', 'startups', 'travel'],
  is_online: true
};

export const MOCK_USERS: UserProfile[] = [
  {
    id: 'user-2',
    email: 'rahul.k@example.com',
    first_name: 'Rahul',
    last_name: 'Menon',
    date_of_birth: '2002-03-21',
    role: 'user',
    status: 'active',
    region: 'kerala',
    user_status: 'student',
    field_of_study: 'AI & Robotics',
    university: 'Middlesex University Dubai',
    dubai_area: 'Dubai Academic City',
    bio: 'Malayali AI student building autonomous agents. Looking to meet fellow AI students & hackathon buddies!',
    avatar_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
    interests: ['ai_ml', 'robotics', 'web_dev', 'foodies'],
    is_online: true
  },
  {
    id: 'user-3',
    email: 'ananya.s@example.com',
    first_name: 'Ananya',
    last_name: 'Sharma',
    date_of_birth: '2000-11-09',
    role: 'user',
    status: 'active',
    region: 'north_india',
    user_status: 'job_seeker',
    field_of_study: 'International Business & Finance',
    dubai_area: 'Business Bay',
    bio: 'Finance graduate from Delhi, arrived in Dubai 2 weeks ago looking for analyst roles. Let us connect for networking & job fairs!',
    avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300',
    interests: ['startups', 'crypto_fintech', 'real_estate'],
    is_online: true
  },
  {
    id: 'user-4',
    email: 'faisal.al@example.com',
    first_name: 'Faisal',
    last_name: 'Al-Mansoor',
    date_of_birth: '1999-05-15',
    role: 'user',
    status: 'active',
    region: 'arab_emirati',
    user_status: 'entrepreneur',
    field_of_study: 'Software Enterprise',
    dubai_area: 'Downtown Dubai',
    bio: 'Dubai native building tech communities. Happy to guide students and newcomers settling into the city.',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    interests: ['startups', 'ai_ml', 'real_estate'],
    is_online: false,
    last_seen: '2 hours ago'
  },
  {
    id: 'user-5',
    email: 'sneha.nair@example.com',
    first_name: 'Sneha',
    last_name: 'Nair',
    date_of_birth: '2003-01-18',
    role: 'user',
    status: 'active',
    region: 'kerala',
    user_status: 'student',
    field_of_study: 'Business Administration (BBA)',
    university: 'University of Wollongong Dubai',
    dubai_area: 'Al Barsha',
    bio: 'BBA 2nd year student. Malayali in Dubai, loves exploring cafes, photography and attending business conferences.',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
    interests: ['marketing', 'photography', 'foodies', 'study_groups'],
    is_online: true
  },
  {
    id: 'user-6',
    email: 'tariq.k@example.com',
    first_name: 'Tariq',
    last_name: 'Khan',
    date_of_birth: '2001-09-04',
    role: 'user',
    status: 'active',
    region: 'pakistan',
    user_status: 'job_seeker',
    field_of_study: 'Fullstack Web Development',
    dubai_area: 'Deira',
    bio: 'React & Node.js developer on visit visa exploring opportunities in UAE. Open for study groups & job referral chats!',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    interests: ['web_dev', 'cybersecurity', 'football_cricket'],
    is_online: true
  }
];

export const MOCK_EVENTS: EventItem[] = [
  {
    id: 'event-1',
    organizer_id: 'org-1',
    organizer_name: 'Dubai Future Foundation / Hub71',
    organizer_logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=100',
    title: 'GITEX Tech Talent & Career Expo 2026',
    description: 'The premier hiring expo for students and job seekers in Dubai. Meet 50+ hiring tech companies, submit resumes, and attend live interviews.',
    category: 'job_fair',
    is_job_event: true,
    participating_companies: ['Careem', 'Noon', 'Talabat', 'Hub71 Startups', 'Emirates NBD'],
    hiring_roles: ['Junior AI Engineer', 'Frontend Developer', 'Data Analyst', 'Marketing Associate'],
    venue_name: 'Dubai World Trade Centre (DWTC)',
    venue_address: 'Sheikh Zayed Rd, Trade Centre 2',
    dubai_area: 'Downtown Dubai',
    coordinates: { latitude: 25.2285, longitude: 55.2863 },
    starts_at: '2026-10-25T10:00:00Z',
    rsvp_count: 248,
    target_interests: ['ai_ml', 'web_dev', 'startups'],
    status: 'published',
    created_at: '2026-10-18T10:00:00Z',
    cover_image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
    is_attending: true
  },
  {
    id: 'event-2',
    organizer_id: 'org-2',
    organizer_name: 'Dubai Tech Students Club',
    title: 'Dubai AI & Student Builders Hack-Night',
    description: 'An informal Saturday evening coding & demo night for university students in Dubai. Team up, build AI apps with Antigravity, and share ideas.',
    category: 'tech_hackathon',
    is_job_event: false,
    venue_name: 'in5 Tech Center',
    venue_address: 'King Salman Bin Abdulaziz Al Saud St, Internet City',
    dubai_area: 'Dubai Marina',
    coordinates: { latitude: 25.0975, longitude: 55.1567 },
    starts_at: '2026-10-27T17:30:00Z',
    rsvp_count: 56,
    target_interests: ['ai_ml', 'web_dev'],
    status: 'published',
    created_at: '2026-10-19T08:00:00Z',
    cover_image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
    is_attending: false
  },
  {
    id: 'event-3',
    organizer_id: 'org-3',
    organizer_name: 'Malayali Community Hub Dubai',
    title: 'Malayali Students & Newcomers Meetup',
    description: 'New to Dubai? Meet other Malayalis studying or starting their careers here. Friendly session discussing metro cards, accommodation, and networking.',
    category: 'social_hangout',
    is_job_event: false,
    venue_name: 'Zabeel Park (Near Dubai Frame)',
    venue_address: 'Zabeel Area Gate 1',
    dubai_area: 'Downtown Dubai',
    coordinates: { latitude: 25.2356, longitude: 55.3012 },
    starts_at: '2026-10-28T16:00:00Z',
    rsvp_count: 89,
    target_interests: ['study_groups', 'foodies', 'travel'],
    status: 'published',
    created_at: '2026-10-19T14:00:00Z',
    cover_image_url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
    is_attending: true
  }
];

export const MOCK_JOBS: JobPosting[] = [
  {
    id: 'job-1',
    org_id: 'org-careem',
    company_name: 'Careem Technologies',
    company_logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=100',
    title: 'Junior Fullstack Software Engineer',
    description: 'We are expanding our Dubai mobility and SuperApp engineering squad. Fresh graduates and developers with TypeScript/React experience are encouraged to apply.',
    linkedin_url: 'https://www.linkedin.com/jobs/search/?keywords=Careem%20Junior%20Software%20Engineer%20Dubai',
    dubai_area: 'Dubai Internet City',
    job_type: 'full_time',
    required_skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
    salary_range: 'AED 9,000 - 13,000 / month',
    status: 'active',
    created_at: '2026-10-19T10:00:00Z'
  },
  {
    id: 'job-2',
    org_id: 'org-tii',
    company_name: 'Technology Innovation Institute (TII Dubai)',
    company_logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=100',
    title: 'AI / Machine Learning Student Intern',
    description: 'Work with research scientists on open LLMs and fine-tuning datasets. Ideal for university students passionate about deep learning.',
    linkedin_url: 'https://www.linkedin.com/jobs/search/?keywords=TII%20AI%20Intern%20Dubai',
    dubai_area: 'Dubai Silicon Oasis',
    job_type: 'internship',
    required_skills: ['Python', 'PyTorch', 'Transformers', 'FastAPI'],
    salary_range: 'AED 4,500 - 6,000 stipend',
    status: 'active',
    created_at: '2026-10-18T14:00:00Z'
  },
  {
    id: 'job-3',
    org_id: 'org-emaar',
    company_name: 'Emaar Properties Partners',
    company_logo: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=100',
    title: 'Junior Business Development Executive',
    description: 'Dynamic role for recent business graduates. Conduct client presentations and liaise with international real estate investors.',
    linkedin_url: 'https://www.linkedin.com/jobs/search/?keywords=Emaar%20Business%20Development%20Dubai',
    dubai_area: 'Downtown Dubai',
    job_type: 'full_time',
    required_skills: ['Communication', 'CRM', 'Market Research', 'Sales'],
    salary_range: 'AED 7,500 + Commissions',
    status: 'active',
    created_at: '2026-10-17T09:00:00Z'
  }
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    type: 'direct',
    created_at: '2026-10-19T12:00:00Z',
    unread_count: 1,
    last_message: {
      content: 'Hey Meenakshi! Are you planning to attend the GITEX career fair on Sunday?',
      sender_id: 'user-2',
      created_at: '10 mins ago'
    },
    participants: [
      {
        id: 'user-2',
        first_name: 'Rahul',
        last_name: 'Menon',
        avatar_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
        is_online: true
      }
    ]
  },
  {
    id: 'conv-2',
    type: 'group',
    title: 'GITEX Career Fair - Group Meetup 🚀',
    event_id: 'event-1',
    created_at: '2026-10-19T15:00:00Z',
    unread_count: 3,
    last_message: {
      content: 'Let us meet up near DWTC Metro Station Exit 2 at 9:30 AM so we can enter together!',
      sender_id: 'user-3',
      created_at: '25 mins ago'
    },
    participants: [
      {
        id: 'user-2',
        first_name: 'Rahul',
        last_name: 'Menon',
        avatar_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
        is_online: true
      },
      {
        id: 'user-3',
        first_name: 'Ananya',
        last_name: 'Sharma',
        avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300',
        is_online: true
      },
      {
        id: 'user-5',
        first_name: 'Sneha',
        last_name: 'Nair',
        avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
        is_online: false
      }
    ]
  }
];
