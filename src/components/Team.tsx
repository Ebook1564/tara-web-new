"use client";

import { Outfit } from "next/font/google";
const outfit = Outfit({ subsets: ["latin"] });

import { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const SparkleIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
    <path d="M12 0C12 6.62742 17.3726 12 24 12C17.3726 12 12 17.3726 12 24C12 17.3726 6.62742 12 0 12C6.62742 12 12 6.62742 12 0Z" />
  </svg>
);

const teamMembers = [
  {
    name: "Aman Deep Saxena",
    role: "Founder & CEO",
    image: "/images/team/aman-saxena.png",
    bio: "Driving the vision and strategy for Tara Applications with deep expertise in tech and growth.",
    linkedin: "https://www.linkedin.com/in/amansaxenatara/",
    email: "amansaxena@taraapplications.com",
  },
  {
    name: "Aman Kumar Yadav",
    role: "Associate Founder",
    image: "/images/team/aman-kumar-yadav.png",
    bio: "Driving business growth and strategic initiatives to expand Tara Applications' market presence.",
    linkedin: "https://www.linkedin.com/in/aman-kumar-yadav-55b888247/",
    email: "amanyadav@taraapplications.com",
  },
  {
    name: "Gourang Besoya",
    role: "Business Development Executive",
    image: "/images/team/gourang-besoya.png",
    bio: "Focusing on client acquisition and fostering partnerships to fuel sustainable growth.",
    linkedin: "https://www.linkedin.com/in/gourang-besoya/",
    email: "gourangbaisoya@taraapplications.com",
  },
  {
    name: "Ashish Kumar",
    role: "Business Development Executive",
    image: "/images/team/ashish-dedha.jpeg",
    bio: "Building strong client relationships and identifying new business opportunities for the company.",
    linkedin: "https://www.linkedin.com/in/ashish-kumar-74b82b202/",
    email: "ashishkumar@taraapplications.com",
  },
  {
    name: "Praveen Kumar",
    role: "Marketing Manager",
    image: "/images/team/praveen-kumar.png",
    bio: "Contributing to the team's ongoing success and supporting the execution of key company initiatives.",
    linkedin: "https://www.linkedin.com/in/praveen-kumar-08855a1b8/",
    email: "praveenkumar@taraapplications.com",
  }
];

type TeamMember = {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin: string;
  email?: string;
};

function TeamMemberCard({ member }: { member: TeamMember }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const handleMove = (e: MouseEvent) => {
      const rect = box.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    box.addEventListener("mousemove", handleMove);
    return () => box.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div
        ref={boxRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group cursor-default"
      >
        <div
          className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(74, 127, 211, 0.12), transparent 50%)`,
          }}
        />
        <div
          className={`absolute -inset-[1.5px] rounded-2xl opacity-0 transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
          style={{
            background: `conic-gradient(from ${isHovered ? mousePos.x * 360 : 0}deg at 50% 50%, transparent, rgba(74,127,211,0.4), rgba(232,51,152,0.4), transparent)`,
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            padding: "1.5px",
          }}
        />
        <div
          className={`relative w-full aspect-[4/5] rounded-2xl overflow-hidden border transition-all duration-500 ${isHovered
            ? "border-gray-200 shadow-2xl shadow-blue-900/15 -translate-y-1"
            : "border-gray-100 shadow-lg shadow-gray-200/50"
            }`}
        >
          {/* We use an img tag instead of Next.js Image component for placeholders to avoid errors if the image is missing during dev. */}
          {/* In production, users can switch to Next/Image. */}
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
            <img
              src={member.image}
              alt={member.name}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/400x500/1e1b4b/4A7FD3?text=Team+Member";
              }}
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0418] via-[#0a0418]/60 to-transparent opacity-90" />

          <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
            <h4 className="text-2xl font-bold text-white mb-1 group-hover:text-[#4A7FD3] transition-colors">{member.name}</h4>
            <p className="text-blue-400 font-medium mb-3">{member.role}</p>

            <div className={`overflow-hidden transition-all duration-500 ${isHovered ? "max-h-24 opacity-100 mb-4" : "max-h-0 opacity-0 mb-0"}`}>
              <p className="text-gray-300 text-sm leading-relaxed">{member.bio}</p>
            </div>

            <div className={`flex items-center gap-3 transition-all duration-500 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-[#4A7FD3] transition-all duration-300"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href={`mailto:${member.email}`}
                className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-purple-500 transition-all duration-300"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-[#fafafa]" id="team">
      {/* Dynamic light gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-white to-purple-100/40" />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.4) 1px, transparent 0)", backgroundSize: "32px 32px" }} />

      {/* Floating Crystals / Glass Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Crystal 1 */}
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 backdrop-blur-md border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] animate-float rounded-3xl rotate-12" />

        {/* Crystal 2 */}
        <div className="absolute bottom-[15%] right-[5%] w-80 h-80 bg-gradient-to-tl from-purple-400/10 to-pink-400/10 backdrop-blur-md border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] animate-float rounded-[2.5rem] -rotate-12" style={{ animationDelay: '2s' }} />

        {/* Crystal 3 (Small Hexagon-ish) */}
        <div className="absolute top-[20%] right-[15%] w-32 h-32 bg-gradient-to-tr from-blue-300/20 to-cyan-300/20 backdrop-blur-lg border border-white/80 shadow-lg animate-float rounded-2xl rotate-45" style={{ animationDelay: '1s' }} />

        {/* Crystal 4 (Circle) */}
        <div className="absolute bottom-[10%] left-[20%] w-48 h-48 bg-gradient-to-bl from-pink-300/15 to-orange-300/15 backdrop-blur-lg border border-white/70 shadow-lg animate-float rounded-full -rotate-12" style={{ animationDelay: '3s' }} />

        {/* Pink Sparkles (Crystals) */}
        <SparkleIcon className="absolute top-[12%] left-[20%] w-6 h-6 text-pink-200/90 animate-pulse" />
        <SparkleIcon className="absolute top-[28%] right-[10%] w-10 h-10 text-pink-200/70 animate-pulse" style={{ animationDelay: '1s' }} />
        <SparkleIcon className="absolute bottom-[20%] left-[15%] w-8 h-8 text-pink-200/80 animate-pulse" style={{ animationDelay: '2s' }} />
        <SparkleIcon className="absolute bottom-[35%] right-[25%] w-5 h-5 text-pink-200/90 animate-pulse" style={{ animationDelay: '1.5s' }} />
        <SparkleIcon className="absolute top-[45%] left-[8%] w-4 h-4 text-pink-200/80 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <SparkleIcon className="absolute top-[15%] right-[30%] w-7 h-7 text-pink-200/80 animate-pulse" style={{ animationDelay: '2.5s' }} />

        {/* Deep glows to anchor the shapes */}
        <div className="absolute top-1/4 left-[10%] w-72 h-72 rounded-full bg-blue-600/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-[10%] w-96 h-96 rounded-full bg-purple-600/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className={`text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-6 ${outfit.className}`}>
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Core Team</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            The passionate minds behind Tara Applications. We bring together expertise across strategy, engineering, and operations to deliver exceptional digital experiences.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:gap-12 items-center w-full">
          {/* First Row: 2 members */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 w-full max-w-4xl">
            {teamMembers.slice(0, 2).map((member, idx) => (
              <TeamMemberCard key={idx} member={member} />
            ))}
          </div>

          {/* Second Row: 3 members */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full">
            {teamMembers.slice(2).map((member, idx) => (
              <div key={idx + 2} className={idx === 2 ? "md:col-span-2 lg:col-span-1" : ""}>
                <TeamMemberCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
