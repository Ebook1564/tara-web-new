import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import DevServices from "@/components/DevServices";
import Testimonials from "@/components/Testimonials";
import LeadGenServices from "@/components/LeadGenServices";
import LeadGenFunnel from "@/components/LeadGenFunnel";
import LeadGenProcess from "@/components/LeadGenProcess";
import Partners from "@/components/Partners";
import Portfolio from "@/components/Portfolio";
import VideoTestimonials from "@/components/VideoTestimonials";
import CaseStudies from "@/components/CaseStudies";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <LeadGenFunnel />
      <LeadGenServices />
      <Testimonials />
      <DevServices />
      <LeadGenProcess />
      <CaseStudies />
      <Partners />
      <Portfolio />
      <FAQ />
      <CTA />
    </>
  );
}
