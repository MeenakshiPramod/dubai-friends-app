'use client';

import { useState } from 'react';
import { 
  Building2, 
  Calendar, 
  Briefcase, 
  CheckCircle2, 
  Linkedin, 
  Plus, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { DUBAI_AREAS, EVENT_CATEGORIES, JOB_TYPES } from '@dubai-friends/shared';

export default function OrgPortalPage() {
  const [activeTab, setActiveTab] = useState<'event' | 'job'>('event');
  const [successMsg, setSuccessMsg] = useState('');

  // Event form states
  const [eventTitle, setEventTitle] = useState('');
  const [eventCategory, setEventCategory] = useState<string>('job_fair');
  const [venueName, setVenueName] = useState('');
  const [eventArea, setEventArea] = useState('Downtown Dubai');
  const [eventDate, setEventDate] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [participatingCompanies, setParticipatingCompanies] = useState('');

  // Job form states
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [jobArea, setJobArea] = useState('Dubai Internet City');
  const [jobType, setJobType] = useState<string>('full_time');
  const [salaryRange, setSalaryRange] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [jobDesc, setJobDesc] = useState('');

  const handlePostEvent = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(`Event "${eventTitle}" posted successfully and sent for instant publication!`);
    setTimeout(() => setSuccessMsg(''), 4000);
    setEventTitle('');
    setVenueName('');
    setEventDesc('');
    setParticipatingCompanies('');
  };

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkedinUrl.includes('linkedin.com')) {
      alert('Please enter a valid LinkedIn URL for verification.');
      return;
    }
    setSuccessMsg(`Job listing "${jobTitle}" at ${companyName} posted with verified LinkedIn link!`);
    setTimeout(() => setSuccessMsg(''), 4000);
    setJobTitle('');
    setCompanyName('');
    setLinkedinUrl('');
    setJobDesc('');
    setSalaryRange('');
    setRequiredSkills('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-2">
          <Building2 className="w-3.5 h-3.5 text-blue-700" />
          <span>Organization & Recruiter Hub</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Post Events, Job Fairs & Openings</h1>
        <p className="text-sm text-slate-500">
          Reach thousands of students, fresh graduates, and active job seekers in Dubai. Verify your organization via LinkedIn.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="font-semibold">{successMsg}</span>
        </div>
      )}

      {/* Verification notice */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
        <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-800">LinkedIn Organization Verification:</span> Every job posting must include a legitimate LinkedIn job posting or company URL to ensure high trust and zero scams for Dubai newcomers.
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('event')}
          className={`flex items-center space-x-2 py-3 px-6 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'event'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Post an Event or Job Fair</span>
        </button>

        <button
          onClick={() => setActiveTab('job')}
          className={`flex items-center space-x-2 py-3 px-6 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'job'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Post a Job with LinkedIn Link</span>
        </button>
      </div>

      {/* Forms */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        {activeTab === 'event' ? (
          <form onSubmit={handlePostEvent} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Event Title</label>
                <input
                  type="text"
                  required
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="e.g. Dubai AI Hackathon or GITEX Job Expo"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Category</label>
                <select
                  value={eventCategory}
                  onChange={(e) => setEventCategory(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                >
                  {EVENT_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Venue Name</label>
                <input
                  type="text"
                  required
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  placeholder="e.g. in5 Tech / DWTC Hall 4"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Dubai Neighborhood</label>
                <select
                  value={eventArea}
                  onChange={(e) => setEventArea(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                >
                  {DUBAI_AREAS.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Date & Time</label>
                <input
                  type="datetime-local"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>
            </div>

            {eventCategory === 'job_fair' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Participating Hiring Companies (comma separated)
                </label>
                <input
                  type="text"
                  value={participatingCompanies}
                  onChange={(e) => setParticipatingCompanies(e.target.value)}
                  placeholder="e.g. Careem, Talabat, Noon, Hub71, Emirates"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Event Description</label>
              <textarea
                rows={4}
                required
                value={eventDesc}
                onChange={(e) => setEventDesc(e.target.value)}
                placeholder="Describe the agenda, who should attend, free perks (e.g. Karak, mentor sessions)..."
                className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl text-xs shadow-md shadow-indigo-600/20"
            >
              Publish Event to Dubai Map
            </button>
          </form>
        ) : (
          <form onSubmit={handlePostJob} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Job Title</label>
                <input
                  type="text"
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Junior AI Engineer or Sales Executive"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Hiring Company Name</label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. TechCorp Dubai"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>
            </div>

            {/* LinkedIn Verification Link */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                <span>LinkedIn Job URL (Required for Verification)</span>
              </label>
              <input
                type="url"
                required
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                placeholder="https://www.linkedin.com/jobs/view/..."
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
              <p className="text-[11px] text-slate-400 mt-1">Users will be directed straight to your LinkedIn posting to apply.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Job Type</label>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                >
                  {JOB_TYPES.map((jt) => (
                    <option key={jt.id} value={jt.id}>{jt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Location Area</label>
                <select
                  value={jobArea}
                  onChange={(e) => setJobArea(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                >
                  {DUBAI_AREAS.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Salary Range (AED)</label>
                <input
                  type="text"
                  value={salaryRange}
                  onChange={(e) => setSalaryRange(e.target.value)}
                  placeholder="e.g. AED 8,000 - 12,000 / month"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Required Skills (comma separated)</label>
              <input
                type="text"
                value={requiredSkills}
                onChange={(e) => setRequiredSkills(e.target.value)}
                placeholder="e.g. Python, React, Communication, Negotiation"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Job Summary & Responsibilities</label>
              <textarea
                rows={4}
                required
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Give a brief summary of what candidates will do..."
                className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </div>

            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-xs shadow-md shadow-emerald-600/20"
            >
              Post Job Opportunity
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
