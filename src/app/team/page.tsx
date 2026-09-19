import Team from "@/components/Team";
import PageHero from "@/components/PageHero";
import CTA from "@/components/CTA";

export default function TeamPage() {
  return (
    <>
      <PageHero 
        title={<>Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Core Team</span></>}
        description="Meet the dedicated professionals driving innovation and growth at Tara Applications."
        badgeText="THE PEOPLE BEHIND TARA APPLICATIONS"
      />
      <Team />
      <CTA />
    </>
  );
}
