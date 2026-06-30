import PageHero from "@/components/PageHero";
import CTA from "@/components/CTA";
import { Search, Star, BarChart, ArrowUpCircle } from "lucide-react";

export default function ASOPage() {
  return (
    <>
      <PageHero 
        title={<>App Store <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Optimization</span></>}
        description="Maximize your app's visibility and organic downloads on iOS App Store and Google Play."
        badgeText="ASO SERVICES"
      />
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Dominate the App Stores</h2>
            <p className="text-lg text-gray-600">
              We use data-driven strategies to improve your app's ranking, increase discoverability, and drive high-intent organic users.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Search, title: "Keyword Research", desc: "Identifying high-volume, low-competition keywords to target your exact audience." },
              { icon: Star, title: "Rating Strategy", desc: "Implementing in-app prompts and workflows to dramatically increase 5-star reviews." },
              { icon: ArrowUpCircle, title: "Conversion Rate", desc: "Optimizing screenshots, icons, and descriptions to turn views into installs." },
              { icon: BarChart, title: "Competitor Analysis", desc: "Deep diving into competitor strategies to find gaps and ranking opportunities." },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-6">
                  <feature.icon className="text-teal-600" size={24} />
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
