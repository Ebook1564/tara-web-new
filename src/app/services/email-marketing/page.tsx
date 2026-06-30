import PageHero from "@/components/PageHero";
import CTA from "@/components/CTA";
import { Mail, TrendingUp, Filter, BarChart3 } from "lucide-react";

export default function EmailMarketingPage() {
  return (
    <>
      <PageHero 
        title={<>Targeted <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Email Marketing</span></>}
        description="High-converting B2B email campaigns that engage your audience and drive pipeline growth."
        badgeText="EMAIL OUTREACH"
      />
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Drive Engagement & Sales</h2>
            <p className="text-lg text-gray-600">
              We create personalized, data-driven email outreach campaigns designed specifically to generate high-quality B2B leads.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Mail, title: "Cold Outreach", desc: "Highly personalized cold email sequences that cut through the noise." },
              { icon: Filter, title: "List Building", desc: "Curating highly targeted, verified contact lists matching your ideal customer profile." },
              { icon: TrendingUp, title: "Deliverability", desc: "Technical setup and warm-ups to ensure your emails land in the primary inbox." },
              { icon: BarChart3, title: "A/B Testing", desc: "Continuous optimization of subject lines, copy, and CTAs for maximum conversion." },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-6">
                  <feature.icon className="text-indigo-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
