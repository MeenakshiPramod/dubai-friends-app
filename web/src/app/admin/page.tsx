'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  CheckCircle2, 
  XCircle, 
  ExternalLink
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
    <div className="min-h-screen bg-[#FDFBF7] text-[#0B353D] py-10 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D5F3EE] border border-[#A9E8DE] text-[#062026] text-xs font-bold">
            <Shield className="w-3.5 h-3.5 text-[#1BB6A2]" />
            <span>Curator & Safety Control</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#0B353D] font-extrabold tracking-tight">
            Platform Moderation & Trust.
          </h1>
          <p className="text-sm text-[#1B6370] max-w-2xl font-normal leading-relaxed">
            Preserve high trust for students, newcomers, and professionals in Dubai. Enforce 18+ identity verification and review LinkedIn credentials for recruiters.
          </p>
        </div>

        {/* Action Notice */}
        {actionNotice && (
          <div className="p-4 rounded-2xl bg-[#D5F3EE] border-2 border-[#32C6B2] text-[#062026] text-xs font-bold flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#1BB6A2] flex-shrink-0" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* KPI Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl p-6 border-2 border-[#DDEEF1] shadow-sm">
            <div className="text-[11px] font-bold text-[#1B6370] uppercase tracking-wider">Curated Members</div>
            <div className="font-serif text-3xl font-extrabold text-[#0B353D] mt-2">{usersList.length + 120}</div>
            <div className="text-[11px] text-[#1B6370] font-medium mt-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#1BB6A2]"></span>
              <span>100% 18+ age gated</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-[#DDEEF1] shadow-sm">
            <div className="text-[11px] font-bold text-[#1B6370] uppercase tracking-wider">Active Gatherings</div>
            <div className="font-serif text-3xl font-extrabold text-[#0B353D] mt-2">{MOCK_EVENTS.length}</div>
            <div className="text-[11px] text-[#1B6370] font-medium mt-1">Live on Dubai map</div>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-[#DDEEF1] shadow-sm">
            <div className="text-[11px] font-bold text-[#1B6370] uppercase tracking-wider">Verified Opportunities</div>
            <div className="font-serif text-3xl font-extrabold text-[#0B353D] mt-2">{MOCK_JOBS.length}</div>
            <div className="text-[11px] text-[#1B6370] font-medium mt-1">Direct LinkedIn verification</div>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-[#DDEEF1] shadow-sm">
            <div className="text-[11px] font-bold text-[#1B6370] uppercase tracking-wider">Awaiting Verification</div>
            <div className="font-serif text-3xl font-extrabold text-[#FF573F] mt-2">{pendingOrgs.length}</div>
            <div className="text-[11px] text-[#1B6370] font-medium mt-1">Organizations pending</div>
          </div>
        </div>

        {/* Pending Organizations Queue */}
        <div className="bg-white rounded-3xl border-2 border-[#DDEEF1] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#0B353D]">Organization Accreditation Requests</h2>
              <p className="text-xs text-[#1B6370] font-light mt-0.5">Validate LinkedIn company pages before allowing event or job broadcasts.</p>
            </div>
            <span className="text-xs bg-[#FFE5E0] border border-[#FFCBC2] text-[#E4432C] font-bold px-3.5 py-1 rounded-full">
              {pendingOrgs.length} Pending
            </span>
          </div>

          {pendingOrgs.length === 0 ? (
            <p className="text-xs text-[#1B6370] py-4 font-light">All organization verification requests have been addressed.</p>
          ) : (
            <div className="divide-y divide-[#DDEEF1]">
              {pendingOrgs.map((org) => (
                <div key={org.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#0B353D]">{org.name}</span>
                      <span className="text-[10px] bg-[#D5F3EE] border border-[#A9E8DE] text-[#062026] px-2.5 py-0.5 rounded-full font-bold">
                        {org.type}
                      </span>
                    </div>
                    <div className="text-xs text-[#1B6370] flex items-center gap-3 font-normal">
                      <span>{org.contact}</span>
                      <span>•</span>
                      <a
                        href={org.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF573F] hover:text-[#E4432C] underline underline-offset-2 flex items-center gap-1 font-bold"
                      >
                        <span>Inspect LinkedIn Profile</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApproveOrg(org.id, org.name)}
                      className="inline-flex items-center gap-1.5 bg-[#FF573F] hover:bg-[#E4432C] text-white text-xs font-bold px-4 py-2 rounded-full transition-all shadow-md shadow-[#FF573F]/25 hover:scale-105"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>

                    <button
                      onClick={() => handleRejectOrg(org.id, org.name)}
                      className="inline-flex items-center gap-1.5 bg-[#FDFBF7] hover:bg-[#FFE5E0] text-[#1B6370] hover:text-[#E4432C] border-2 border-[#DDEEF1] text-xs font-bold px-4 py-2 rounded-full transition-colors"
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
        <div className="bg-white rounded-3xl border-2 border-[#DDEEF1] p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#0B353D]">Member Safety & Standing</h2>
            <p className="text-xs text-[#1B6370] font-light mt-0.5">Oversee community members, inspect cultural tags, and manage suspension flags.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b-2 border-[#DDEEF1] text-[#1B6370] font-bold text-[11px] uppercase tracking-wider">
                  <th className="pb-3.5">Member</th>
                  <th className="pb-3.5">Heritage / Region</th>
                  <th className="pb-3.5">Field / Focus</th>
                  <th className="pb-3.5">Status</th>
                  <th className="pb-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDEEF1]">
                {usersList.map((user) => (
                  <tr key={user.id} className="hover:bg-[#F0FAF8] transition-colors">
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <img src={user.avatar_url} alt={user.first_name} className="w-10 h-10 rounded-2xl object-cover border-2 border-[#DDEEF1]" />
                        <div>
                          <div className="font-bold text-[#0B353D]">{user.first_name} {user.last_name}</div>
                          <div className="text-[11px] text-[#1B6370]">{user.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4">
                      <span className="text-[#0B353D] font-medium">
                        {user.region === 'kerala' ? '🌴 Malayali Community' : user.region.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-4">
                      <span className="text-[#1B6370] font-medium">
                        {user.field_of_study || user.user_status}
                      </span>
                    </td>

                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        user.status === 'active'
                          ? 'bg-[#D5F3EE] text-[#062026] border border-[#A9E8DE]'
                          : 'bg-[#FFE5E0] text-[#E4432C] border border-[#FFCBC2]'
                      }`}>
                        {user.status}
                      </span>
                    </td>

                    <td className="py-4 text-right">
                      <button
                        onClick={() => handleToggleUserStatus(user.id)}
                        className={`text-[11px] font-bold px-4 py-1.5 rounded-full transition-all ${
                          user.status === 'active'
                            ? 'bg-[#FFE5E0] text-[#E4432C] hover:bg-[#FFD5CC] border border-[#FFCBC2]'
                            : 'bg-[#D5F3EE] text-[#062026] hover:bg-[#A9E8DE] border border-[#A9E8DE]'
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
          <Link href="/discover" className="text-xs text-[#1B6370] hover:text-[#0B353D] underline underline-offset-4 font-bold">
            ← Return to Member Directory
          </Link>
        </div>

      </div>
    </div>
  );
}
