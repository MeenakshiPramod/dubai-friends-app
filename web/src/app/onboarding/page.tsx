'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
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
      setAgeError('Community Safety: Dubai Friends requires members to be at least 18 years of age.');
      return;
    }
    setAgeError('');
    setIsSaved(true);
    setTimeout(() => {
      router.push('/discover');
    }, 1200);
  };

  return (
    <div className="bg-[#FAF8F4] min-h-screen text-[#172520] pb-24">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 pt-12 space-y-8">
        
        {/* Header */}
        <div className="space-y-2 border-b border-[#EDE8DE] pb-6">
          <div className="inline-flex items-center space-x-1.5 text-xs text-[#1F4735] font-medium bg-[#E8F1EC] px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>18+ Community Member Profile</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#10271D]">
            Set up your profile
          </h1>
          <p className="text-xs sm:text-sm text-[#52665E]">
            Share your roots, major, and Dubai neighborhood so peers can discover you naturally.
          </p>
        </div>

        {ageError && (
          <div className="p-4 rounded-2xl bg-[#FDF6F3] border border-[#F4D2C5] text-[#A44224] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{ageError}</span>
          </div>
        )}

        {isSaved && (
          <div className="p-4 rounded-2xl bg-[#E8F1EC] border border-[#D5E4DB] text-[#1F4735] text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#2A5C46]" />
            <span>Profile updated successfully! Redirecting to Discover...</span>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE8DE] shadow-[0_2px_12px_rgba(23,54,40,0.02)] space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#10271D] mb-1.5">First Name</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EDE8DE] bg-[#FAF8F4]/50 focus:outline-none focus:border-[#2A5C46]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#10271D] mb-1.5">Last Name</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EDE8DE] bg-[#FAF8F4]/50 focus:outline-none focus:border-[#2A5C46]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#10271D] mb-1.5">
                Date of Birth (18+)
              </label>
              <input
                type="date"
                required
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                  if (validateAge(e.target.value)) setAgeError('');
                }}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EDE8DE] bg-[#FAF8F4]/50 focus:outline-none focus:border-[#2A5C46]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#10271D] mb-1.5">
                Regional Community
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EDE8DE] bg-white text-[#4A5E53] focus:outline-none focus:border-[#2A5C46]"
              >
                {REGIONS.map((r) => (
                  <option key={r.id} value={r.id}>{r.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#10271D] mb-1.5">
                Status in Dubai
              </label>
              <select
                value={userStatus}
                onChange={(e) => setUserStatus(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EDE8DE] bg-white text-[#4A5E53] focus:outline-none focus:border-[#2A5C46]"
              >
                {USER_STATUS_OPTIONS.map((st) => (
                  <option key={st.id} value={st.id}>{st.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#10271D] mb-1.5">
                Major / Field / Profession
              </label>
              <input
                type="text"
                value={fieldOfStudy}
                onChange={(e) => setFieldOfStudy(e.target.value)}
                placeholder="e.g. AI & Robotics, Business, Design"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EDE8DE] bg-[#FAF8F4]/50 focus:outline-none focus:border-[#2A5C46]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#10271D] mb-1.5">
                Dubai Neighborhood
              </label>
              <select
                value={dubaiArea}
                onChange={(e) => setDubaiArea(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EDE8DE] bg-white text-[#4A5E53] focus:outline-none focus:border-[#2A5C46]"
              >
                {DUBAI_AREAS.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#10271D] mb-1.5">
              Short Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell others what brings you to Dubai and what you like to work on..."
              className="w-full text-xs p-3.5 rounded-xl border border-[#EDE8DE] bg-[#FAF8F4]/50 focus:outline-none focus:border-[#2A5C46]"
            />
          </div>

          {/* Interests */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#10271D]">
              Interests & Focus Areas
            </label>
            <div className="flex flex-wrap gap-1.5">
              {INTEREST_ITEMS.map((item) => {
                const isSelected = selectedInterests.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleInterestToggle(item.id)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      isSelected
                        ? 'bg-[#1F4735] text-white border-[#1F4735]'
                        : 'bg-[#FAF8F4] text-[#4A5E53] border-[#EDE8DE] hover:bg-[#F5F2EB]'
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4 border-t border-[#EDE8DE] flex items-center justify-between">
            <Link href="/" className="text-xs text-[#708077] hover:text-[#10271D]">
              Cancel
            </Link>

            <button
              type="submit"
              className="inline-flex items-center space-x-2 bg-[#1F4735] hover:bg-[#16382B] text-white text-xs font-medium px-6 py-2.5 rounded-full transition-all shadow-xs"
            >
              <span>Save & Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
