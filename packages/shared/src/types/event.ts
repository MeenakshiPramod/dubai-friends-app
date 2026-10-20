export interface EventItem {
  id: string;
  organizer_id: string;
  organizer_name?: string;
  organizer_logo?: string;
  title: string;
  description: string;
  category: 'job_fair' | 'tech_hackathon' | 'networking' | 'student_mixer' | 'social_hangout' | 'workshop';
  is_job_event: boolean;
  participating_companies?: string[];
  hiring_roles?: string[];
  venue_name: string;
  venue_address: string;
  dubai_area: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  starts_at: string;
  ends_at?: string;
  max_capacity?: number;
  rsvp_count: number;
  cover_image_url?: string;
  target_interests: string[];
  status: 'draft' | 'pending' | 'published' | 'cancelled';
  created_at: string;
  is_attending?: boolean;
}

export interface EventRSVP {
  id: string;
  event_id: string;
  user_id: string;
  status: 'going' | 'maybe' | 'not_going';
  created_at: string;
  user_profile?: {
    first_name: string;
    last_name: string;
    avatar_url?: string;
    user_status: string;
  };
}
