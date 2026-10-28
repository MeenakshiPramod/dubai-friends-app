import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#FAF8F4] border-t border-[#EDE8DE] py-16 text-[#52665E]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Brand Note */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-[#1F4735] flex items-center justify-center text-[#FAF8F4]">
                <span className="font-serif italic font-bold text-base">D</span>
              </div>
              <span className="font-serif text-lg tracking-tight text-[#10271D] font-medium">
                Dubai Friends
              </span>
            </div>
            <p className="text-xs text-[#52665E] leading-relaxed max-w-sm">
              A bespoke, relationship-first community for university students, creators, and professionals arriving in Dubai. Bridging cultural roots with warm introductions.
            </p>
            <div className="text-[11px] font-sans text-[#708077] pt-2">
              Made with care in the United Arab Emirates 🇦🇪
            </div>
          </div>

          {/* Links 1 */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#10271D]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/discover" className="hover:text-[#173628] transition-colors">
                  Natural Language People Search
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#173628] transition-colors">
                  Events & Job Fairs Map
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-[#173628] transition-colors">
                  Verified LinkedIn Job Board
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-[#173628] transition-colors">
                  Community Conversations
                </Link>
              </li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#10271D]">
              Platform & Safety
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/onboarding" className="hover:text-[#173628] transition-colors">
                  18+ Safety & Profile Verification
                </Link>
              </li>
              <li>
                <Link href="/org" className="hover:text-[#173628] transition-colors">
                  Organization & Recruiter Hub
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#173628] transition-colors">
                  Moderation & Trust Center
                </Link>
              </li>
              <li className="text-[11px] text-[#708077] pt-1 leading-relaxed">
                Strict zero-spam policy. Every introduction is rooted in verified mutual relationships and community trust.
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#EDE8DE] flex flex-col sm:flex-row items-center justify-between text-xs text-[#708077] gap-3">
          <span>© {new Date().getFullYear()} Dubai Friends. All rights reserved.</span>
          <div className="flex items-center space-x-6">
            <Link href="/discover" className="hover:text-[#10271D]">Search</Link>
            <Link href="/events" className="hover:text-[#10271D]">Events</Link>
            <Link href="/jobs" className="hover:text-[#10271D]">Careers</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
