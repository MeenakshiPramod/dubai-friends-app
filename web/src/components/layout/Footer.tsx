import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#DDEEF1]/40 border-t border-[#DDEEF1] py-16 text-[#1B6370]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand Note */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="relative w-8 h-8 rounded-xl bg-[#0B353D] flex items-center justify-center text-white shadow-sm">
                <span className="font-serif italic font-bold text-base text-[#32C6B2]">D</span>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#FF573F]"></span>
              </div>
              <span className="font-serif text-lg tracking-tight text-[#0B353D] font-bold">
                Dubai Friends
              </span>
            </div>
            <p className="text-xs text-[#1B6370] leading-relaxed max-w-sm font-light">
              A youthful, warm network for students, builders, and young professionals landing in Dubai. Connecting cultural roots with authentic introductions and real-life gatherings.
            </p>
            <div className="text-[11px] font-sans text-[#1B6370]/70 pt-2 font-medium">
              Made with passion in Dubai, United Arab Emirates 🇦🇪
            </div>
          </div>

          {/* Links 1 */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-[#0B353D]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/discover" className="hover:text-[#FF573F] transition-colors font-medium">
                  People Search & Match
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#FF573F] transition-colors font-medium">
                  Gatherings & Dubai Map
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-[#FF573F] transition-colors font-medium">
                  Verified Opportunities
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-[#FF573F] transition-colors font-medium">
                  Group Channels & Chat
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold tracking-wider uppercase text-[#0B353D]">
              Community & Safety
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/onboarding" className="hover:text-[#FF573F] transition-colors font-medium">
                  18+ Verification & Heritage Setup
                </Link>
              </li>
              <li>
                <Link href="/org" className="hover:text-[#FF573F] transition-colors font-medium">
                  Host Gatherings / Post Roles
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#FF573F] transition-colors font-medium">
                  Platform Moderation Center
                </Link>
              </li>
              <li className="text-[11px] text-[#1B6370]/70 pt-1 leading-relaxed font-light">
                Zero spam. High-trust warm intros powered by shared friends, universities, and neighborhoods.
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#DDEEF1] flex flex-col sm:flex-row items-center justify-between text-xs text-[#1B6370]/80 gap-3">
          <span>© {new Date().getFullYear()} Dubai Friends. Built for the next generation.</span>
          <div className="flex items-center space-x-6 font-medium">
            <Link href="/discover" className="hover:text-[#0B353D]">Discover</Link>
            <Link href="/events" className="hover:text-[#0B353D]">Events</Link>
            <Link href="/jobs" className="hover:text-[#0B353D]">Careers</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
