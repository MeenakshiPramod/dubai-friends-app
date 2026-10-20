-- Dubai Friends App - V1 Database Schema
-- Optimized for Supabase (PostgreSQL 15+ with PostGIS)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 1. PROFILES (Extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    date_of_birth DATE NOT NULL,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'organization', 'admin')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'banned')),
    nationality TEXT,
    region TEXT NOT NULL DEFAULT 'kerala',
    user_status TEXT NOT NULL DEFAULT 'student' CHECK (user_status IN ('student', 'job_seeker', 'professional', 'entrepreneur', 'freelancer')),
    field_of_study TEXT,
    occupation TEXT,
    university TEXT,
    dubai_area TEXT NOT NULL DEFAULT 'Downtown Dubai',
    location GEOGRAPHY(POINT, 4326),
    is_online BOOLEAN DEFAULT FALSE,
    last_seen TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. USER INTERESTS
CREATE TABLE IF NOT EXISTS public.user_interests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    interest TEXT NOT NULL,
    UNIQUE(user_id, interest)
);

-- 3. ORGANIZATION PROFILES
CREATE TABLE IF NOT EXISTS public.organization_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    org_name TEXT NOT NULL,
    org_type TEXT NOT NULL,
    linkedin_url TEXT,
    website TEXT,
    description TEXT,
    logo_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CONNECTIONS
CREATE TABLE IF NOT EXISTS public.connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requester_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'blocked')),
    matched_by TEXT DEFAULT 'manual' CHECK (matched_by IN ('interest', 'region', 'random', 'manual', 'event')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(requester_id, receiver_id),
    CHECK (requester_id != receiver_id)
);

-- 5. EVENTS (Includes Job Fairs)
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organizer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN (
        'job_fair', 'tech_hackathon', 'networking', 'student_mixer', 'social_hangout', 'workshop'
    )),
    is_job_event BOOLEAN DEFAULT FALSE,
    participating_companies TEXT[],
    hiring_roles TEXT[],
    venue_name TEXT NOT NULL,
    venue_address TEXT NOT NULL,
    dubai_area TEXT NOT NULL,
    location GEOGRAPHY(POINT, 4326),
    starts_at TIMESTAMPTZ NOT NULL,
    ends_at TIMESTAMPTZ,
    max_capacity INTEGER,
    rsvp_count INTEGER DEFAULT 0,
    cover_image_url TEXT,
    target_interests TEXT[],
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'pending', 'published', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. JOB POSTINGS (With LinkedIn Links)
CREATE TABLE IF NOT EXISTS public.job_postings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    company_name TEXT NOT NULL,
    description TEXT NOT NULL,
    linkedin_url TEXT NOT NULL,
    dubai_area TEXT NOT NULL,
    location GEOGRAPHY(POINT, 4326),
    job_type TEXT NOT NULL CHECK (job_type IN ('full_time', 'part_time', 'internship', 'contract')),
    required_skills TEXT[],
    salary_range TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ
);

-- 7. EVENT RSVPs
CREATE TABLE IF NOT EXISTS public.event_rsvps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'going' CHECK (status IN ('going', 'maybe', 'not_going')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

-- 8. CONVERSATIONS & MESSAGES
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT NOT NULL CHECK (type IN ('direct', 'group')),
    title TEXT,
    event_id UUID REFERENCES public.events(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.conversation_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    last_read_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(conversation_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.profiles(id),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN (
        'connection_request', 'connection_accepted', 'new_event', 'new_job', 'new_message', 'system'
    )),
    is_read BOOLEAN DEFAULT FALSE,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Helper RPC for matching
CREATE OR REPLACE FUNCTION get_nearby_events(
    user_lat DOUBLE PRECISION,
    user_lng DOUBLE PRECISION,
    radius_meters INTEGER DEFAULT 50000
)
RETURNS SETOF events AS $$
    SELECT *
    FROM events
    WHERE status = 'published'
      AND starts_at >= NOW() - INTERVAL '1 day'
      AND ST_DWithin(
          location,
          ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography,
          radius_meters
      )
    ORDER BY starts_at ASC;
$$ LANGUAGE sql STABLE;
