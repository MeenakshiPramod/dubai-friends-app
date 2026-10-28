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
  ArrowRight
} from 'lucide-react';
import { MOCK_JOBS } from '@/lib/mockData';
import { DUBAI_AREAS, JOB_TYPES } from '@dubai-friends/shared';

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
    <div className="bg-[#FAF8F4] min-h-screen text-[#172520] pb-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-12 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#EDE8DE] pb-8">
          <div className="space-y-2">
            <span className="text-xs font-sans text-[#708077] tracking-wider uppercase font-medium">
              Verified Career Opportunities
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-[#10271D]">
              Opportunities in Dubai
            </h1>
            <p className="text-sm text-[#52665E] max-w-xl font-sans">
              Hand-verified roles from tech teams and startups across Dubai. Request employee referrals or apply straight through verified LinkedIn listings.
            </p>
          </div>

          <Link
            href="/org"
            className="inline-flex items-center space-x-2 bg-[#1F4735] hover:bg-[#16382B] text-white text-xs font-medium px-5 py-2.5 rounded-full transition-all self-start sm:self-auto shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Post a Role</span>
          </Link>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#EDE8DE] shadow-[0_2px_12px_rgba(23,54,40,0.02)] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-6 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#708077]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by role or company (e.g. AI, React, Sales)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#EDE8DE] text-sm focus:outline-none focus:border-[#2A5C46] bg-[#FAF8F4]/50"
              />
            </div>

            <div className="sm:col-span-3">
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full py-2.5 px-3.5 rounded-2xl border border-[#EDE8DE] text-sm bg-white text-[#4A5E53] focus:outline-none"
              >
                <option value="all">All Dubai Areas</option>
                {DUBAI_AREAS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full py-2.5 px-3.5 rounded-2xl border border-[#EDE8DE] text-sm bg-white text-[#4A5E53] focus:outline-none"
              >
                <option value="all">All Job Types</option>
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
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EDE8DE] shadow-[0_2px_12px_rgba(23,54,40,0.02)] hover:border-[#C5D9CD] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-start space-x-4">
                <img
                  src={job.company_logo}
                  alt={job.company_name}
                  className="w-13 h-13 rounded-2xl object-cover ring-1 ring-[#1F4735]/15 flex-shrink-0"
                />
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-sans font-medium text-[#2A5C46] bg-[#E8F1EC] px-2.5 py-0.5 rounded-full capitalize">
                      {job.job_type.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-[#708077] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#D96B47]" />
                      <span>{job.dubai_area}</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-[#10271D]">
                    {job.title}
                  </h3>

                  <p className="text-xs font-medium text-[#52665E] flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-[#708077]" />
                    <span>{job.company_name}</span>
                  </p>

                  <p className="text-xs text-[#52665E] max-w-2xl leading-relaxed">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.required_skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] text-[#4A5E53] bg-[#FAF8F4] px-2 py-0.5 rounded-md border border-[#EDE8DE]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Salary & LinkedIn CTA */}
              <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between gap-3 flex-shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-[#EDE8DE]">
                {job.salary_range && (
                  <span className="text-xs font-semibold text-[#10271D] bg-[#F5F2EB] px-3 py-1.5 rounded-xl border border-[#EDE8DE]">
                    {job.salary_range}
                  </span>
                )}

                <a
                  href={job.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-[#1F4735] hover:bg-[#16382B] text-white text-xs font-medium px-5 py-2.5 rounded-full transition-all shadow-xs"
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
