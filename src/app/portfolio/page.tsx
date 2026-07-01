import Portfolio from "@/components/Portfolio";
import PageHero from "@/components/PageHero";
import LeadGenPortfolio from "@/components/LeadGenPortfolio";
import LeadGenFunnel from "@/components/LeadGenFunnel";
import LeadGenServices from "@/components/LeadGenServices";

export default function PortfolioPage() {
  return (
    <>
      <PageHero 
        title={<>Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Work</span></>}
        description="Development projects and lead generation campaigns we've delivered for clients worldwide."
        badgeText="PORTFOLIO"
      />
      <Portfolio hideViewAll={true} />
        <LeadGenFunnel />
        <LeadGenServices />
    </>
  );
}
