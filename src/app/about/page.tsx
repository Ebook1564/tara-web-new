import About from "@/components/About";
import Stats from "@/components/Stats";
import LeadGenServices from "@/components/LeadGenServices";
import PageHero from "@/components/PageHero";
import Portfolio from "@/components/Portfolio";

export default function AboutPage() {
  return (
    <>
      <PageHero 
        title={<>About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Tara Applications</span></>}
        description="Building digital products and generating B2B leads for businesses worldwide since 2017."
        badgeText="OUR STORY"
      />
      <Stats />
      <About />
      <Portfolio />
      <LeadGenServices />
    </>
  );
}
