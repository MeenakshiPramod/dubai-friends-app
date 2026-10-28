'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Calendar, 
  Briefcase, 
  CheckCircle2, 
  Linkedin, 
  ShieldCheck,
  ArrowRight
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
    setSuccessMsg(`Gathering "${eventTitle}" published successfully to the Dubai map!`);
    setTimeout(() => setSuccessMsg(''), 4500);
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
    setSuccessMsg(`Opportunity "${jobTitle}" at ${companyName} posted with verified LinkedIn accreditation!`);
    setTimeout(() => setSuccessMsg(''), 4500);
    setJobTitle('');
    setCompanyName('');
    setLinkedinUrl('');
    setJobDesc('');
    setSalaryRange('');
    setRequiredSkills('');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#0B353D] py-10 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D5F3EE] border border-[#A9E8DE] text-[#062026] text-xs font-bold">
            <Building2 className="w-3.5 h-3.5 text-[#1BB6A2]" />
            <span>Organization & Recruiter Hub</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#0B353D] font-extrabold tracking-tight">
            Host gatherings and publish opportunities.
          </h1>
          <p className="text-sm text-[#1B6370] max-w-2xl font-normal leading-relaxed">
            Reach ambitious students, recent arrivals, and seasoned professionals in Dubai. Every listing is verified to preserve community trust and genuine introductions.
          </p>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="p-4 rounded-2xl bg-[#D5F3EE] border-2 border-[#32C6B2] text-[#062026] text-xs font-bold flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#1BB6A2] flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Verification banner */}
        <div className="p-5 rounded-2xl bg-white border-2 border-[#DDEEF1] flex items-start gap-3.5 text-xs text-[#0B353D] shadow-sm">
          <ShieldCheck className="w-5 h-5 text-[#1BB6A2] flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-[#0B353D]">Verified Organization Standard</p>
            <p className="font-light text-[#1B6370] leading-relaxed">
              To keep Dubai Friends authentic and spam-free, every job or hiring event is cross-referenced with your official LinkedIn organization page.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b-2 border-[#DDEEF1] gap-6 text-sm">
          <button
            onClick={() => setActiveTab('event')}
            className={`flex items-center gap-2 pb-3.5 font-bold transition-colors border-b-2 -mb-[2px] ${
              activeTab === 'event'
                ? 'border-[#0B353D] text-[#0B353D]'
                : 'border-transparent text-[#1B6370]/60 hover:text-[#0B353D]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Host an Event or Job Fair</span>
          </button>

          <button
            onClick={() => setActiveTab('job')}
            className={`flex items-center gap-2 pb-3.5 font-bold transition-colors border-b-2 -mb-[2px] ${
              activeTab === 'job'
                ? 'border-[#FF573F] text-[#FF573F]'
                : 'border-transparent text-[#1B6370]/60 hover:text-[#0B353D]'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Post a Verified Role</span>
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl border-2 border-[#DDEEF1] p-6 sm:p-10 shadow-md">
          {activeTab === 'event' ? (
            <form onSubmit={handlePostEvent} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#0B353D] mb-2">Event Title</label>
                  <input
                    type="text"
                    required
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="e.g. Dubai AI Founders Evening or GITEX Career Fair"
                    className="w-full text-xs px-4 py-3 rounded-2xl border-2 border-[#DDEEF1] bg-[#FDFBF7] text-[#0B353D] focus:outline-none focus:border-[#32C6B2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B353D] mb-2">Category</label>
                  <select
                    value={eventCategory}
                    onChange={(e) => setEventCategory(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-2xl border-2 border-[#DDEEF1] bg-[#FDFBF7] text-[#0B353D] focus:outline-none focus:border-[#32C6B2]"
                  >
                    {EVENT_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#0B353D] mb-2">Venue or Space</label>
                  <input
                    type="text"
                    required
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    placeholder="e.g. in5 Tech, Dubai Internet City"
                    className="w-full text-xs px-4 py-3 rounded-2xl border-2 border-[#DDEEF1] bg-[#FDFBF7] text-[#0B353D] focus:outline-none focus:border-[#32C6B2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B353D] mb-2">Neighborhood</label>
                  <select
                    value={eventArea}
                    onChange={(e) => setEventArea(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-2xl border-2 border-[#DDEEF1] bg-[#FDFBF7] text-[#0B353D] focus:outline-none focus:border-[#32C6B2]"
                  >
                    {DUBAI_AREAS.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B353D] mb-2">Date & Time</label>
                  <input
                    type="datetime-local"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-2xl border-2 border-[#DDEEF1] bg-[#FDFBF7] text-[#0B353D] focus:outline-none focus:border-[#32C6B2]"
                  />
                </div>
              </div>

              {eventCategory === 'job_fair' && (
                <div>
                  <label className="block text-xs font-bold text-[#0B353D] mb-2">
                    Participating Hiring Companies (comma separated)
                  </label>
                  <input
                    type="text"
                    value={participatingCompanies}
                    onChange={(e) => setParticipatingCompanies(e.target.value)}
                    placeholder="e.g. Careem, Talabat, Hub71, Noon, Emirates"
                    className="w-full text-xs px-4 py-3 rounded-2xl border-2 border-[#DDEEF1] bg-[#FDFBF7] text-[#0B353D] focus:outline-none focus:border-[#32C6B2]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#0B353D] mb-2">Gathering Summary & Agenda</label>
                <textarea
                  rows={4}
                  required
                  value={eventDesc}
                  onChange={(e) => setEventDesc(e.target.value)}
                  placeholder="Describe the atmosphere, who will gain the most from attending, perks (Karak, mentorship), and agenda..."
                  className="w-full text-xs p-4 rounded-2xl border-2 border-[#DDEEF1] bg-[#FDFBF7] text-[#0B353D] focus:outline-none focus:border-[#32C6B2]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <p className="text-xs text-[#1B6370]">Events are reviewed and pinned to the community map within 2 hours.</p>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#FF573F] hover:bg-[#E4432C] text-white font-bold px-6 py-3 rounded-full text-xs transition-all shadow-md shadow-[#FF573F]/25 hover:scale-105"
                >
                  <span>Publish Gathering</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handlePostJob} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#0B353D] mb-2">Role Title</label>
                  <input
                    type="text"
                    required
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Machine Learning Engineer or Product Associate"
                    className="w-full text-xs px-4 py-3 rounded-2xl border-2 border-[#DDEEF1] bg-[#FDFBF7] text-[#0B353D] focus:outline-none focus:border-[#32C6B2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B353D] mb-2">Company Name</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Careem or Hub71 Fellow"
                    className="w-full text-xs px-4 py-3 rounded-2xl border-2 border-[#DDEEF1] bg-[#FDFBF7] text-[#0B353D] focus:outline-none focus:border-[#32C6B2]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B353D] mb-2 flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                  <span>LinkedIn Job URL (Required for Trust Verification)</span>
                </label>
                <input
                  type="url"
                  required
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://www.linkedin.com/jobs/view/..."
                  className="w-full text-xs px-4 py-3 rounded-2xl border-2 border-[#DDEEF1] bg-[#FDFBF7] text-[#0B353D] focus:outline-none focus:border-[#32C6B2]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#0B353D] mb-2">Engagement Type</label>
                  <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-2xl border-2 border-[#DDEEF1] bg-[#FDFBF7] text-[#0B353D] focus:outline-none focus:border-[#32C6B2]"
                  >
                    {JOB_TYPES.map((jt) => (
                      <option key={jt.id} value={jt.id}>{jt.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B353D] mb-2">Dubai District</label>
                  <select
                    value={jobArea}
                    onChange={(e) => setJobArea(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-2xl border-2 border-[#DDEEF1] bg-[#FDFBF7] text-[#0B353D] focus:outline-none focus:border-[#32C6B2]"
                  >
                    {DUBAI_AREAS.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B353D] mb-2">Compensation (AED)</label>
                  <input
                    type="text"
                    value={salaryRange}
                    onChange={(e) => setSalaryRange(e.target.value)}
                    placeholder="e.g. AED 12,000 - 18,000 / mo"
                    className="w-full text-xs px-4 py-3 rounded-2xl border-2 border-[#DDEEF1] bg-[#FDFBF7] text-[#0B353D] focus:outline-none focus:border-[#32C6B2]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B353D] mb-2">Key Skills or Focus Areas</label>
                <input
                  type="text"
                  value={requiredSkills}
                  onChange={(e) => setRequiredSkills(e.target.value)}
                  placeholder="e.g. Python, PyTorch, Product Strategy, Malayali Community Outreach"
                  className="w-full text-xs px-4 py-3 rounded-2xl border-2 border-[#DDEEF1] bg-[#FDFBF7] text-[#0B353D] focus:outline-none focus:border-[#32C6B2]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B353D] mb-2">Brief Role Description</label>
                <textarea
                  rows={4}
                  required
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  placeholder="Outline the scope, team mission, and what will make a candidate stand out..."
                  className="w-full text-xs p-4 rounded-2xl border-2 border-[#DDEEF1] bg-[#FDFBF7] text-[#0B353D] focus:outline-none focus:border-[#32C6B2]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <p className="text-xs text-[#1B6370]">Directly matched to relevant students and professionals via Happenstance-style scoring.</p>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#FF573F] hover:bg-[#E4432C] text-white font-bold px-6 py-3 rounded-full text-xs transition-all shadow-md shadow-[#FF573F]/25 hover:scale-105"
                >
                  <span>Post Verified Role</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Back Link */}
        <div className="text-center pt-4">
          <Link href="/discover" className="text-xs text-[#1B6370] hover:text-[#0B353D] underline underline-offset-4 font-bold">
            ← Return to Member Directory
          </Link>
        </div>

      </div>
    </div>
  );
}
