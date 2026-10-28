'use client';

import React from 'react';

/**
 * Figure 1: Startup Rocket Figure (Inspired by Panel 3: "Start Up")
 * Dynamic retro-futuristic rocket launching through mint cloud puffs on deep marine teal.
 */
export function StartupRocketFigure({ className = "w-full h-auto" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-[#093540] p-6 text-white shadow-xl ${className}`}>
      {/* Decorative stars */}
      <div className="absolute top-4 right-8 w-2 h-2 rounded-full bg-[#32C6B2] animate-pulse"></div>
      <div className="absolute top-10 right-20 w-1.5 h-1.5 rounded-full bg-[#FFCBC2]"></div>
      <div className="absolute top-16 right-6 w-2.5 h-2.5 rounded-full bg-white/70"></div>
      <div className="absolute bottom-24 left-6 w-2 h-2 rounded-full bg-[#32C6B2]/60"></div>

      <svg viewBox="0 0 360 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Billowing cloud puffs at base */}
        <g className="animate-pulse-subtle">
          <ellipse cx="60" cy="230" rx="60" ry="40" fill="#52BDB0" />
          <ellipse cx="120" cy="225" rx="70" ry="45" fill="#7FE1D5" />
          <ellipse cx="180" cy="235" rx="65" ry="38" fill="#40ADA0" />
          <ellipse cx="230" cy="240" rx="55" ry="35" fill="#329D90" />
          <ellipse cx="100" cy="250" rx="100" ry="45" fill="#A4EDE4" />
          <ellipse cx="200" cy="255" rx="90" ry="40" fill="#7FE1D5" />
          
          {/* Small cloud bubble dots */}
          <circle cx="45" cy="190" r="14" fill="#A4EDE4" />
          <circle cx="75" cy="170" r="18" fill="#7FE1D5" />
          <circle cx="105" cy="155" r="12" fill="#D5F3EE" />
          <circle cx="65" cy="140" r="8" fill="#D5F3EE" />
        </g>

        {/* Rocket Body */}
        <g className="animate-float-slow" style={{ transformOrigin: '170px 140px' }}>
          {/* Rocket Exhaust trails */}
          <path d="M125 185 L95 235 L120 230 Z" fill="#FF573F" opacity="0.9" />
          <path d="M140 195 L120 248 L145 240 Z" fill="#FFA494" />
          <path d="M155 190 L150 245 L168 238 Z" fill="#FF573F" opacity="0.8" />

          {/* Left Fin */}
          <path d="M110 170 C95 185 85 205 80 215 C100 215 120 200 125 185 Z" fill="#E4432C" />
          
          {/* Right Fin */}
          <path d="M175 130 C195 135 210 150 220 160 C215 175 195 175 175 160 Z" fill="#E4432C" />

          {/* Fuselage / Rocket Main Body */}
          <path d="M185 85 C170 120 135 170 115 195 C135 200 165 185 195 155 C215 135 220 100 220 95 C220 85 205 75 185 85 Z" fill="#F8F5EE" />

          {/* Rocket Nose Cone (Coral Red) */}
          <path d="M185 85 C195 65 215 48 230 45 C232 60 225 82 220 95 C212 90 198 84 185 85 Z" fill="#FF573F" />

          {/* Dark Red Trim Stripe */}
          <path d="M180 92 C192 90 208 92 216 100 L212 108 C204 102 188 100 176 102 Z" fill="#E4432C" />

          {/* Circular Porthole Window */}
          <circle cx="170" cy="130" r="18" fill="#FF573F" />
          <circle cx="170" cy="130" r="13" fill="#0B353D" />
          <circle cx="167" cy="127" r="4" fill="#32C6B2" />
        </g>
      </svg>
    </div>
  );
}

/**
 * Figure 2: Growth Phone Figure (Inspired by Panel 2: "Marketing Strategy")
 * Stylized hand holding a smartphone with an energetic upward 3D orange arrow and teal waves.
 */
export function GrowthPhoneFigure({ className = "w-full h-auto" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-[#D5F3EE] p-6 shadow-md border-2 border-[#A9E8DE] ${className}`}>
      <svg viewBox="0 0 360 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Soft background wave hills in deep teal and mint */}
        <path d="M0 160 Q80 120 180 170 T360 140 L360 260 L0 260 Z" fill="#0B353D" />
        <path d="M0 190 Q90 150 200 195 T360 180 L360 260 L0 260 Z" fill="#149685" />
        <path d="M0 225 Q120 190 250 220 T360 210 L360 260 L0 260 Z" fill="#32C6B2" />

        {/* Hand sleeve (bright orange/coral) */}
        <g className="animate-float-slow">
          <path d="M70 260 L120 180 L150 195 L110 260 Z" fill="#FF573F" />
          <path d="M110 190 L130 160 L145 168 L128 198 Z" fill="#FDFBF7" /> {/* White cuff */}

          {/* Hand palm */}
          <path d="M125 170 C125 150 135 140 145 140 C155 140 160 150 160 170 Z" fill="#FFCBC2" />

          {/* Smartphone */}
          <rect x="135" y="70" width="65" height="110" rx="14" fill="#0B353D" />
          <rect x="139" y="74" width="57" height="102" rx="10" fill="#FDFBF7" />
          <rect x="158" y="78" width="18" height="4" rx="2" fill="#A9E8DE" />
          
          {/* Screen mini bars */}
          <rect x="146" y="90" width="30" height="4" rx="2" fill="#D5F3EE" />
          <rect x="146" y="98" width="42" height="4" rx="2" fill="#D5F3EE" />
          
          {/* Fingers wrapping phone */}
          <rect x="128" y="115" width="16" height="10" rx="5" fill="#FFA494" />
          <rect x="127" y="129" width="16" height="10" rx="5" fill="#FFA494" />
          <rect x="128" y="143" width="16" height="10" rx="5" fill="#FFA494" />

          {/* Big 3D Growth Arrow (Orange/Red) */}
          <g className="animate-bounce" style={{ animationDuration: '3s' }}>
            {/* Arrow shadow */}
            <path d="M150 145 L175 125 L190 138 L225 90 L205 85 L250 80 L245 125 L230 110 L195 152 Z" fill="#BD301C" />
            {/* Front Arrow */}
            <path d="M148 140 L173 120 L188 133 L220 85 L202 80 L245 76 L242 120 L226 105 L192 147 Z" fill="#FF573F" />
          </g>
        </g>
      </svg>
    </div>
  );
}

/**
 * Figure 3: Botanical Nature Figure (Inspired by Panel 4: "Nature")
 * Layered tropical botanical leaves in pastel coral, peach, and vivid mint/cyan.
 */
export function NatureBotanicalFigure({ className = "w-full h-auto" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-[#FDEEE8] p-6 shadow-md border-2 border-[#FAD8CC] ${className}`}>
      <svg viewBox="0 0 360 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Soft pastel wave layer */}
        <path d="M0 210 Q90 190 180 215 T360 200 L360 260 L0 260 Z" fill="#FFA494" opacity="0.3" />

        {/* Background Mint Fern / Palm Leaves */}
        <g className="animate-float-slow">
          <path d="M220 260 C230 190 260 140 310 110 C290 150 290 200 270 260 Z" fill="#1BB6A2" />
          <path d="M200 260 C205 180 230 130 270 95 C255 140 250 190 230 260 Z" fill="#32C6B2" />
          <path d="M180 260 C185 200 200 150 240 120 C225 160 215 210 195 260 Z" fill="#6AD8C8" />
        </g>

        {/* Central Coral Foliage (Layered Oval Leaves) */}
        <g className="animate-float-reverse">
          {/* Main coral stem */}
          <path d="M140 260 Q135 150 145 70" stroke="#BD301C" strokeWidth="4" strokeLinecap="round" />
          
          {/* Left coral leaves */}
          <ellipse cx="120" cy="190" rx="14" ry="24" transform="rotate(-35 120 190)" fill="#FF573F" />
          <ellipse cx="115" cy="150" rx="13" ry="22" transform="rotate(-35 115 150)" fill="#FF745F" />
          <ellipse cx="120" cy="115" rx="12" ry="20" transform="rotate(-35 120 115)" fill="#FFA494" />
          <ellipse cx="130" cy="85" rx="10" ry="18" transform="rotate(-30 130 85)" fill="#FFCBC2" />

          {/* Right coral leaves */}
          <ellipse cx="160" cy="175" rx="14" ry="24" transform="rotate(35 160 175)" fill="#FF573F" />
          <ellipse cx="165" cy="135" rx="13" ry="22" transform="rotate(35 165 135)" fill="#FF745F" />
          <ellipse cx="160" cy="100" rx="12" ry="20" transform="rotate(35 160 100)" fill="#FFA494" />
          <ellipse cx="145" cy="65" rx="9" ry="16" transform="rotate(10 145 65)" fill="#FFCBC2" />
        </g>

        {/* Foreground Mint Grass fronds */}
        <path d="M70 260 C80 210 100 170 125 150 C110 185 105 220 95 260 Z" fill="#1BB6A2" />
        <path d="M40 260 C60 200 90 160 115 140 C95 180 85 220 65 260 Z" fill="#32C6B2" />
        <path d="M15 260 C35 210 65 175 95 160 C75 195 60 230 40 260 Z" fill="#6AD8C8" />
      </svg>
    </div>
  );
}

/**
 * Figure 4: Peace & Unity Blobs (Inspired by Panel 1: "PEACE")
 * Flowing organic blobs in mint teal, coral, and cream with peace emblem.
 */
export function PeaceBlobsFigure({ className = "w-full h-auto" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-[#DDEEF1] p-6 shadow-md border-2 border-[#C2E1E6] ${className}`}>
      {/* Floating mini peace badge */}
      <div className="absolute top-5 left-5 w-8 h-8 rounded-full border-2 border-[#0B353D] flex items-center justify-center bg-white shadow-sm z-10">
        <svg viewBox="0 0 24 24" fill="none" stroke="#0B353D" strokeWidth="2" className="w-5 h-5">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v18M12 12l6 6M12 12l-6 6" />
        </svg>
      </div>

      <svg viewBox="0 0 360 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Playful fluid camo blobs */}
        <path d="M30 60 C50 40 80 50 100 80 C115 105 90 130 65 130 C40 130 15 80 30 60 Z" fill="#32C6B2" opacity="0.85" className="animate-float-slow" />
        <path d="M120 70 C140 50 170 60 175 80 C180 100 155 120 135 110 C115 100 105 85 120 70 Z" fill="#FFCBC2" />
        <path d="M25 150 C40 135 65 140 70 160 C75 180 50 195 35 190 C20 185 15 165 25 150 Z" fill="#6AD8C8" />

        {/* Large stylized organic mask shape on right */}
        <g className="animate-float-reverse">
          <path d="M200 80 C230 40 310 50 340 100 C370 150 350 230 300 250 C240 270 180 220 190 160 C195 125 180 105 200 80 Z" fill="#1BB6A2" />
          <path d="M230 110 C250 80 300 90 320 120 C340 155 330 200 295 210 C250 225 215 185 225 150 Z" fill="#0B353D" />
          <path d="M250 135 C270 120 300 130 305 150 C310 170 290 185 270 180 C250 175 240 150 250 135 Z" fill="#FF573F" />
          <path d="M260 150 C270 140 290 145 290 160 C290 170 280 175 270 172 Z" fill="#FDFBF7" />
        </g>
      </svg>
    </div>
  );
}
