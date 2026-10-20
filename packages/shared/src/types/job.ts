export interface JobPosting {
  id: string;
  org_id: string;
  company_name: string;
  company_logo?: string;
  title: string;
  description: string;
  linkedin_url: string; // Direct link to LinkedIn job application
  dubai_area: string; // e.g. 'DIFC', 'Business Bay'
  job_type: 'full_time' | 'part_time' | 'internship' | 'contract';
  required_skills: string[];
  salary_range?: string; // e.g. 'AED 6,000 - 9,000 / month'
  status: 'active' | 'closed';
  created_at: string;
  expires_at?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}
