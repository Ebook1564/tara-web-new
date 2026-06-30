import DevServices from "@/components/DevServices";
import LeadGenServices from "@/components/LeadGenServices";
import LeadGenProcess from "@/components/LeadGenProcess";
import CTA from "@/components/CTA";
import PageHero from "@/components/PageHero";

export default function ServicesPage() {
  return (
    <>
      <PageHero 
        title={<>Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Services</span></>}
        description="From custom development to targeted B2B lead generation — everything you need to grow."
        badgeText="WHAT WE DO"
      />
      <DevServices />
      <LeadGenServices />
      <LeadGenProcess />
      <CTA />
    </>
  );
}
