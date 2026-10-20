'use client';

import { useState } from 'react';
import { 
  Shield, 
  Users, 
  Calendar, 
  Briefcase, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Search,
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
        setActionNotice(`User ${u.first_name} ${u.last_name} has been ${nextStatus === 'suspended' ? 'suspended' : 'reactivated'}.`);
        setTimeout(() => setActionNotice(''), 3500);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const handleApproveOrg = (orgId: string, orgName: string) => {
    setPendingOrgs(pendingOrgs.filter(o => o.id !== orgId));
    setActionNotice(`Organization "${orgName}" verified successfully via LinkedIn!`);
    setTimeout(() => setActionNotice(''), 3500);
  };

  const handleRejectOrg = (orgId: string, orgName: string) => {
    setPendingOrgs(pendingOrgs.filter(o => o.id !== orgId));
    setActionNotice(`Organization "${orgName}" application was declined.`);
    setTimeout(() => setActionNotice(''), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold mb-2">
          <Shield className="w-3.5 h-3.5 text-amber-400" />
          <span>Super Admin & Safety Control</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Platform Moderation Dashboard</h1>
        <p className="text-sm text-slate-500">
          Enforce community guidelines, approve verified organizations, and manage user safety across Dubai Friends.
        </p>
      </div>

      {actionNotice && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase">Registered Users</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{usersList.length + 120}</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1">100% 18+ verified</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase">Live Events & Fairs</div>
          <div className="text-2xl font-extrabold text-indigo-600 mt-1">{MOCK_EVENTS.length}</div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">Active on Dubai map</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase">Verified Jobs</div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">{MOCK_JOBS.length}</div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">LinkedIn link verified</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase">Org Verifications</div>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">{pendingOrgs.length} Pending</div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">Awaiting review</div>
        </div>
      </div>

      {/* Pending Organizations Queue */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 flex items-center justify-between">
          <span>Organization Verification Requests (LinkedIn)</span>
          <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full">
            {pendingOrgs.length} Pending
          </span>
        </h2>

        {pendingOrgs.length === 0 ? (
          <p className="text-xs text-slate-500 py-4">No pending organization verification requests.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {pendingOrgs.map((org) => (
              <div key={org.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{org.name}</span>
                    <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {org.type}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-3">
                    <span>Contact: {org.contact}</span>
                    <span>•</span>
                    <a
                      href={org.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Check LinkedIn Page</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleApproveOrg(org.id, org.name)}
                    className="flex items-center space-x-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>

                  <button
                    onClick={() => handleRejectOrg(org.id, org.name)}
                    className="flex items-center space-x-1 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
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
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900">User Moderation & Safety Controls</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3">User</th>
                <th className="pb-3">Community / Region</th>
                <th className="pb-3">Role / Field</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Moderation Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {usersList.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50">
                  <td className="py-3">
                    <div className="flex items-center space-x-2.5">
                      <img src={user.avatar_url} alt={user.first_name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="font-bold text-slate-900">{user.first_name} {user.last_name}</div>
                        <div className="text-[10px] text-slate-400">{user.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3">
                    <span className="font-semibold text-slate-700 capitalize">
                      {user.region === 'kerala' ? '🌴 Malayali' : user.region.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="py-3">
                    <span className="text-slate-600 font-medium">
                      {user.field_of_study || user.user_status}
                    </span>
                  </td>

                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                      user.status === 'active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>

                  <td className="py-3 text-right">
                    <button
                      onClick={() => handleToggleUserStatus(user.id)}
                      className={`text-[11px] font-bold px-3 py-1 rounded-lg transition-colors ${
                        user.status === 'active'
                          ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                      }`}
                    >
                      {user.status === 'active' ? 'Suspend User' : 'Reactivate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
