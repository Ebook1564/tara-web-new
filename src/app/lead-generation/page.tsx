import PageHero from "@/components/PageHero";
import LeadGenServices from "@/components/LeadGenServices";
import LeadGenProcess from "@/components/LeadGenProcess";
import LeadGenFunnel from "@/components/LeadGenFunnel";
import CTA from "@/components/CTA";

export default function LeadGenerationPage() {
  return (
    <>
      <PageHero 
        title={<>B2B <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Lead Generation</span></>}
        description="We help businesses scale by delivering high-quality, targeted B2B leads through multi-channel outreach strategies."
        badgeText="LEAD GENERATION"
      />
      
      {/* We reuse the LeadGenServices and LeadGenProcess components to build out the page seamlessly */}
      <LeadGenServices />
      
      <LeadGenFunnel />

      <LeadGenProcess />

      <CTA />
    </>
  );
}
