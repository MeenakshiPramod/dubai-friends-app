'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  MapPin, 
  Building2, 
  ExternalLink, 
  Search, 
  Plus, 
  Sparkles,
  Zap
} from 'lucide-react';
import { MOCK_JOBS } from '@/lib/mockData';
import { DUBAI_AREAS, JOB_TYPES } from '@dubai-friends/shared';
import { GrowthPhoneFigure } from '@/components/illustrations/GenZFigures';

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const filteredJobs = MOCK_JOBS.filter((job) => {
    if (selectedArea !== 'all' && !job.dubai_area.toLowerCase().includes(selectedArea.toLowerCase())) return false;
    if (selectedType !== 'all' && job.job_type !== selectedType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchCompany = job.company_name.toLowerCase().includes(q);
      const matchSkills = job.required_skills.some(s => s.toLowerCase().includes(q));
      return matchTitle || matchCompany || matchSkills;
    }
    return true;
  });

  return (
    <div className="bg-[#FDFBF7] min-h-screen text-[#0B353D] pb-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-10 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b-2 border-[#DDEEF1] pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#D5F3EE] text-[#062026] uppercase tracking-wider">
                💼 LinkedIn Verified Roles
              </span>
              <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#FFE5E0] text-[#E4432C]">
                ⚡ 100% Legitimacy Guarantee
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl text-[#0B353D] font-extrabold tracking-tight">
              Opportunities & Internships
            </h1>
            <p className="text-sm text-[#1B6370] max-w-xl font-normal leading-relaxed">
              Curated roles from top tech scale-ups and creative agencies in Dubai. Request warm internal referrals or jump straight into verified LinkedIn applications.
            </p>
          </div>

          <Link
            href="/org"
            className="inline-flex items-center space-x-2 bg-[#FF573F] hover:bg-[#E4432C] text-white text-xs font-bold px-6 py-3 rounded-full transition-all self-start sm:self-auto shadow-md shadow-[#FF573F]/25 hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Post an Opening</span>
          </Link>
        </div>

        {/* Growth Figure Mini Banner (Inspired by Reference Panel 2: Marketing Strategy / Career Growth) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[#DDEEF1]/60 border-2 border-[#C2E1E6] rounded-3xl p-6">
          <div className="md:col-span-8 space-y-2 text-left">
            <span className="text-[10px] font-bold text-[#FF573F] uppercase tracking-wider">Career Acceleration</span>
            <h3 className="font-serif text-2xl font-bold text-[#0B353D]">
              Direct Referrals Beat Job Board Fatigue
            </h3>
            <p className="text-xs text-[#1B6370] font-light max-w-lg leading-relaxed">
              Every opening listed below is linked to community members currently working inside Careem, Talabat, or Hub71. Ask for a referral before submitting your CV.
            </p>
          </div>
          <div className="md:col-span-4 max-w-xs mx-auto">
            <GrowthPhoneFigure className="w-full h-32" />
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-[#DDEEF1] shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-6 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1BB6A2]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by role or company (e.g. AI, React, Sales)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-[#DDEEF1] text-xs sm:text-sm focus:outline-none focus:border-[#32C6B2] bg-[#FDFBF7] text-[#0B353D] font-medium"
              />
            </div>

            <div className="sm:col-span-3">
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full py-2.5 px-3.5 rounded-2xl border-2 border-[#DDEEF1] text-xs sm:text-sm bg-white text-[#1B6370] font-medium focus:outline-none focus:border-[#32C6B2]"
              >
                <option value="all">All Dubai Districts</option>
                {DUBAI_AREAS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full py-2.5 px-3.5 rounded-2xl border-2 border-[#DDEEF1] text-xs sm:text-sm bg-white text-[#1B6370] font-medium focus:outline-none focus:border-[#32C6B2]"
              >
                <option value="all">All Engagement Types</option>
                {JOB_TYPES.map((jt) => (
                  <option key={jt.id} value={jt.id}>{jt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Job Cards */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#DDEEF1] hover:border-[#32C6B2] shadow-sm hover:shadow-lg transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group text-left"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={job.company_logo}
                  alt={job.company_name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#32C6B2]/30 flex-shrink-0"
                />
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold text-[#062026] bg-[#D5F3EE] px-3 py-0.5 rounded-full capitalize border border-[#A9E8DE]">
                      {job.job_type.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-[#1B6370] flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#FF573F]" />
                      <span>{job.dubai_area}</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#0B353D]">
                    {job.title}
                  </h3>

                  <p className="text-xs font-bold text-[#1B6370] flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#1BB6A2]" />
                    <span>{job.company_name}</span>
                  </p>

                  <p className="text-xs text-[#1B6370]/80 max-w-2xl leading-relaxed font-light">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.required_skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-medium text-[#0B353D] bg-[#FDFBF7] px-2.5 py-0.5 rounded-full border border-[#DDEEF1]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Salary & LinkedIn CTA */}
              <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between gap-3 flex-shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-[#DDEEF1]">
                {job.salary_range && (
                  <span className="text-xs font-bold text-[#0B353D] bg-[#D5F3EE] px-3.5 py-1.5 rounded-xl border border-[#A9E8DE]">
                    {job.salary_range}
                  </span>
                )}

                <a
                  href={job.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-[#FF573F] hover:bg-[#E4432C] text-white text-xs font-bold px-6 py-2.5 rounded-full transition-all shadow-md shadow-[#FF573F]/25 hover:scale-105"
                >
                  <span>Apply on LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
