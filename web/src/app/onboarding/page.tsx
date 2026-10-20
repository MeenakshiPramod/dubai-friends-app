'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  GraduationCap, 
  AlertCircle, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { REGIONS, DUBAI_AREAS, USER_STATUS_OPTIONS, INTEREST_ITEMS } from '@dubai-friends/shared';
import { MOCK_CURRENT_USER } from '@/lib/mockData';

export default function OnboardingPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState(MOCK_CURRENT_USER.first_name);
  const [lastName, setLastName] = useState(MOCK_CURRENT_USER.last_name);
  const [dob, setDob] = useState(MOCK_CURRENT_USER.date_of_birth);
  const [region, setRegion] = useState(MOCK_CURRENT_USER.region);
  const [userStatus, setUserStatus] = useState<string>(MOCK_CURRENT_USER.user_status);
  const [fieldOfStudy, setFieldOfStudy] = useState(MOCK_CURRENT_USER.field_of_study || '');
  const [dubaiArea, setDubaiArea] = useState(MOCK_CURRENT_USER.dubai_area || 'Dubai Marina');
  const [bio, setBio] = useState(MOCK_CURRENT_USER.bio || '');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(MOCK_CURRENT_USER.interests);
  const [ageError, setAgeError] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Validate 18+
  const validateAge = (dateStr: string) => {
    if (!dateStr) return false;
    const birthDate = new Date(dateStr);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18;
  };

  const handleInterestToggle = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(i => i !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAge(dob)) {
      setAgeError('Strict Safety Rule: Dubai Friends is an 18+ community platform. You must be at least 18 years old.');
      return;
    }
    setAgeError('');
    setIsSaved(true);
    setTimeout(() => {
      router.push('/discover');
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>18+ Verified Member Setup</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Your Dubai Community Profile</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Fill in your cultural roots, student/career status, and interests so fellow Dubai friends can discover you.
          </p>
        </div>

        {ageError && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{ageError}</span>
          </div>
        )}

        {isSaved && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Profile successfully updated! Redirecting to Discover Friends...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name & DOB (18+ rule) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">First Name</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Last Name</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Date of Birth (18+ Mandatory)
              </label>
              <input
                type="date"
                required
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                  if (validateAge(e.target.value)) setAgeError('');
                }}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>
          </div>

          {/* Region / Cultural Background & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Regional / Cultural Community
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              >
                {REGIONS.map((r) => (
                  <option key={r.id} value={r.id}>{r.label}</option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400 mt-1">Helps match you with Malayalis or your home regional peers</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Current Role in Dubai
              </label>
              <select
                value={userStatus}
                onChange={(e) => setUserStatus(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              >
                {USER_STATUS_OPTIONS.map((st) => (
                  <option key={st.id} value={st.id}>{st.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Field of Study / Occupation & Dubai Neighborhood */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Field of Study / Major / Profession
              </label>
              <input
                type="text"
                value={fieldOfStudy}
                onChange={(e) => setFieldOfStudy(e.target.value)}
                placeholder="e.g. AI & Robotics, BBA, Software Engineer"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Dubai Neighborhood
              </label>
              <select
                value={dubaiArea}
                onChange={(e) => setDubaiArea(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              >
                {DUBAI_AREAS.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Short Bio / About You
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell other students and newcomers about yourself, your hobbies & what you look forward to in Dubai..."
              className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            />
          </div>

          {/* Interests Tags */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Select Your Interests (For Smart Matching)
            </label>
            <div className="flex flex-wrap gap-2">
              {INTEREST_ITEMS.map((item) => {
                const isSelected = selectedInterests.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleInterestToggle(item.id)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <Link href="/" className="text-xs font-bold text-slate-500 hover:text-slate-800">
              Cancel
            </Link>

            <button
              type="submit"
              className="inline-flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 rounded-xl shadow-md shadow-amber-600/25 transition-transform active:scale-95 text-xs"
            >
              <span>Save & Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
