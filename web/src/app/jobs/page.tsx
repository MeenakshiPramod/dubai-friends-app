'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Briefcase, 
  MapPin, 
  Building2, 
  ExternalLink, 
  DollarSign, 
  Search, 
  Sparkles,
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Dubai Careers & LinkedIn Postings</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Dubai Job Board</h1>
          <p className="text-sm text-slate-500">
            Hand-picked opportunities for graduates, engineers, and career newcomers in Dubai. Apply directly on LinkedIn.
          </p>
        </div>

        <Link
          href="/org"
          className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 text-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Post a Job Listing</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role (e.g. AI, React, Sales, Finance)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
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
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            >
              <option value="all">All Job Types</option>
              {JOB_TYPES.map((jt) => (
                <option key={jt.id} value={jt.id}>{jt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Job Postings List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-start space-x-4">
              <img
                src={job.company_logo}
                alt={job.company_name}
                className="w-14 h-14 rounded-xl object-cover ring-1 ring-slate-200 flex-shrink-0"
              />
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md">
                    {job.job_type.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{job.dubai_area}</span>
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                  {job.title}
                </h3>
                <div className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{job.company_name}</span>
                </div>

                <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                  {job.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.required_skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Compensation & LinkedIn Apply CTA */}
            <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between gap-3 flex-shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
              {job.salary_range && (
                <div className="text-xs font-bold text-slate-800 bg-emerald-50/70 border border-emerald-100 px-3 py-1.5 rounded-xl">
                  {job.salary_range}
                </div>
              )}

              <a
                href={job.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-transform active:scale-95"
              >
                <span>Apply on LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
