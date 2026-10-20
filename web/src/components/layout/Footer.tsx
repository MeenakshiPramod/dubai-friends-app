import Link from 'next/link';
import { Compass, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                <Compass className="w-4 h-4 text-slate-950" />
              </div>
              <span className="font-bold text-white text-lg">Dubai Friends</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The hyper-local community app for students, job seekers, and newcomers landing in Dubai. Discover friends with shared cultural roots & interests.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Community</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/discover" className="hover:text-amber-400 transition-colors">Malayali In Dubai</Link></li>
              <li><Link href="/discover" className="hover:text-amber-400 transition-colors">AI & Tech Students</Link></li>
              <li><Link href="/discover" className="hover:text-amber-400 transition-colors">Business & Finance Network</Link></li>
              <li><Link href="/chat" className="hover:text-amber-400 transition-colors">Event Meetup Groups</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Opportunities</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/events" className="hover:text-amber-400 transition-colors">GITEX & Tech Fairs</Link></li>
              <li><Link href="/jobs" className="hover:text-amber-400 transition-colors">LinkedIn Job Board</Link></li>
              <li><Link href="/events" className="hover:text-amber-400 transition-colors">Student Mixers & Hackathons</Link></li>
              <li><Link href="/org" className="hover:text-amber-400 transition-colors">Post as an Organization</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Safety & Trust</h4>
            <p className="text-xs text-slate-400 mb-2">
              Strict 18+ policy. Zero tolerance for harassment. Moderated community events.
            </p>
            <div className="text-[11px] text-amber-400/90 font-medium">
              Made for Dubai 🇦🇪 • Built with ❤️
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Dubai Friends App. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
