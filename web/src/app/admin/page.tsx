'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  Users, 
  Calendar, 
  Briefcase, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ExternalLink,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { MOCK_USERS, MOCK_EVENTS, MOCK_JOBS } from '@/lib/mockData';

export default function AdminDashboardPage() {
  const [usersList, setUsersList] = useState(MOCK_USERS);
  const [actionNotice, setActionNotice] = useState('');

  // Sample pending verification orgs
  const [pendingOrgs, setPendingOrgs] = useState([
    {
      id: 'org-p1',
      name: 'Dubai AI Hackers Hub',
      type: 'Tech Community',
      linkedin: 'https://linkedin.com/company/dubai-ai-hackers',
      contact: 'founder@dubai-ai.com',
      date: 'Oct 20, 2026'
    },
    {
      id: 'org-p2',
      name: 'Gulf Talent Recruitment FZ-LLC',
      type: 'Recruitment Agency',
      linkedin: 'https://linkedin.com/company/gulftalent-dubai',
      contact: 'admin@gulftalent.ae',
      date: 'Oct 19, 2026'
    }
  ]);

  const handleToggleUserStatus = (userId: string) => {
    setUsersList(usersList.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'active' ? 'suspended' : 'active';
        setActionNotice(`Member ${u.first_name} ${u.last_name} marked as ${nextStatus === 'suspended' ? 'suspended' : 'active'}.`);
        setTimeout(() => setActionNotice(''), 3500);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const handleApproveOrg = (orgId: string, orgName: string) => {
    setPendingOrgs(pendingOrgs.filter(o => o.id !== orgId));
    setActionNotice(`Organization "${orgName}" verified and approved.`);
    setTimeout(() => setActionNotice(''), 3500);
  };

  const handleRejectOrg = (orgId: string, orgName: string) => {
    setPendingOrgs(pendingOrgs.filter(o => o.id !== orgId));
    setActionNotice(`Organization "${orgName}" application was declined.`);
    setTimeout(() => setActionNotice(''), 3500);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-forest-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-50 border border-forest-100/70 text-forest-800 text-xs">
            <Shield className="w-3.5 h-3.5 text-forest-700" />
            <span>Curator & Safety Control</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-forest-900 tracking-tight font-normal">
            Platform Moderation & Trust.
          </h1>
          <p className="text-sm text-forest-700/70 max-w-2xl font-light leading-relaxed">
            Preserve high trust for students, newcomers, and professionals in Dubai. Enforce 18+ identity verification and review LinkedIn credentials for recruiters.
          </p>
        </div>

        {/* Action Notice */}
        {actionNotice && (
          <div className="p-4 rounded-2xl bg-[#E8F1EC] border border-[#C5DDD1] text-forest-900 text-xs flex items-center gap-3 transition-all">
            <CheckCircle2 className="w-4 h-4 text-forest-700 flex-shrink-0" />
            <span className="font-medium">{actionNotice}</span>
          </div>
        )}

        {/* KPI Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-[#EDE8DE] shadow-sm">
            <div className="text-[11px] font-medium text-forest-700/60 uppercase tracking-wider">Curated Members</div>
            <div className="font-serif text-3xl text-forest-900 mt-2">{usersList.length + 120}</div>
            <div className="text-[11px] text-forest-700/70 font-light mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-700"></span>
              <span>100% 18+ age gated</span>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-[#EDE8DE] shadow-sm">
            <div className="text-[11px] font-medium text-forest-700/60 uppercase tracking-wider">Active Gatherings</div>
            <div className="font-serif text-3xl text-forest-900 mt-2">{MOCK_EVENTS.length}</div>
            <div className="text-[11px] text-forest-700/70 font-light mt-1">Live on Dubai map</div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-[#EDE8DE] shadow-sm">
            <div className="text-[11px] font-medium text-forest-700/60 uppercase tracking-wider">Verified Opportunities</div>
            <div className="font-serif text-3xl text-forest-900 mt-2">{MOCK_JOBS.length}</div>
            <div className="text-[11px] text-forest-700/70 font-light mt-1">Direct LinkedIn verification</div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-[#EDE8DE] shadow-sm">
            <div className="text-[11px] font-medium text-forest-700/60 uppercase tracking-wider">Awaiting Verification</div>
            <div className="font-serif text-3xl text-[#D96B47] mt-2">{pendingOrgs.length}</div>
            <div className="text-[11px] text-forest-700/70 font-light mt-1">Organizations pending</div>
          </div>
        </div>

        {/* Pending Organizations Queue */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-[#EDE8DE] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl text-forest-900 font-normal">Organization Accreditation Requests</h2>
              <p className="text-xs text-forest-700/60 font-light mt-0.5">Validate LinkedIn company pages before allowing event or job broadcasts.</p>
            </div>
            <span className="text-xs bg-[#FAF8F4] border border-[#EDE8DE] text-forest-800 font-medium px-3 py-1 rounded-full">
              {pendingOrgs.length} Pending
            </span>
          </div>

          {pendingOrgs.length === 0 ? (
            <p className="text-xs text-forest-700/50 py-4 font-light">All organization verification requests have been addressed.</p>
          ) : (
            <div className="divide-y divide-[#EDE8DE]">
              {pendingOrgs.map((org) => (
                <div key={org.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-forest-900">{org.name}</span>
                      <span className="text-[10px] bg-forest-50 border border-forest-100/60 text-forest-800 px-2 py-0.5 rounded-full">
                        {org.type}
                      </span>
                    </div>
                    <div className="text-xs text-forest-700/70 flex items-center gap-3 font-light">
                      <span>{org.contact}</span>
                      <span>•</span>
                      <a
                        href={org.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-forest-800 hover:text-forest-900 underline underline-offset-2 flex items-center gap-1 font-medium"
                      >
                        <span>Inspect LinkedIn Profile</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApproveOrg(org.id, org.name)}
                      className="inline-flex items-center gap-1.5 bg-forest-900 hover:bg-forest-800 text-cream-50 text-xs font-medium px-3.5 py-1.5 rounded-full transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>

                    <button
                      onClick={() => handleRejectOrg(org.id, org.name)}
                      className="inline-flex items-center gap-1.5 bg-[#FAF8F4] hover:bg-[#F0ECE1] text-forest-700/70 hover:text-forest-900 border border-[#EDE8DE] text-xs font-medium px-3.5 py-1.5 rounded-full transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Decline</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Moderation Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-[#EDE8DE] p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="font-serif text-xl text-forest-900 font-normal">Member Safety & Standing</h2>
            <p className="text-xs text-forest-700/60 font-light mt-0.5">Oversee community members, inspect cultural tags, and manage suspension flags.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#EDE8DE] text-forest-700/60 font-medium text-[11px] uppercase tracking-wider">
                  <th className="pb-3.5">Member</th>
                  <th className="pb-3.5">Heritage / Region</th>
                  <th className="pb-3.5">Field / Focus</th>
                  <th className="pb-3.5">Status</th>
                  <th className="pb-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE8DE]/70">
                {usersList.map((user) => (
                  <tr key={user.id} className="hover:bg-forest-50/20 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <img src={user.avatar_url} alt={user.first_name} className="w-9 h-9 rounded-full object-cover border border-[#EDE8DE]" />
                        <div>
                          <div className="font-medium text-forest-900">{user.first_name} {user.last_name}</div>
                          <div className="text-[11px] text-forest-700/50 font-light">{user.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4">
                      <span className="text-forest-800 font-light">
                        {user.region === 'kerala' ? '🌴 Malayali Community' : user.region.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-4">
                      <span className="text-forest-700/80 font-light">
                        {user.field_of_study || user.user_status}
                      </span>
                    </td>

                    <td className="py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${
                        user.status === 'active'
                          ? 'bg-[#E8F1EC] text-forest-800 border border-[#C5DDD1]'
                          : 'bg-[#FDF2F0] text-[#D96B47] border border-[#F5D5CE]'
                      }`}>
                        {user.status}
                      </span>
                    </td>

                    <td className="py-4 text-right">
                      <button
                        onClick={() => handleToggleUserStatus(user.id)}
                        className={`text-[11px] font-medium px-3.5 py-1.5 rounded-full transition-colors ${
                          user.status === 'active'
                            ? 'bg-[#FAF8F4] hover:bg-[#FDF2F0] text-[#D96B47] border border-[#EDE8DE]'
                            : 'bg-[#E8F1EC] text-forest-800 hover:bg-forest-100 border border-[#C5DDD1]'
                        }`}
                      >
                        {user.status === 'active' ? 'Suspend' : 'Reactivate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center pt-4">
          <Link href="/discover" className="text-xs text-forest-700/70 hover:text-forest-900 underline underline-offset-4">
            ← Return to Member Directory
          </Link>
        </div>

      </div>
    </div>
  );
}
