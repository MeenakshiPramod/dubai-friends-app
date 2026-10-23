export type UserRole = 'user' | 'organization' | 'admin';
export type AccountStatus = 'active' | 'suspended' | 'banned';

export interface UserProfile {
  id: string;
  email: string;
  phone?: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  bio?: string;
  date_of_birth: string; // YYYY-MM-DD
  role: UserRole;
  status: AccountStatus;
  nationality?: string;
  region: string; // e.g. 'kerala', 'north_india', 'arab_emirati'
  user_status: 'student' | 'job_seeker' | 'professional' | 'entrepreneur' | 'freelancer';
  field_of_study?: string; // e.g. 'AI Engineering', 'BBA', 'Finance'
  occupation?: string;
  university?: string;
  dubai_area?: string; // e.g. 'Dubai Marina', 'Deira'
  location?: {
    latitude: number;
    longitude: number;
  };
  interests: string[];
  is_online?: boolean;
  last_seen?: string;
  created_at?: string;
  // Happenstance-style Relationship & Warm Network Intelligence
  company?: string;
  can_refer?: boolean;
  referral_company?: string;
  mutual_connections?: string[];
  shared_events?: string[];
  warm_intro_path?: {
    bridgePerson: string;
    relationship: string;
    note: string;
  };
  ai_match_score?: number;
  ai_match_reasons?: string[];
}

export interface OrganizationProfile {
  id: string;
  user_id: string;
  org_name: string;
  org_type: string;
  linkedin_url?: string;
  website?: string;
  description?: string;
  logo_url?: string;
  is_verified: boolean;
  verified_at?: string;
  created_at?: string;
}

export interface Connection {
  id: string;
  requester_id: string;
  receiver_id: string;
  status: 'pending' | 'accepted' | 'blocked';
  matched_by: 'interest' | 'region' | 'random' | 'manual' | 'event';
  created_at: string;
  profile?: UserProfile;
}
