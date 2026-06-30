import PageHero from "@/components/PageHero";
import CTA from "@/components/CTA";
import Portfolio from "@/components/Portfolio";
import { Smartphone, MonitorPlay, Blocks, Rocket } from "lucide-react";

export default function AppDevelopmentPage() {
  return (
    <>
      <PageHero 
        title={<>Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">App Development</span></>}
        description="Beautiful, high-performance mobile applications for iOS and Android platforms."
        badgeText="MOBILE APPS"
      />
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Mobile Excellence</h2>
            <p className="text-lg text-gray-600">
              We design and engineer mobile applications that stand out in the app stores and deliver seamless user experiences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Smartphone, title: "Native iOS & Android", desc: "High-performance applications built with Swift, Kotlin, or React Native." },
              { icon: Blocks, title: "UI/UX Design", desc: "Intuitive, engaging, and beautiful interfaces designed specifically for mobile." },
              { icon: MonitorPlay, title: "Cross-Platform", desc: "Write once, run anywhere with Flutter and React Native solutions." },
              { icon: Rocket, title: "App Launch Support", desc: "End-to-end support from ideation to App Store and Google Play deployment." },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-6">
                  <feature.icon className="text-purple-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Portfolio />
      <CTA />
    </>
  );
}
