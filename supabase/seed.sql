-- Seed data for Dubai Friends App
-- Run this in Supabase SQL editor or seed workflow

-- Note: In Supabase, auth.users ids are generated on signup.
-- This script contains mock reference data structure for local development.

-- Sample Dubai Events
INSERT INTO public.events (
    id, organizer_id, title, description, category, is_job_event,
    participating_companies, hiring_roles, venue_name, venue_address,
    dubai_area, location, starts_at, max_capacity, rsvp_count, status
) VALUES
(
    '11111111-1111-1111-1111-111111111111',
    '00000000-0000-0000-0000-000000000001',
    'GITEX Global Career Fair & Tech Talent Expo 2026',
    'Meet hiring managers and tech recruiters from top UAE tech unicorns, AI startups, and government initiatives looking for junior & senior developers.',
    'job_fair',
    true,
    ARRAY['Careem', 'Noon', 'Talabat', 'Hub71', 'Emirates Group'],
    ARRAY['Junior Fullstack Engineer', 'AI / ML Intern', 'Data Analyst', 'Cloud Engineer'],
    'Dubai World Trade Centre (DWTC)',
    'Sheikh Zayed Rd, Trade Centre 2, Dubai',
    'Downtown Dubai',
    ST_SetSRID(ST_MakePoint(55.2863, 25.2285), 4326)::geography,
    NOW() + INTERVAL '3 days',
    500,
    142,
    'published'
),
(
    '22222222-2222-2222-2222-222222222222',
    '00000000-0000-0000-0000-000000000001',
    'Dubai AI & Student Founders Meetup',
    'Calling all university students and tech builders in Dubai! Discuss agents, LLMs, and collaborate on startup ideas over Karak and snacks.',
    'tech_hackathon',
    false,
    NULL,
    NULL,
    'in5 Tech Innovation Hub',
    'Dubai Internet City, Building 1',
    'Dubai Marina',
    ST_SetSRID(ST_MakePoint(55.1567, 25.0975), 4326)::geography,
    NOW() + INTERVAL '5 days',
    80,
    38,
    'published'
),
(
    '33333333-3333-3333-3333-333333333333',
    '00000000-0000-0000-0000-000000000001',
    'Malayali Youth & Tech Network Dubai - Evening Hangout',
    'A casual evening gathering for Malayalis new to Dubai — techies, students, and professionals to share career tips, room hunting, and network.',
    'social_hangout',
    false,
    NULL,
    NULL,
    'Zabeel Park Gate 1 Amphitheatre',
    'Zabeel Area, Near Dubai Frame',
    'Downtown Dubai',
    ST_SetSRID(ST_MakePoint(55.3012, 25.2356), 4326)::geography,
    NOW() + INTERVAL '7 days',
    100,
    64,
    'published'
);

-- Sample Dubai Jobs
INSERT INTO public.job_postings (
    id, org_id, title, company_name, description, linkedin_url,
    dubai_area, location, job_type, required_skills, salary_range, status
) VALUES
(
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '00000000-0000-0000-0000-000000000001',
    'Junior Fullstack Engineer (React / Node.js)',
    'Careem Technologies',
    'Looking for energetic fresh grads or developers with 1-2 years experience to join our core mobility engineering team in Dubai.',
    'https://www.linkedin.com/jobs/search/?keywords=Careem%20Engineer%20Dubai',
    'Dubai Internet City',
    ST_SetSRID(ST_MakePoint(55.1567, 25.0975), 4326)::geography,
    'full_time',
    ARRAY['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    'AED 8,000 - 12,000 / month',
    'active'
),
(
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '00000000-0000-0000-0000-000000000001',
    'AI Research & Developer Intern',
    'Technology Innovation Institute (TII Dubai)',
    'Work alongside leading AI researchers building open LLM models. Great opportunity for university students and AI hobbyists.',
    'https://www.linkedin.com/jobs/search/?keywords=AI%20Intern%20Dubai',
    'Dubai Silicon Oasis',
    ST_SetSRID(ST_MakePoint(55.3781, 25.1221), 4326)::geography,
    'internship',
    ARRAY['Python', 'PyTorch', 'Transformers', 'FastAPI'],
    'AED 4,000 - 6,000 / month stipend',
    'active'
),
(
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    '00000000-0000-0000-0000-000000000001',
    'Business Development & Sales Associate',
    'Emaar Properties Partner Network',
    'Fast-paced real estate sales and client relations role for ambitious newcomers with great communication and networking skills.',
    'https://www.linkedin.com/jobs/search/?keywords=Sales%20Associate%20Dubai%20Emaar',
    'Downtown Dubai',
    ST_SetSRID(ST_MakePoint(55.2744, 25.1972), 4326)::geography,
    'full_time',
    ARRAY['Sales', 'Client Relations', 'CRM', 'Negotiation'],
    'AED 7,000 + Attractive Commission',
    'active'
);
